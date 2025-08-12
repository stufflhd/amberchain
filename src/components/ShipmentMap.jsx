// src/components/ShipmentMap.jsx
import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';

// --- FIXED COLORS: Using Hex codes instead of CSS variables ---
// You can change these to match your theme exactly
const PRIMARY_COLOR_HEX = '#2563eb'; // A nice blue
const ACCENT_COLOR_HEX = '#0284c7';  // A lighter blue for the destination

// IMPORTANT: Replace with your own Maptiler key
const MAPTILER_API_KEY = "hLh47Jq9U4IMPx0cP33h"; 

export function ShipmentMap({ origin, destination }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    // Ensure cleanup happens even if dependencies are not met on init
    const currentMap = map.current;
    if (currentMap) {
        currentMap.remove();
        map.current = null;
    }

    if (!mapContainer.current || !origin || !destination) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // Using a cleaner, minimalist map style closer to your goal
      style: `https://api.maptiler.com/maps/dataviz-light/style.json?key=${MAPTILER_API_KEY}`,
      center: [-98.5795, 39.8283],
      zoom: 1,
      interactive: true, // Keep map interactive
    });

    // Remove default zoom controls for a cleaner look
    map.current.removeControl(map.current._nav);

    map.current.on('load', () => {
        // --- Add the route line ---
        map.current.addSource('route', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': { 'type': 'LineString', 'coordinates': [origin, destination] }
            }
        });

        map.current.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'paint': {
                'line-color': PRIMARY_COLOR_HEX, // <-- FIXED
                'line-width': 2.5,
                'line-opacity': 0.9
            }
        });

        // --- Add custom styled markers ---
        const createMarkerElement = (isOrigin = false) => {
            const el = document.createElement('div');
            el.className = 'w-3.5 h-3.5 rounded-full ring-2 ring-white';
            el.style.backgroundColor = isOrigin ? PRIMARY_COLOR_HEX : ACCENT_COLOR_HEX; // <-- FIXED
            return el;
        };

        new maplibregl.Marker({ element: createMarkerElement(true) }).setLngLat(origin).addTo(map.current);
        new maplibregl.Marker({ element: createMarkerElement(false) }).setLngLat(destination).addTo(map.current);
            
        // --- Fit map to the route ---
        const bounds = new maplibregl.LngLatBounds(origin, destination);
        map.current.fitBounds(bounds, { padding: { top: 50, bottom: 50, left: 450, right: 50 }, maxZoom: 15 });
    });
    
    // Cleanup function
    return () => {
        if (map.current) {
            map.current.remove();
            map.current = null;
        }
    };
  }, [origin, destination]); // Re-run effect if route changes

  // Set a fixed height for the map container
  return <div ref={mapContainer} className="absolute inset-0 w-full h-full" />;
}