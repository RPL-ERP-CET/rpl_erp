import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PERMISSIONS_KEY } from "src/common/decorators/permission.decorator";
import { User } from "src/users/users.entity";
import { Permission } from "src/permissions/permissions.entity";
import { Role } from "src/roles/entities/role.entity";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) return true;

    const { user }: { user: User } = context.switchToHttp().getRequest();
    const availablePermissionsSet: Set<string> = new Set();
    user.roles.map((role: Role) => {
      role.permissions.map((permission: Permission) => {
        availablePermissionsSet.add(permission.name);
      });
    });

    if (
      !requiredPermissions.every((permission) =>
        availablePermissionsSet.has(permission),
      )
    )
      throw new ForbiddenException({
        message: "Insufficient permissions",
        error: "Forbidden error",
      });
    return true;
  }
}
