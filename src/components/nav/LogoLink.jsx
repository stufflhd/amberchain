import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function LogoLink({className=''}) {
    return (
        <Link
            to="/"
            className={cn('flex items-center max-w-[170px] text-primary hover:text-primary/90 transition-color', className)}
            aria-label="Go to homepage"
        >
            <Logo />
        </Link>
    );
}