import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import * as bcrypt from 'bcrypt';
import { AddRoleDto } from './dto/add-role.dto';
import { TokensService } from '../tokens/tokens.service';
import { Role } from '../roles/roles.model';
import { Musician } from '../musicians/musicians.model';
import { Op } from 'sequelize';

export type NotAdminsDto = {
  email: string;
  city: string;
  name: string;
  createdAt?: Date;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
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

  async changePassword(userId: number, passw: string) {
    const user = await this.findById(userId);

    const hashedPassword = await bcrypt.hash(passw, 5);
    await user.update({ password: hashedPassword });

    return {
      id: userId,
      password: hashedPassword,
    };
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll({
      include: [
        {
          model: Role,
          attributes: ['value'],
          through: { attributes: [] },
        },
        {
          model: Musician,
          attributes: ['name'],
        },
      ],
    });
  }

  async findNotAdmins(): Promise<NotAdminsDto[]> {
    const users = await this.userRepository.findAll({
      include: [
        { model: Role, attributes: [], through: { attributes: [] } },
        {
          model: Musician,
          attributes: ['name', 'city'],
        },
      ],
      where: {
        '$roles.value$': { [Op.ne]: 'ADMIN' },
      },
      attributes: {
        exclude: ['password', 'updatedAt', 'roles', 'chats'],
      },
    });

    let plainUsers = users.map((user) => {
      let plainUser = user.get({ plain: true });

      let musician = plainUser.musician;
      delete plainUser.musician;

      return { ...plainUser, ...musician };
    });

    return plainUsers;
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        email,
      },
      include: {
        model: Role,
        attributes: ['value'],
        through: { attributes: [] },
      },
    });
  }

  async findById(id: number) {
    const user = await this.userRepository.findByPk(id, {
      include: [
        {
          model: Role,
          attributes: ['value'],
          through: { attributes: [] },
        },
        {
          model: Musician,
          attributes: ['name', 'id'],
        },
      ],
    });

    if (!user) {
      throw new BadRequestException('There is no user with such id');
    }

    return user;
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

    if (user && role) {
      const hasRole = await user.$has('role', role);
      if (hasRole) {
        throw new HttpException(
          'User already has this role',
          HttpStatus.CONFLICT,
        );
      } else {
        //adds a new instance to the usersRole table
        await user.$add('role', role);
      }
      if (user.refreshToken) {
        await this.tokensService.refresh(user.refreshToken.refreshToken);
      }
      return addRoleDto;
    }

    throw new HttpException("User or role weren't found", HttpStatus.NOT_FOUND);
  }
}
