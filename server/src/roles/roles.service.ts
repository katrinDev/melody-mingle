import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async getByValue(value: string) {
    return this.roleRepository.findOne({ where: { value } });
  }

  async create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.create(createRoleDto);
  }
}
