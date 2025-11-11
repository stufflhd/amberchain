import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css';
import { MAP_STYLE_URL } from "@/constants/mapConfig";
import { useShipmentRoute } from "@/queries/useShipmentRoute";
import { addMarkersToMap, addRouteToMap } from "./utils/mapUtils";

export default function ShipmentMap({ origin, destination, mapHeight = '300px', mode }) {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const { data: routeGeometry, isSuccess } = useShipmentRoute(origin, destination, mode);

    // Create the map
    useEffect(() => {
        if (map.current) return;
        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: MAP_STYLE_URL,
            center: [0, 20],
            zoom: 1
        });
        map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    }, []);

    // add the markers / routes to the map
    useEffect(() => {
        const currentMap = map.current;
        if (!currentMap) return;

        const setupMapFeatures = () => {
            addMarkersToMap(currentMap, origin, destination);

            if (isSuccess && routeGeometry) {
                addRouteToMap(currentMap, routeGeometry, mode);
                const bounds = new maplibregl.LngLatBounds();
                routeGeometry.coordinates.forEach(coord => bounds.extend(coord));
                currentMap.fitBounds(bounds, { padding: 80, maxZoom: 15, duration: 1000 });
            } else if (origin && destination) {
                // Fallback: draw a straight line between origin and destination
                const fallbackGeometry = {
                    type: 'LineString',
                    coordinates: [origin, destination]
                };
                addRouteToMap(currentMap, fallbackGeometry, mode);
                const bounds = new maplibregl.LngLatBounds();
                bounds.extend(origin);
                bounds.extend(destination);
                currentMap.fitBounds(bounds, { padding: 80, maxZoom: 15, duration: 500 });
            }
        };

        if (currentMap.isStyleLoaded()) {
            setupMapFeatures();
        } else {
            currentMap.once('load', setupMapFeatures);
        }
    }, [origin, destination, mode, routeGeometry, isSuccess]);

    return (
        <div
            className="map-container overflow-hidden rounded-lg"
            ref={mapContainer}
            style={{ width: "100%", height: mapHeight }}
        />
    );
}