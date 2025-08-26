import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "@client-web/lib/utils";

// Root component
const ScrollArea = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
    >
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner className="bg-border" />
    </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

// Scrollbar component
const ScrollBar = React.forwardRef<
    React.ElementRef<typeof ScrollAreaPrimitive.Scrollbar>,
    React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
    <ScrollAreaPrimitive.Scrollbar
        ref={ref}
        orientation={orientation}
        className={cn(
            "flex touch-none select-none transition-colors",
            orientation === "vertical"
                ? "h-full w-.5 border-l border-l-transparent p-[0.1px]"
                : "h-2.5 border-t border-t-transparent p-[0.1px]",
            className,
        )}
        {...props}
    >
        <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaPrimitive.Scrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName;

export { ScrollArea, ScrollBar };
