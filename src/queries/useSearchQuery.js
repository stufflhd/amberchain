import { useQuery } from '@tanstack/react-query';
import { searchAll } from '@/services/apiService';

export const useSearchQuery = (searchTerm) => {
    return useQuery({
        queryKey: ['globalSearch', searchTerm],
        queryFn: () => searchAll({ searchTerm }),
        enabled: !!searchTerm, 
    });
};