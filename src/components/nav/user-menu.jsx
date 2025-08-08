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
import { Link } from "react-router-dom";

export default function UserMenu() {
  const { t } = useTranslation();
  const navConfig = getNavConfig(t);
  const logoutNavItem = navConfig.clientTopNav[navConfig.clientTopNav.length - 1];
  const LogoutIcon = logoutNavItem.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src="./avatar.jpg" alt="Profile image" />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 [&_div]:cursor-pointer" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            Keith Kennedy
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            k.kennedy@originui.com
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {
            navConfig.clientTopNav.filter((_, index) => index != navConfig.clientTopNav.length - 1).map((link) => (
              <Link to={link.path} key={link.path}>
                <DropdownMenuItem  href={link.path}>
                  <link.icon size={16} className="opacity-60" aria-hidden="true" />
                  <span>{link.label}</span>
                </DropdownMenuItem>
              </Link>
            ))
          }
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {
          <Link to={navConfig.clientTopNav[navConfig.clientTopNav.length - 1].path}>
            <DropdownMenuItem>
              <LogoutIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>{navConfig.clientTopNav[navConfig.clientTopNav.length - 1].label}</span>
            </DropdownMenuItem>
          </Link>
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
