import Logo from "@/components/logo";
import { Link } from "react-router-dom";

export default function LogoLink() {
    return (
        <Link 
            to="/" 
            className="flex items-center max-w-[170px] text-primary hover:text-primary/90 transition-colors"
            aria-label="Go to homepage"
        >
            <Logo />
        </Link>
    );
}