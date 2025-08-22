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
import { sidebarNav } from "@/constants/navConfig";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export function AppSidebar() {
    const { t } = useTranslation();
    const navSections = sidebarNav(t);
    return (
        <Sidebar>
            <SidebarHeader className={'h-16 justify-center'}>
                <LogoLink />
            </SidebarHeader>
            <SidebarContent>
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
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}