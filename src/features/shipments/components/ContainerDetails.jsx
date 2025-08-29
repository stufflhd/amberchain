import React from 'react';
import { Button } from "@/components/ui/button";
import ContainerIcon from '@/components/icons/ContainerIcon';

const itemClass = 'flex flex-row items-center gap-2 px-4 border-l border-primary';

export default function ContainerDetails({ container }) {
    if (!container) return null;


    const MainInfo = () => (
        <div className="flex flex-wrap space-y-4 z-50 relative !mb-0">
            <div className={itemClass}>
                <p className="font-bold">{container.id}</p>
                <p className="text-muted-foreground">{container.type}</p>
            </div>

            <p className={itemClass}>{container.location}</p>

            <div className={itemClass}>
                <p>
                    <span className="font-semibold">{container.status}</span> {container.timestamp}
                </p>
                {container.blInfo && <p className="text-muted-foreground">{container.blInfo}</p>}
            </div>

            <div className={itemClass}>
                {container.seal && <p>SEAL: {container.seal}</p>}
                {container.truckId && <p>Truck Id: {container.truckId}</p>}
                {container.setPoint && !container.details && <p>Set Point: {container.setPoint}</p>}
                {container.otherInfo && <p className="text-muted-foreground break-all">{container.otherInfo}</p>}
            </div>

            <div className={`${itemClass} !border-0 w-full !px-0`}>
                {container.actions?.map((action, index) => (
                    <Button key={index} variant="outline" size="sm">
                        {action}
                    </Button>
                ))}
            </div>
        </div>
    );

    const CommodityDetails = () => (
        container.details ? (
            <>
                <div className='h-[.1px] w-full bg-primary relative z-50 mt-8' />
                <div className="flex gap-4 [&_p]:whitespace-nowrap flex-wrap z-50 relative !mb-0">
                    <p className={`${itemClass}`}><strong>Commodity:</strong> {container.details.commodity}</p>
                    <p className={`${itemClass}`}><strong>Package:</strong> {container.details.package}</p>
                    <p className={`${itemClass}`}><strong>Cargo Weight:</strong> {container.details.cargoWeight}</p>
                    <p className={`${itemClass}`}><strong>Set Point:</strong> {container.details.setPoint}</p>
                </div>
            </>
        ) : null
    );

    return (
        <>
            <MainInfo />
            <CommodityDetails />
            <ContainerIcon className="blur-[2px] absolute bottom-0 right-0 w-[70%] h-auto translate-x-[15%] opacity-20" />

        </>
    );
}