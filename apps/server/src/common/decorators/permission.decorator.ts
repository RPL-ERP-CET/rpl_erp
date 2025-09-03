import { SetMetadata } from "@nestjs/common";
import { Permission } from "src/permissions/permissions.entity";

export const PERMISSIONS_KEY = "permissions_key";
export const PermissionDecorator = (...permissionsList: Permission[]) => {
  const permissions = permissionsList.map((p) => p.name);
  SetMetadata(PERMISSIONS_KEY, permissions);
};
