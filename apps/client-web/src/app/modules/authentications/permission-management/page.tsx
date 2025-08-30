import { Button } from "@client-web/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@client-web/components/ui/table";
import { PermissionManageData } from "../mocks/permissionManageData";

export default function PermissionManagementPage() {
    const permissionData = PermissionManageData[0];
    return (
        <div className="flex flex-col overflow-auto ">
            {/* title */}
            <h2 className="text-[36px] text-center font-bold mb-4">
                Permission Management
            </h2>
            {/* adding new permissions */}
            <div className="flex flex-col gap-3 px-3 mt-6">
                <span className="font-semibold text-[20px]">Define new Permission</span>
                <div className="flex gap-4  items-center">
                    <input type="text" placeholder="Enter permission name" className="border border-black p-2 rounded w-[300px]" />
                    <Button className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition">
                        Add Permission
                    </Button>
                </div>
            </div>

            {/* existing permissions */}
            <div className="px-3 mt-4">
                <h3 className="text-[20px] font-semibold mt-6 mb-4">
                    Existing Permissions
                </h3>
                <div className="items-center max-h-[300px] overflow-y-auto ">
                    {/* table */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Permissions</TableHead>
                                <TableHead className="w-[100px] text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        {/* table contents */}
                        <TableBody>
                            {permissionData.permissionName.map((perm, index) => (
                                <TableRow>
                                    <TableCell>{permissionData.permissionName[index]} </TableCell>
                                    <TableCell className="text-center flex gap-3 justify-center">
                                        <Button className="bg-blue-400 text-white px-4 rounded hover:bg-blue-600 transition">
                                            Edit
                                        </Button>
                                        <Button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </div>

                <div className="mt-4 flex flex-col gap-1">
                    <span className="text-sm font-semibold text-[18px]">Permission Auditing</span>
                    <span className="text-sm text-[16px] ">
                        Last permission update: {permissionData.permissionUpdate}
                    </span>
                </div>

                <div className="mt-6 flex flex-col gap-1">
                    <span className="text-sm font-semibold text-[18px]">Impact Analysis</span>
                    <span className="text-sm text-[16px] ">
                        Changing 'Read all documents' permission may affect document visibility for all users.
                    </span>
                </div>

            </div>
        </div>
    );
}
