import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Permission } from "./permissions.entity";
import { CreatePermissionDto } from "./dto/create-permission.dto";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepo: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    const perms = await this.permissionRepo.find();
    return perms;
  }

  async create(dto: CreatePermissionDto): Promise<Permission> {
    const exists = await this.permissionRepo.findOne({
      where: { name: dto.name },
    });
    if (exists) {
      throw new ConflictException("Permission already exists");
    }
    const newPermission = this.permissionRepo.create(dto);
    return await this.permissionRepo.save(newPermission);
  }
}
