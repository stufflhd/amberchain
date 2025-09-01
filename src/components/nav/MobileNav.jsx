import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Menu } from 'lucide-react';
import NavLink from './NavLink';
import NavigationItems from './NavigationItems';
import ThemeToggle from '../theme-toggle';
import LogoLink from './LogoLink';
import LanguageSelector from '../LanguageSelector';
import UserMenu from "./user-menu";
import { getNavConfig } from "@/constants/navConfig";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MobileNav({ user }) {
    const { t } = useTranslation();
    const navConfig = getNavConfig(t);
        const isMobile = useIsMobile();
    
    return (
        <Sheet>
            <SheetTrigger
                className="nav-icon-button"
                aria-label="Open navigation menu"
            >
                <Menu className="h-4 w-4" />
            </SheetTrigger>

            <SheetContent side="left" className="flex flex-col">
                <SheetHeader className="flex-shrink-0">
                    <SheetTitle className="text-left">
                        <LogoLink />
                    </SheetTitle>
                </SheetHeader>

                <SheetDescription asChild>
                    <div className="flex flex-1 flex-col justify-between">
                        <NavigationMenu className="flex-1">
                            <div className="flex flex-col gap-4 p-4">
                                <NavigationItems isMobile navConfig={navConfig.allUsers} />
                                {!user && (
                                    <NavLink
                                        to="/auth/login"
                                        className="nav-button-mobile"
                                    >
                                        Login
                                    </NavLink>
                                )}
                                {user && <UserMenu isMobile user={user} />}
                            </div>
                        </NavigationMenu>
                    </div>
                </SheetDescription>

                <SheetFooter className="flex-shrink-0 border-t p-4">
                    <div className="flex w-full items-center justify-between">
                        <LanguageSelector />
                        <ThemeToggle />
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}