import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import LogoLink from "@/components/nav/LogoLink";
import { getNavConfig, sidebarNav } from "@/constants/navConfig";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/theme-toggle";

export function AppSidebar() {
    const { t } = useTranslation();
    const navSections = sidebarNav(t);
    const isMobile = useIsMobile();
    const navConfig = getNavConfig(t);
    return (
        <Sidebar>
            <SidebarHeader className={'h-16 justify-center'}>
                <LogoLink />
            </SidebarHeader>
            <SidebarContent className={`relative ${isMobile && 'pb-8'}`}>
                {navSections.map((section) => (
                    <SidebarGroup key={section.label}>
                        <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item) => (

                                    <SidebarMenuItem key={item.label}>
                                        <NavLink to={item.path}>
                                            {({ isActive }) => (
                                                <SidebarMenuButton asChild data-active={isActive}>
                                                    <div className="flex items-center gap-2">
                                                        {item.icon && <item.icon className="w-4 h-4" />}
                                                        <span>{item.label}</span>
                                                    </div>
                                                </SidebarMenuButton>
                                            )}
                                        </NavLink>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
                <div className={`relative ${!isMobile && 'hidden'}`}>
                    <SidebarGroup key='dahNav'>
                        <SidebarGroupLabel>Company</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navConfig.clientDashNav.map((item) => (

                                    <SidebarMenuItem key={item.label}>
                                        <NavLink to={item.path}>
                                            {({ isActive }) => (
                                                <SidebarMenuButton asChild data-active={isActive}>
                                                    <div className="flex items-center gap-2">
                                                        {item.icon && <item.icon className="w-4 h-4" />}
                                                        <span>{item.label}</span>
                                                    </div>
                                                </SidebarMenuButton>
                                            )}
                                        </NavLink>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <div className="fixed bottom-0 right-0 border-t flex w-(--sidebar-width) items-center justify-between p-4 py-2 bg-background">
                        <LanguageSelector />
                        <ThemeToggle />
                    </div>
                </div>

            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}