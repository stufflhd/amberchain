import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navLinkVariants = {
    default: "nav-icon-button",
    mobile: "nav-button-mobile"
};

export default function NavLink({ 
    to, 
    children, 
    className, 
    variant = "default",
    ...props 
}) {
    return (
        <Link 
            to={to}
            className={cn(navLinkVariants[variant], className)}
            {...props}
        >
            {children}
        </Link>
    );
}