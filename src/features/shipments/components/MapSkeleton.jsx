import { Skeleton } from "@/components/ui/skeleton"
import { useTranslation } from "react-i18next";
export default function MapSkeleton() {
    const { t } = useTranslation();
    return (
        <div className="w-full h-80 rounded-md relative overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-px">
                {Array.from({ length: 16 }).map((_, i) => (
                    <Skeleton key={i} className="h-full w-full bg-foreground/15 rounded-none" />
                ))}
            </div>
            <span className="select-none pointer-events-none absolute bottom-2 left-2 text-xs text-primary">{t('common.MapLoading')}</span>
        </div>
    )
}
