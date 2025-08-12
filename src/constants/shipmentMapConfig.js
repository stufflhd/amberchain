export const MapStyleURL = import.meta.env.VITE_MapStyleURL_API_KEY;
export const ROUTE_STYLES = {
    'Sea': { color: '#fe5b02', width: 2, opacity: 0.8 },
    'Land': { color: '#fe5b02', width: 3, opacity: 0.9, dashArray: null },
    'Air': { color: '#fe5b02', width: 2, opacity: 0.7, dashArray: [2, 8] },
    'Rail': { color: '#fe5b02', width: 3, opacity: 0.8, dashArray: [4, 2] }
};
export const ORIGIN_MARKER_CLASS = 'origin-marker';
export const DEST_MARKER_CLASS = 'destination-marker';