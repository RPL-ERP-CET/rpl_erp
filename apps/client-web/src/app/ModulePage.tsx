"use client";

import { Button } from "@client-web/components/ui/button";
import { useRouter } from "next/navigation";

export default function ModulePage() {
    const router = useRouter();

    return (
        <div>
            <Button
                onClick={() =>
                    router.push("/Authentication_Module/user_session")
                }
                className="w-[500px] items-center"
            >
                Authentication Module
            </Button>
            <Button
                onClick={() =>
                    router.push("/Notifications_Module/notifications")
                }
                className="w-[500px] items-center"
            >
                Notification Module
            </Button>
            <Button
                onClick={() => router.push("/Documents_Module/documents")}
                className="w-[500px] items-center"
            >
                Documents Module
            </Button>
        </div>
    );
}
