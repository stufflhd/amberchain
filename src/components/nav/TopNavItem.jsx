import React from 'react'
import { NavigationMenuItem, NavigationMenuLink } from '../ui/navigation-menu'
import { Link } from 'react-router-dom'

export default function NavItem({ link, classes }) {
    return (
        <NavigationMenuItem key={link.label}>
            <Link
                to={link.path}
                className={`text-sm font-medium disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-all aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap border border-input bg-transparent hover:bg-accent px-2 group min-w-8 text-muted-foreground size-8 border-none shadow-none rounded-full [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 py-2 hover:text-primary ${classes}`}
            >
                {link.label}
            </Link>
        </NavigationMenuItem>
    )
}
