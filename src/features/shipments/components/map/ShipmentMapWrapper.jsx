import React, { lazy, Suspense } from 'react';
import MapSkeleton from './MapSkeleton';

// LAZY LOAD the main map component
const LazyShipmentMap = lazy(() => import('./ShipmentMap'));

export default function ShipmentMapWrapper({ origin, destination, mode, mapHeight }) {
    return (
        // WRAP the lazy component in Suspense, show skeleton while loading
        <Suspense fallback={<MapSkeleton />}>
            <LazyShipmentMap
                origin={origin}
                destination={destination}
                mode={mode}
                mapHeight={mapHeight}
            />
        </Suspense>
    );
}