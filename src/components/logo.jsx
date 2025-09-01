import logo from "@/assets/images/logo.webp"
import { cn } from "@/lib/utils"

export default function Logo({className = ''}) {
  return (
    <img
      src={logo}
      alt="Logo"
      width="206"
      height="38"
      className={cn('w-full h-auto', className)}
    />
  )
}
