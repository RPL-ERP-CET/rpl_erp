import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./entities/role.entity";
import { Permission } from "../permissions/permissions.entity";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, priority, permissionIds } = createRoleDto;
    const permissions =
      await this.permissionsRepository.findByIds(permissionIds);

    if (permissions.length !== permissionIds.length) {
      throw new NotFoundException("One or more permissions not found");
    }

    const role = this.rolesRepository.create({ name, priority, permissions });
    return this.rolesRepository.save(role);
  }

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  findOne(id: string): Promise<Role | null> {
    return this.rolesRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.rolesRepository.delete(id);
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException("Role not found");
    }

    if (updateRoleDto.permissionIds) {
      const permissions = await this.permissionsRepository.findByIds(
        updateRoleDto.permissionIds,
      );
      if (permissions.length !== updateRoleDto.permissionIds.length) {
        throw new NotFoundException("One or more permissions not found");
      }
      role.permissions = permissions;
    }

    if (updateRoleDto.name !== undefined) role.name = updateRoleDto.name;
    if (updateRoleDto.priority !== undefined)
      role.priority = updateRoleDto.priority;

    return this.rolesRepository.save(role);
  }
}
