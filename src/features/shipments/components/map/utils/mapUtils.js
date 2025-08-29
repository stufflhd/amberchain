import maplibregl from "maplibre-gl";
import { ROUTE_STYLES } from "@/constants/mapConfig";

// Creates the HTML element for a custom marker
export function createCustomMarker() {
    const el = document.createElement('div');
    el.innerHTML = `
        <span class="relative flex size-3">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
            <span class="relative inline-flex size-3 rounded-full bg-secondary"></span>
        </span>
    `;
    return el;
}

// Clears old markers and adds new ones to the map
export function addMarkersToMap(map, origin, destination) {
    if (!map || !origin || !destination) return;

    // remove old markers from the page before add the new ones
    document.querySelectorAll('.maplibregl-marker').forEach(marker => marker.remove());

    // add the markers
    new maplibregl.Marker({ element: createCustomMarker() })
        .setLngLat(origin)
        .addTo(map);

    new maplibregl.Marker({ element: createCustomMarker() })
        .setLngLat(destination)
        .addTo(map);
}

// Draws the route line on the map
export function addRouteToMap(map, routeGeometry, mode) {
    if (!map || !routeGeometry) return;

    const routeId = 'shipment-route';
    const style = ROUTE_STYLES[mode] || ROUTE_STYLES['Sea'];

    // Cleanup any old route from the map first
    if (map.getLayer(routeId)) map.removeLayer(routeId);
    if (map.getSource(routeId)) map.removeSource(routeId);

    // Add the new route data as a "source"
    map.addSource(routeId, {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: routeGeometry
        }
    });

    // Add a "layer" to make the source visible and apply styling
    map.addLayer({
        id: routeId,
        type: 'line',
        source: routeId,
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: {
            'line-color': style.color,
            'line-width': style.width,
            'line-opacity': style.opacity,
            ...(style.dashArray && { 'line-dasharray': style.dashArray })
        }
    });
}