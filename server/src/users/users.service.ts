import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcrypt';
import { AddRoleDto } from './dto/add-role.dto';
import { TokensService } from 'src/tokens/tokens.service';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Role) private roleRepository: typeof Role,
    private rolesService: RolesService,
    @Inject(forwardRef(() => TokensService))
    private tokensService: TokensService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userRepository.create({
      ...userDto,
      password: hashedPassword,
    });

    const role = await this.rolesService.getByValue('USER');

    await user.$set('roles', [role]);
    user.roles = [role];

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll({ include: { all: true } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
      },
      include: {
        all: true,
      },
    });
  }

  async findById(id: number) {
    return this.userRepository.findByPk(id, {
      include: [
        {
          model: this.roleRepository,
          as: 'roles',
          through: { attributes: [] }, // This will skip the attributes of the join table
        },
      ],
    });
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('There is no user with such id');
    }
    await user.destroy();

    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId);
    const role = await this.rolesService.getByValue(addRoleDto.value);

    //почитать про все методы!!! add/set
    if (user && role) {
      await user.$add('role', role);

      await this.tokensService.refresh(user.refreshToken.refreshToken);
      return addRoleDto;
    }

    throw new HttpException("User or role weren't find", HttpStatus.NOT_FOUND);
  }
}
