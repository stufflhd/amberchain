import React, { lazy, Suspense, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Stepper,
    StepperDescription,
    StepperIndicator,
    StepperItem,
    StepperSeparator,
    StepperTitle,
    StepperTrigger,
} from "@/components/ui/stepper"
import MapSkeleton from './components/MapSkeleton';
import MapLoadError from './components/MapLoadError';
const ShipmentMapComponent = lazy(() => import('./ShipmentMap'));
const steps = [
    {
        step: 1,
        title: "Step One",
        description: "Desc for step one",
    },
    {
        step: 2,
        title: "Step Two",
        description: "Desc for step two",
    },
    {
        step: 3,
        title: "Step Three",
        description: "Desc for step three",
    },
]
export default function ShipmentDetails({ shipment, onClose }) {

    useEffect(() => {
        if (!shipment) {
            onClose();
        }
    }, [shipment, onClose]);

    const [showMap, setShowMap] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setShowMap(true), 0);
        return () => clearTimeout(timer);
    }, []);


    if (!shipment) {
        return null;
    }

    const hasMapData = shipment.origin && shipment.destination;

    return (
        <Dialog
            open={!!shipment}
            onOpenChange={(open) => {
                if (!open) onClose()
            }}
        >
            <DialogContent className={'w-full sm:max-w-6xl flex flex-row gap-6'}>
                {/* Details */}
                <DialogHeader className="w-1/2">
                    <DialogTitle className={`mb-8`}>Details for: {shipment.shipmentId}</DialogTitle>
                    <DialogDescription asChild>
                        <Stepper defaultValue={2} orientation="vertical">
                            {steps.map(({ step, title, description }) => (
                                <StepperItem
                                    key={step}
                                    step={step}
                                    className="relative items-start not-last:flex-1"
                                >
                                    <StepperTrigger className="items-start rounded pb-12 last:pb-0">
                                        <StepperIndicator />
                                        <div className="mt-0.5 space-y-0.5 px-2 text-left">
                                            <StepperTitle>{title}</StepperTitle>
                                            <StepperDescription>{description}</StepperDescription>
                                        </div>
                                    </StepperTrigger>
                                    {step < steps.length && (
                                        <StepperSeparator className="absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]" />
                                    )}
                                </StepperItem>
                            ))}
                        </Stepper>
                    </DialogDescription>
                </DialogHeader>

                {/* Map */}
                <section className="pt-8 w-1/2">
                    {hasMapData ? (
                        showMap ? (
                            <Suspense fallback={<MapSkeleton />}>
                                <ShipmentMapComponent
                                    origin={shipment.origin}
                                    destination={shipment.destination}
                                    mode={shipment.mode}
                                />
                            </Suspense>
                        ) : (
                            <MapSkeleton />
                        )
                    ) : (
                        <MapLoadError />
                    )}
                </section>
            </DialogContent>
        </Dialog>
    )
}
