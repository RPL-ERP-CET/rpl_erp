import { create } from "zustand";
import { PermissionManageData } from "../mocks/Authorization/permissionManageData";

type PermissionStore = {
  permissionData: typeof PermissionManageData[0]; // same shape as your mock
  addPermission: (newPermission: string) => void;
  deletePermission: (index: number) => void;
};

// Define the store
export const usePermissionStore = create<PermissionStore>((set) => ({
  permissionData: PermissionManageData[0],

  addPermission: (newPermission) =>
    set((state) => ({
      permissionData: {
        ...state.permissionData,
        permissionName: [...state.permissionData.permissionName, newPermission],
      },
    })),

  deletePermission: (index) =>
    set((state) => ({
      permissionData: {
        ...state.permissionData,
        permissionName: state.permissionData.permissionName.filter((_, i) => i !== index),
      },
    })),
}));
