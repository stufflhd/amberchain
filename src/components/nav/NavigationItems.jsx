import NavItem from "@/components/nav/NavItem";
import { NavigationMenuList } from "@/components/ui/navigation-menu";
import { getNavConfig } from "@/constants/navConfig";
import { useTranslation } from "react-i18next";

export default function NavigationItems({ isMobile = false }) {
    const { t } = useTranslation();
    const navConfig = getNavConfig(t);
    
    return (
        <NavigationMenuList 
            className={isMobile ? "flex-col gap-4 items-start" : "gap-4"}
        >
            {navConfig.allUsers.map((item) => (
                <NavItem 
                    key={item.path || item.value} 
                    item={item} 
                    isMobile={isMobile}
                />
            ))}
        </NavigationMenuList>
    );
}