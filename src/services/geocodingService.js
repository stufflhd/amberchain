// Geocoding service to convert location names to coordinates
export class GeocodingService {
  static async geocodeLocation(locationName) {
    if (!locationName || typeof locationName !== 'string') {
      return null;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}&limit=1&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding API request failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const result = data[0];
        return [parseFloat(result.lon), parseFloat(result.lat)];
      }
      
      return null;
    } catch (error) {
      console.error('Geocoding failed:', error);
      return null;
    }
  }
}
