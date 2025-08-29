import { useQuery } from '@tanstack/react-query';
import { fetchAllShipments } from '@/services/apiService';

// query shipements data
export const useShipmentsQuery = () => {
    return useQuery({
        queryKey: ['shipments'],
        queryFn: fetchAllShipments,
    });
};