import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export default function BookingStatusTimeline({ timeline = [] }) {
    return (
        <div className="flex items-center justify-between">
            {timeline.map((item, index) => (
                <div key={item.step} className={`flex items-center ${index < timeline.length - 1 ? 'w-full' : ''}`}>
                    <div className="flex flex-col items-center min-w-20">
                        <div
                            className={cn(
                                "w-4 h-4 rounded-full border-2 flex items-center justify-center bg-transparent",
                                item.status === 'completed' ? 'bg-primary border-primary' : 'border-muted-foreground',
                                item.status === 'active' && 'w-3 h-3 ring-primary ring-offset-1 ring-2 border-0 bg-primary'
                            )}
                        >

                            {(item.status === 'active' || item.status === 'completed') &&
                                <div className="rounded-full bg-primary" >
                                    <Check className="stroke-white size-2" />
                                </div>
                            }
                        </div>
                        <p className="text-xs mt-1 text-muted-foreground">{item.step}</p>
                    </div>
                    {index < timeline.length - 1 && (
                        <div className="w-full h-px bg-muted-foreground/50 mb-4" />
                    )}
                </div>
            ))}
        </div>
    );
}