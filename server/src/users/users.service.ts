import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
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
    return this.userRepository.findByPk(id);
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    await user.destroy();

    return user;
  }
}
