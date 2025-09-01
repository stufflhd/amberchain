import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Link } from "react-router-dom";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import MapSkeleton from "@/features/shipments/components/map/MapSkeleton";
import MapLoadError from '@/features/shipments/components/map/MapLoadError';
import { getNavConfig } from "@/constants/navConfig";
import { useTranslation } from "react-i18next";
const ShipmentMapComponent = lazy(() => import('../../shipments/components/map/ShipmentMap'));
export default function ClientsDashboardMap({ className }) {

    const [mapHeight, setMapHeight] = useState(0)
    const mapContRef = useRef(null)
    useEffect(() => {
        setMapHeight(mapContRef.current.clientHeight)
    })

    const { t } = useTranslation();
    const links = getNavConfig(t).clientDashFilterNav;

    const shipment = {
        "route": [
            {
                "name": "Rotterdam, Netherlands",
                "type": "Place of Loading",
                "icon": {}
            },
            {
                "name": "Port of Rotterdam",
                "type": "Port of Loading",
                "icon": {}
            },
            {
                "name": "Port of Shanghai",
                "type": "Port of Discharge",
                "icon": {}
            },
            {
                "name": "Shanghai, China",
                "type": "Place of Discharge",
                "icon": {}
            }
        ],
        "docType": "B/L",
        "shipmentId": "BL-58239",
        "customer": "GlobalTrade LLC",
        "status": "Confirmed",
        "mode": "Sea",
        "stage": "Precarriage",
        "departure": "2025-07-22",
        "eta": "2025-08-05",
        "alerts": "None",
        "soc": "Yes",
        "origin": [
            4.4777,
            51.9244
        ],
        "destination": [
            121.4737,
            31.2304
        ]
    }

    const hasMapData = shipment.origin && shipment.destination;
    const [showMap, setShowMap] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setShowMap(true), 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className={`${cn(className)}`}>
            <div className="overflow-hidden overflow-x-auto py-[2px]">
                <ToggleGroup
                    type="single"
                    value={links[0].path}
                    variant="outline"
                    className="grid grid-cols-4 *:data-[slot=toggle-group-item]:px-0 w-max"
                >
                    {
                        links.map((el) => (
                            <ToggleGroupItem value={el.path} key={el.path}>
                                <Link to={el.path} className="w-full px-2">{t(el.label)}</Link>
                            </ToggleGroupItem>
                        ))
                    }
                </ToggleGroup>
            </div>

            <section className="w-full md:h-full h-96 mt-4" ref={mapContRef}>
                {hasMapData ? (
                    showMap ? (
                        <Suspense fallback={<MapSkeleton className={'h-full'} />}>
                            <ShipmentMapComponent
                                mapHeight={`${mapHeight}px`}
                                origin={shipment.origin}
                                destination={shipment.destination}
                                mode={shipment.mode}
                            />
                        </Suspense>
                    ) : (
                        <MapSkeleton className={'h-full'} />
                    )
                ) : (
                    <MapLoadError className={'h-full'} />
                )}
            </section>
        </section>
    )
}
