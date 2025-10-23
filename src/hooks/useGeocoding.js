import { useState, useEffect } from 'react';
import { GeocodingService } from '@/services/geocodingService';

export const useGeocoding = (locationName) => {
  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!locationName || typeof locationName !== 'string') {
      setCoordinates(null);
      return;
    }

    const geocodeLocation = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await GeocodingService.geocodeLocation(locationName);
        if (result) {
          setCoordinates(result);
        } else {
          setError('Location not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the geocoding request
    const timeoutId = setTimeout(geocodeLocation, 500);
    return () => clearTimeout(timeoutId);
  }, [locationName]);

  return { coordinates, isLoading, error };
};
