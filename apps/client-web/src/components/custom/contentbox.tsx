import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@client-web/lib/utils";
import { ScrollArea } from "@client-web/components/custom/scroll-area"; // use your Radix ScrollArea file

interface ContentBoxProps {
    children?: React.ReactNode;
    className?: string;
    asChild?: boolean;
}

const ContentBox = React.forwardRef<HTMLDivElement, ContentBoxProps>(
    ({ children, className = "", asChild = false }, ref) => {
        const Comp = asChild ? Slot : "div";

        return (
            <Comp
                ref={ref}
                className={cn(
                    "bg-white rounded-3xl shadow-lg mx-auto overflow-hidden",
                    className,
                )}
                style={{
                    marginTop: "var(--content-position-top)",
                    width: "var(--content-width)",
                    height: "var(--content-height)",
                }}
            >
                <ScrollArea className="w-full h-full p-1">
                    {children}
                </ScrollArea>
            </Comp>
        );
    },
);

ContentBox.displayName = "ContentBox";

export default ContentBox;
