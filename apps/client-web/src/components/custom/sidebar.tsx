import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@client-web/lib/utils";
import { Button } from "@client-web/components/ui/button";

/* Sidebar container variants */
const sidebarVariants = cva(
  "flex flex-col py-5 px-4 overflow-y-auto relative shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-white",
        light: "bg-white text-gray-900",
      },
      size: {
        default: "w-[var(--sidebar-width)]",
        sm: "w-52",
        lg: "w-80",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/* Sidebar item variants */
const sidebarItemVariants = cva(
  "flex items-center rounded-lg justify-start transition-all text-left font-medium",
  {
    variants: {
      active: {
        true: "bg-green-600 text-white shadow-md",
        false: "hover:bg-gray-700 hover:text-white dark:hover:bg-gray-800",
      },
      size: {
        default: "px-4 py-2 gap-3",
        sm: "px-3 py-2 gap-2",
      },
    },
    defaultVariants: {
      active: false,
      size: "default",
    },
  },
);

export type SidebarItemProps = {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  size?: "default" | "sm";
};

/* Sidebar props */
interface SidebarProps extends VariantProps<typeof sidebarVariants> {
  items: SidebarItemProps[];
  onBackClick?: () => void;
  asChild?: boolean;
  className?: string;
}

/* Sidebar component */
const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ items, onBackClick, variant, size, asChild = false, className }, ref) => {
    const Comp = asChild ? Slot : "aside";

    return (
      <Comp
        ref={ref}
        className={cn(
          "flex flex-col justify-between",
          sidebarVariants({ variant, size, className }),
        )}
        style={{
          height: "calc(100vh - var(--header-height) - 5px)",
          borderBottomLeftRadius: "var(--border-radius)",
        }}
      >
        {/* Sidebar items */}
        <div
          className="flex flex-col"
          style={{
            gap: "var(--sidebar-element-gap)",
            marginTop: "var(--sidebar-element-gap)",
          }}
        >
          {items.map((item, idx) => (
            <Button
              key={idx}
              onClick={item.onClick}
              variant="ghost"
              size="default"
              className={cn(
                sidebarItemVariants({
                  active: item.active,
                  size: item.size,
                }),
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Button>
          ))}
        </div>

        {/* Back button */}
        {onBackClick && (
          <div>
            <Button
              onClick={onBackClick}
              variant="default"
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md rounded-lg"
            >
              ← Back
            </Button>
          </div>
        )}
      </Comp>
    );
  },
);

Sidebar.displayName = "Sidebar";

export { Sidebar, sidebarVariants, sidebarItemVariants };