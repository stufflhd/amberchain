import { useQuery } from '@tanstack/react-query';
import * as turf from '@turf/turf';

const ORS_API_KEY = import.meta.env.VITE_ORS_API_KEY;
const SEAROUTES_API_KEY = import.meta.env.VITE_SEAROUTES_API_KEY;

const ORS_BASE_URL = "https://api.openrouteservice.org/v2/directions";
const SEAROUTES_BASE_URL = "https://api.searoutes.com/route/v2/sea";

// Creates a curved line for flights (Air)
const createCircleRoute = (origin, destination) => {
    const start = turf.point(origin);
    const end = turf.point(destination);
    const circleLine = turf.greatCircle(start, end, { npoints: 100 });
    return circleLine.geometry;
};

// A fallback function to create a simple straight line if an API fails
const createStraightLineRoute = (origin, destination) => {
    return {
        type: 'LineString',
        coordinates: [origin, destination]
    };
};

// Fetches routes for land-based transport from OpenRouteService
const fetchLandRoute = async (origin, destination) => {
    const profile = 'driving-hgv';
    const requestBody = { coordinates: [origin, destination] };

    try {
        const response = await fetch(`${ORS_BASE_URL}/${profile}/geojson`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ORS_API_KEY
            },
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) { throw new Error(`ORS API request failed: ${response.statusText}`); }
        const data = await response.json();
        return data.features[0]?.geometry;
    } catch (error) {
        console.error("OpenRouteService API failed, falling back to straight line.", error);
        return createStraightLineRoute(origin, destination);
    }
};

// Fetches routes for sea-based transport from Searoutes
const fetchSeaRoute = async (origin, destination) => {
    const locations = `${origin.join(',')};${destination.join(',')}`;
    try {
        const response = await fetch(`${SEAROUTES_BASE_URL}/${locations}/plan`, {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'x-api-key': SEAROUTES_API_KEY },
        });
        if (!response.ok) {
            throw new Error(`Searoutes API request failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.features[0]?.geometry;
    } catch (error) {
        console.error("Searoutes API failed, falling back to straight line.", error);
        return createStraightLineRoute(origin, destination);
    }
};

// which route to get based on the shipment `mode`
const fetchShipmentRoute = (origin, destination, mode) => {
    console.log(`Fetching route for mode: ${mode}`);
    switch (mode) {
        case 'Sea':
            return fetchSeaRoute(origin, destination);
        case 'Road':
        case 'Rail':
            return fetchLandRoute(origin, destination);
        case 'Air':
        case 'E-BUSINESS':
            return Promise.resolve(createCircleRoute(origin, destination));
        default:
            // If the mode is unknown, don't show a route
            return Promise.resolve(null);
    }
};

// The Custom React Hook Fetch the routes of the shipments based on the `mode`
export const useShipmentRoute = (origin, destination, mode) => {
    return useQuery({
        queryKey: ['shipmentRoute', origin, destination, mode],
        queryFn: () => fetchShipmentRoute(origin, destination, mode),
        // only run if we have all the params correct
        enabled: !!origin && !!destination && !!mode,
        // cache the route data forever
        staleTime: Infinity,
        cacheTime: Infinity,
        // Don't automatically retry
        retry: false,
    });
};