import { useQuery } from '@tanstack/react-query';
import { searchParticipants } from '@/services/participantsService';

export const useParticipantsSearch = (searchTerm) => {
    return useQuery({
        queryKey: ['participants', 'search', searchTerm],
        queryFn: () => searchParticipants(searchTerm),
        enabled: searchTerm !== undefined && searchTerm.length >= 2,
    });
};
