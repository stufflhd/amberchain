import NavItem from "@/components/nav/NavItem";
import { NavigationMenuList } from "@/components/ui/navigation-menu";

export default function NavigationItems({ isMobile = false,navConfig = [] }) {
    
    return (
        <NavigationMenuList 
            className={isMobile ? "flex-col gap-4 items-start" : "gap-0"}
        >
            {navConfig.map((item) => (
                <NavItem 
                    key={item.path || item.value} 
                    item={item} 
                    isMobile={isMobile}
                />
            ))}
        </NavigationMenuList>
    );
}