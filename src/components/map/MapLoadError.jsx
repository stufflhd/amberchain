import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
export default function MapLoadError({ className }) {
    const { t } = useTranslation();
    return (
        <div className={cn('w-full h-80 rounded-md relative overflow-hidden', className)}>
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-px">
                {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="h-full w-full bg-primary/10 rounded-none" />
                ))}
            </div>
            <span className="select-none pointer-events-none absolute bottom-2 left-2 text-xs text-primary">{t('common.MapLoadError')}</span>
        </div>
    )
}
