import { Button } from "@client-web/components/ui/button";
import {UserProfile} from "../mocks/profileData";

export default function ProfilePage() {
    const userProfile=UserProfile[0];
    return (
            <div className="flex-1 pt-[10px] flex flex-col items-center ">
                {/* title */}
                <h2 className="text-[36px] font-bold mb-4">Profile</h2>
                {/* content */}
                <div className="mt-6">

                    {/* row1-name */}
                    <div className="flex gap-10 mb-6">
                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold">First Name</span>
                            <div className="border p-2.5 border-black w-[300px] rounded" >{userProfile.firstName} </div>
                        </div>

                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold">Last Name</span>
                            <div className="border p-2.5 border-black w-[300px] rounded" >{userProfile.lastName} </div>
                        </div>
                    </div>

                    {/* row2-email-phone */}
                    <div className="flex gap-10 mb-6">
                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold">Email</span>
                            <div className="border p-2.5 border-black w-[300px] rounded" >{userProfile.email} </div>
                        </div>

                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold">Phone</span>
                            <div className="border p-2.5 border-black w-[300px] rounded" >+91 {userProfile.phone}</div>
                        </div>
                    </div>

                    {/* row3-passwords */}
                    <div className="flex gap-10 mb-6">
                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold">Password</span>
                            <input type="password" className="border p-2.5 border-black w-[300px] rounded" />
                        </div>

                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold">New Password</span>
                            <input type="password" className="border p-2.5 border-black w-[300px] rounded" />
                        </div>
                    </div>

                    <div className="flex gap-50 mb-4">
                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold text-[18px] mb-2">Assigned Roles</span>
                            <li>Administrator</li>
                            <li>Editor</li>
                        </div>

                        <div className="flex flex-col gap-2 mr-10">
                            <span className="font-semibold text-[18px] mb-2">Permissions</span>
                            <li>Read All Documents</li>
                            <li>Edit Own documents</li>
                            <li>Create New Users</li>
                        </div>
                    </div>

                    <Button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Update Profile
                    </Button>
                </div>
            </div>
    );
}
