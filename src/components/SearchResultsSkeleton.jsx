import React from 'react'
import { Skeleton } from './ui/skeleton'

export default function SearchResultsSkeleton() {
    return (
        <div className="flex flex-col gap-8 mt-4">
            <section>
                <div className="flex items-center gap-4 mb-4">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-7 w-1/3" />
                </div>

                <div className="space-y-4">
                    <div className="border rounded-lg">
                        <div className="p-4 border-b">
                            <Skeleton className="h-8 w-full" />
                        </div>
                        <div className="p-4 space-y-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-10 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}