import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getNavConfig } from "@/constants/navConfig";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from '@/store/authStore';

export default function UserMenu() {
  const { t } = useTranslation();
  const navConfig = getNavConfig(t);
  const logoutNavItem = navConfig.clientTopNav[navConfig.clientTopNav.length - 1];
  const LogoutIcon = logoutNavItem.icon;
  const navigate = useNavigate();
  const { user, logout, setUser } = useAuthStore();

  const displayName = user?.name || user?.username || "Keith Kennedy";
  const displayEmail = user?.email || "k.kennedy@originui.com";
  const avatarSrc = user?.avatar || user?.avatarUrl || null;
  const initials = (() => {
    if (!displayName) return "KK";
    return displayName
      .split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  })();

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (err) {
      // ignore
    }
    // update store
    if (typeof logout === 'function') logout();
    else if (typeof setUser === 'function') setUser(null);
    navigate('/auth/login', { replace: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent rounded-full">
          <Avatar>
            {avatarSrc ? (
              <AvatarImage src={avatarSrc} alt="Profile image" />
            ) : (
              <AvatarFallback>{initials}</AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 [&_div]:cursor-pointer" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {displayName}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {displayEmail}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navConfig.clientTopNav
            .filter((_, index) => index != navConfig.clientTopNav.length - 1)
            .map((link) => (
              <Link to={link.path} key={link.path}>
                <DropdownMenuItem href={link.path}>
                  <link.icon size={16} className="opacity-60" aria-hidden="true" />
                  <span>{link.label}</span>
                </DropdownMenuItem>
              </Link>
            ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="#" onClick={handleLogout}>
            <LogoutIcon size={16} className="opacity-60" aria-hidden="true" />
            <span>{logoutNavItem.label}</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
