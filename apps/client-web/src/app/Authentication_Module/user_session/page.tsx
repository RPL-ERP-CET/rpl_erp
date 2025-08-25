import { Button } from "@client-web/components/ui/button";
import AuthenticationModuleLayout from "../AuthenticationModuleLayout";

export default function UserSessionPage() {
    const details = {
        username: "John Doe",
        sessionId: "session123",
        status: "Active",
        sessionTimeout: "1 year",
        timeRemaining: "11:20",
    };
    return (
        <AuthenticationModuleLayout>
            {/* user session page main content */}
            <div className="flex-1 flex flex-col items-center ">
                {/* title */}
                <h2 className="text-[36px] text-center font-bold mb-4">
                    User Session
                </h2>
                {/* content */}
                <div className="max-w-sm w-full bg-white p-6">
                    <div className="py-4 px-6 ">
                        <span className="font-bold text-[22px] ">
                            Username:
                        </span>
                        <span className="text-[18px] ml-2">
                            {details.username}{" "}
                        </span>
                    </div>

                    <div className="py-4 px-6 ">
                        <span className="font-bold text-[22px] ">
                            Session ID:
                        </span>
                        <span className="text-[18px] ml-2">
                            {details.sessionId}{" "}
                        </span>
                    </div>

                    <div className="py-4 px-6 ">
                        <span className="font-bold text-[22px] ">Status:</span>
                        <span className="text-[18px] ml-2">
                            {details.status}{" "}
                        </span>
                    </div>

                    <div className="py-4 px-6 ">
                        <span className="font-bold text-[22px] ">
                            Session Timeout:
                        </span>
                        <span className="text-[18px] ml-2">
                            {details.sessionTimeout}{" "}
                        </span>
                    </div>

                    <div className="py-4 px-6 ">
                        <span className="font-bold text-[22px] ">
                            Time Remaining:
                        </span>
                        <span className="text-[18px] ml-2">
                            {details.timeRemaining}{" "}
                        </span>
                    </div>

                    <div className="py-4 px-6 ">
                        <Button
                            className="font-serif cursor-pointer text-[20px] h-[40px]"
                            variant="destructive"
                            size="lg"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </AuthenticationModuleLayout>
    );
}
