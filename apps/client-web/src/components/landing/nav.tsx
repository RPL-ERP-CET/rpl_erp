import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@client-web/components/ui/navigation-menu";
import Link from "next/link";
import { SearchBar } from "@client-web/components/landing";
import Image from "next/image";

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
            className="sticky top-0 z-50 px-2 py-2 flex items-center justify-between gap-4 bg-emerald-800 text-white"
            aria-label="Main site navigation"
        >
            {/* Logo & Brand */}
            <Link
                href="/"
                className="flex items-center gap-2 text-sm font-medium"
            >
                <Image
                    src="/logo.png"
                    alt="RPL Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                    priority
                />
                <span className="text-xl font-bold">RPL</span>
            </Link>

            {/* Navigation Menu */}
            <NavigationMenu>
                <NavigationMenuList className="gap-4">
                    {navigationMenuItems.map(({ name, href }) => (
                        <NavigationMenuItem key={name}>
                            <NavigationMenuLink
                                href={href}
                                className="flex items-center gap-2 font-medium transition-all duration-300 hover:opacity-80"
                            >
                                {name}
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>

            {/* Search Bar */}
            <SearchBar />
        </nav>
    );
}
