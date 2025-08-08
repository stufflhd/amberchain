import { NavigationMenuItem } from '../ui/navigation-menu';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function NavItem({ item, isMobile = false, className }) {
    const linkPath = item.path || item.value;
    
    return (
        <NavigationMenuItem>
            <Link
                to={linkPath}
                className={cn(
                    "nav-link",
                    isMobile && "nav-link-mobile",
                    className
                )}
            >
                {item.label}
            </Link>
        </NavigationMenuItem>
    );
}