import { useQuery } from '@tanstack/react-query';
import { fetchAllQuotations } from '@/services/apiService';

export const useQuotationsQuery = (options) => {
    return useQuery({
        queryKey: ['quotations'],
        queryFn: () => fetchAllQuotations(),
        ...options,
    });
};

