"use client";

import { Button } from "@client-web/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div>
            <h1>Home</h1>
            <Button
                onClick={() =>
                    router.push("/Notifications_Module/notifications")
                }
                className="w-[500px] items-center"
            >
                Notification Module
            </Button>
        </div>
    );
}
