import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@client-web/components/ui/navigation-menu";
import Link from "next/link";
import { SearchBar } from "@client-web/features/landing/components/";
import Image from "next/image";
import { Button } from "@client-web/components/ui/button";
import { LogIn } from "lucide-react";
import { cn } from "@client-web/lib/utils";

/**
 * List of primary navigation items to be rendered in the navigation bar.
 */
const navigationMenuItems = [
  { name: "About", href: "#about-us" },
  { name: "Executive Team", href: "#executive-team" },
  { name: "Contact Us", href: "#contact-us" },
];

/**
 * Nav renders the top site navigation bar including:
 * - Brand logo and site name (linked to home)
 * - Primary navigation menu
 * - Search bar component
 */
export default function Nav() {
  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full h-20 flex justify-between items-center border-b border-primary/40",
        "bg-primary backdrop-blur-md shadow-md",
      )}
      aria-label="Main site navigation"
    >
      <div className="w-full max-w-7xl px-4 py-3 mx-auto flex items-center justify-between gap-6 lg:px-8">
        {/* Logo & Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium group"
        >
          <Image
            src="/logo.png"
            alt="RPL Logo"
            width={40}
            height={40}
            className="rounded-full group-hover:rotate-360 transition-all duration-500 ease-in-out"
            priority
          />
          <span className="text-xl font-bold tracking-wide text-white">
            RPL
          </span>
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex gap-6">
            {navigationMenuItems.map(({ name, href }) => (
              <NavigationMenuItem key={name}>
                <NavigationMenuLink
                  href={href}
                  className="relative px-5 py-2.5 font-medium text-white rounded-full border border-transparent hover:text-white hover:border-2 hover:border-secondary/40 hover:bg-accent hover:font-bold hover:scale-x-105 hover:shadow-lg hover:shadow-accent/20 focus:outline-none active:bg-accent active:text-white transition-all duration-500"
                >
                  {name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <SearchBar />
          </div>
          <SigninButton />
        </div>
      </div>
    </nav>
  );
}
export function SigninButton() {
  return (
    <Button className="group relative flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-white text-sm font-semibold shadow-md border border-secondary/40 transition-all duration-300 hover:border-2 hover:bg-accent hover:shadow-lg hover:shadow-accent/20 focus:outline-none">
      {/* Icon */}
      <LogIn className="h-4 w-4 transition-all duration-300" />

      {/* Label with smooth shift */}
      <span className="transition-all duration-300">Sign in</span>
    </Button>
  );
}
