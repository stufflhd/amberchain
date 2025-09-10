import { useQuery } from '@tanstack/react-query';
import { fetchAllBookings } from '@/services/apiService';

export const useBookingsQuery = (options) => {
    return useQuery({
        queryKey: ['bookings'],
        queryFn: () => {
            return fetchAllBookings();
        },
        ...options,
    });
};