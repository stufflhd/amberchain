import { useQuery } from '@tanstack/react-query';
import { fetchAllShipments } from '@/services/apiService';

export const useShipmentsQuery = () => {
    return useQuery({
        queryKey: ['shipments'],
        queryFn: fetchAllShipments,
    });
};