import { ChevronRight } from "lucide-react";

export default function BookingRoute({ route = [] }) {
    if (route.length === 0) return null;
    return (
        <div className="flex items-center flex-wrap gap-2 text-sm font-medium">
            {route.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                    <span>{point}</span>
                    {index < route.length - 1 && (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                </div>
            ))}
        </div>
    );
}