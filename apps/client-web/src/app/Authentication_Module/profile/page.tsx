import AuthenticationModuleLayout from "../AuthenticationModuleLayout";
import { Button } from "@client-web/components/ui/button";

export default function ProfilePage() {
    const userProfile = {
        firstName: "John",
        lastName: "Doe",
        email: "abc@gmail.com",
        phone: "86X48XY00X",
        roles: ["Administrator", "Editor"],
        permissions: [
            "Read All Documents",
            "Edit Own Documents",
            "Create new users",
        ],
    };
    return (
        <AuthenticationModuleLayout>
            {/* Your user profile page main content */}
            <div className="flex-1 flex flex-col items-center overflow-y-auto">
                {/* title */}
                <h2 className="text-[36px] font-bold mb-4">Profile</h2>
                {/* content */}
                <div className="mt-6">
                    {/* row1-name */}
                    <div className="flex gap-10 mb-6">
                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold text-[18px] ">
                                First Name
                            </span>
                            <div className="border p-2.5 border-black w-[300px] rounded">
                                {userProfile.firstName}{" "}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold text-[18px]">
                                Last Name
                            </span>
                            <div className="border p-2.5 border-black w-[300px] rounded">
                                {userProfile.lastName}
                            </div>
                        </div>
                    </div>

                    {/* row2-email-phone */}
                    <div className="flex gap-10 mb-6">
                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold text-[18px]">
                                Email
                            </span>
                            <div className="border p-2.5 border-black w-[300px] rounded">
                                {userProfile.email}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold text-[18px]">
                                Phone
                            </span>
                            <div className="border p-2.5 border-black w-[300px] rounded">
                                +91 {userProfile.phone}
                            </div>
                        </div>
                    </div>

                    {/* row3-passwords */}
                    <div className="flex gap-10 mb-8">
                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold text-[18px]">
                                Password
                            </span>
                            <input
                                type="password"
                                className="border p-2.5 border-black w-[300px] rounded"
                            />
                        </div>

                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold text-[18px]">
                                New Password
                            </span>
                            <input
                                type="password"
                                className="border p-2.5 border-black w-[300px] rounded"
                            />
                        </div>
                    </div>

                    <div className="flex gap-60 mb-4">
                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold text-[18px]">
                                Assigned Roles
                            </span>
                            <li>{userProfile.roles[0]}</li>
                            <li>{userProfile.roles[1]}</li>
                        </div>

                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold text-[18px]">
                                Permissions
                            </span>
                            <li>{userProfile.permissions[0]}</li>
                            <li>{userProfile.permissions[1]}</li>
                            <li>{userProfile.permissions[2]}</li>
                        </div>
                    </div>

                    <Button className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition">
                        Update Profile
                    </Button>
                </div>
            </div>
        </AuthenticationModuleLayout>
    );
}
