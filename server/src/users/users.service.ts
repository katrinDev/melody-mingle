import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(userDto);

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

  async deleteUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    await user.destroy();

    return user;
  }
}
