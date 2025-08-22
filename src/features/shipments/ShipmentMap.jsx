import React, { useRef, useEffect } from "react";
import ReactDOMServer from 'react-dom/server';
import maplibregl from "maplibre-gl";
import 'maplibre-gl/dist/maplibre-gl.css';
import { useRouteQuery } from '../../queries/useRouteQuery';
import { MapStyleURL, ROUTE_STYLES, ORIGIN_MARKER_CLASS, DEST_MARKER_CLASS } from '../../constants/shipmentMapConfig';
import MapLoadError from "./components/MapLoadError";

function createCustomMarker() {
    const el = document.createElement('div');
    el.innerHTML = `
        <span class="relative flex size-3">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
            <span class="relative inline-flex size-3 rounded-full bg-secondary"></span>
        </span>
    `;
    return el;
}

function addMarkers(map, origin, destination) {
    if (!map || !origin || !destination) return;
    document.querySelectorAll(`.${ORIGIN_MARKER_CLASS}, .${DEST_MARKER_CLASS}`).forEach(marker => marker.remove());
    new maplibregl.Marker({ element: createCustomMarker() }).setLngLat(origin).addTo(map);
    new maplibregl.Marker({ element: createCustomMarker() }).setLngLat(destination).addTo(map);
}

function addRouteToMap(map, routeGeometry, mode) {
    if (!map || !routeGeometry) return;
    const routeId = 'shipment-route';
    const style = ROUTE_STYLES[mode] || ROUTE_STYLES['Sea'];

    if (map.getSource(routeId)) {
        map.getSource(routeId).setData({
            type: 'Feature',
            properties: {},
            geometry: routeGeometry
        });
    } else {
        map.addSource(routeId, { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: routeGeometry } });
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
}

function fitMapToRoute(map, geometry, padding = 50) {
    if (!map || !geometry?.coordinates || geometry.coordinates.length === 0) return;
    const bounds = new maplibregl.LngLatBounds();
    geometry.coordinates.forEach(coord => bounds.extend(coord));
    map.fitBounds(bounds, { padding, maxZoom: 8, duration: 1000 });
}

export default function ShipmentMap({ origin, destination, mode = 'Sea', mapHeight = '400px' }) {
    const mapContainer = useRef(null);
    const mapRef = useRef(null);

    const { data: routeGeometry, isLoading, isError, isSuccess } = useRouteQuery(origin, destination, mode);

    useEffect(() => {
        if (mapRef.current || !mapContainer.current) return;
        mapRef.current = new maplibregl.Map({
            container: mapContainer.current,
            style: MapStyleURL,
            center: [0, 20],
            zoom: 2,
        });
        mapRef.current.addControl(new maplibregl.NavigationControl(), "top-right");
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || !origin || !destination) return;

        const setupMap = () => {
            addMarkers(map, origin, destination);
            if (isSuccess && routeGeometry) {
                addRouteToMap(map, routeGeometry, mode);
                fitMapToRoute(map, routeGeometry);
            } else if (!isLoading) {
                const bounds = new maplibregl.LngLatBounds(origin, destination);
                map.fitBounds(bounds, { padding: 90, maxZoom: 15, duration: 500 });
            }
        };

        if (map.isStyleLoaded()) {
            setupMap();
        } else {
            map.once('load', setupMap);
        }
    }, [origin, destination, mode, routeGeometry, isLoading, isSuccess]);

    return (
        <div className="relative">
            {isError && (
                <MapLoadError />
            )}
            <div
                className="map-container overflow-hidden rounded-lg"
                ref={mapContainer}
                style={{ width: "100%", height: mapHeight }}
                aria-label={`Shipment route map showing ${mode.toLowerCase()} route`}
            />
        </div>
    );
}