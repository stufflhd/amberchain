import ThemeToggle from "@/components/theme-toggle";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import useAuthStore from "@/store/authStore";
import { User } from "lucide-react";
import NavLink from "@/components/nav/NavLink";
import useIsMobile from "@/hooks/useIsMobile";
import LogoLink from "@/components/nav/LogoLink";
import LanguageSelector from "@/components/LanguageSelector";
import NavigationItems from "@/components/nav/NavigationItems";
import MobileNav from "@/components/nav/MobileNav";
import UserMenu from "@/components/nav/user-menu";
import React from "react";
import { getNavConfig } from "@/constants/navConfig";
import { useTranslation } from "react-i18next";
import Search from "@/components/nav/Search";

export default function Navbar({ type }) {
    const { user } = useAuthStore();
    // const user = { name: 'gg', email: 'gg' };

    const isMobile = useIsMobile();
    const { t } = useTranslation();
    const navConfig = getNavConfig(t);
    return (
        <header className={`top-0 left-0 z-50 w-full ${type === 'auth' && 'fixed'} `}>
            <nav className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
                {/* Logo */}
                {type === 'auth' ? (
                    <LogoLink />
                ) : (
                    <div />
                )
                }

                {/* Mobile Navigation */}
                {isMobile ? (
                    <MobileNav user={user} />
                ) : (
                    /* Desktop Navigation */
                    <div className="flex items-center gap-2">
                        <Search />
                        <NavigationMenu>
                            <NavigationItems navConfig={navConfig.allUsers} />
                        </NavigationMenu>

                        <div className="flex items-center gap-2 ml-4">
                            <ThemeToggle />
                            <LanguageSelector />
                            {type != 'auth' ? (
                                <UserMenu user={user} />
                            ) : (
                                <NavLink
                                    to="/auth/login"
                                    aria-label="Login"
                                    className="nav-icon-button"
                                >
                                    <User className="h-4 w-4" />
                                </NavLink>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}