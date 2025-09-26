import { cn } from "@/lib/utils";

export default function DetailItem({ label, value, className = '' }) {
    return (
        <div className={cn("flex justify-between items-start text-sm py-1", className)}>
            <span className="text-muted-foreground pr-4">{label}</span>
            <span className="font-medium text-right">{value ?? '-'}</span>
        </div>
    );
}


