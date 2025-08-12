import { useQuery } from '@tanstack/react-query';
import * as turf from '@turf/turf';

const ORS_API_KEY = import.meta.env.VITE_ORS_API_KEY;
const SEAROUTES_API_KEY = import.meta.env.VITE_SEAROUTES_API_KEY;

const ORS_BASE_URL = import.meta.env.VITE_ORS_BASE_URL;
const SEAROUTES_BASE_URL = import.meta.env.VITE_SEAROUTES_BASE_URL;

const ORS_PROFILES = {
    'Land': 'driving-hgv',
    'Rail': 'driving-hgv'
};

const fetchLandRoute = async (origin, destination, mode) => {
    const profile = ORS_PROFILES[mode];
    try {
        const response = await fetch(`${ORS_BASE_URL}/${profile}/geojson`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': ORS_API_KEY },
            body: JSON.stringify({ coordinates: [origin, destination] }),
        });
        if (!response.ok) throw new Error('ORS API request failed');
        const data = await response.json();
        return data.features[0]?.geometry;
    } catch (error) {
        console.log(`OpenRouteService API failed for ${mode}, falling back to straight line.`, error);
        return createStraightLineRoute(origin, destination);
    }
};

const fetchSeaRoute = async (origin, destination) => {
    const locations = `${origin.join(',')};${destination.join(',')}`;
    try {
        const response = await fetch(`${SEAROUTES_BASE_URL}/${locations}/plan`, {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'x-api-key': SEAROUTES_API_KEY },
        });
        if (!response.ok) throw new Error('Searoutes API request failed');
        const data = await response.json();
        return data.features[0]?.geometry;
    } catch (error) {
        console.log(`Searoutes API failed, falling back to straight line.`, error);
        return createStraightLineRoute(origin, destination);
    }
};

const createGreatCircleRoute = (origin, destination) => {
    const start = turf.point(origin);
    const end = turf.point(destination);
    const greatCircle = turf.greatCircle(start, end, { npoints: 100 });
    return greatCircle.geometry;
};

const createStraightLineRoute = (origin, destination) => {
    return {
        type: 'LineString',
        coordinates: [origin, destination]
    };
};

const fetchRoute = (origin, destination, mode) => {
    switch (mode) {
        case 'Sea':
            return fetchSeaRoute(origin, destination);
        case 'Land':
        case 'Rail':
            return fetchLandRoute(origin, destination, mode);
        case 'Air':
        default:
            return Promise.resolve(createGreatCircleRoute(origin, destination));
    }
};

export const useRouteQuery = (origin, destination, mode) => {
    return useQuery({
        queryKey: ['route', origin, destination, mode],
        queryFn: () => fetchRoute(origin, destination, mode),
        enabled: !!origin && !!destination && !!mode,
        staleTime: Infinity,
        cacheTime: Infinity,
        retry: false,
    });
};