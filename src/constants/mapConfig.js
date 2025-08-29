export const MAP_STYLE_URL = import.meta.env.VITE_MapStyleURL_API_KEY;

// Define how each route type should look on the map
export const ROUTE_STYLES = {
    'Sea': { color: '#fe5b02', width: 2, opacity: 0.8 }, 
    'Road': { color: '#fe5b02', width: 3, opacity: 0.9 }, 
    'Rail': { color: '#fe5b02', width: 3, opacity: 0.8,  },
    'Air': { color: '#fe5b02', width: 2, opacity: 0.7,  },
    'E-BUSINESS': { color: '#fe5b02', width: 2, opacity: 0.7,  }
};