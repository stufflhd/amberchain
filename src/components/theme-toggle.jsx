import { useEffect } from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { useAppTheme } from "@/store/useAppTheme"

export default function ThemeToggle() {
  const { isDark, setTheme } = useAppTheme();

  useEffect(() => {
    document.body.classList.toggle("dark", Boolean(isDark))
  }, [isDark]);

  const toggleTheme = () => {
    const newIsDark = isDark === 0
    setTheme(newIsDark)
    document.body.classList.toggle("dark", newIsDark)
  }

  return (
    <div>
      <Toggle
        variant="outline"
        className="nav-icon-button group min-w-8 text-muted-foreground size-8 rounded-full shadow-none"
        pressed={Boolean(isDark)}
        onPressedChange={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <MoonIcon
          size={16}
          className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
          aria-hidden="true"
        />
        <SunIcon
          size={16}
          className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
          aria-hidden="true"
        />
      </Toggle>
    </div>
  )
}