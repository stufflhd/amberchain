import { useQuery } from '@tanstack/react-query';

const fetchCurrentUser = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { id: 1, name: 'Demo User', email: 'demo@example.com', role: 'client' };
};

export default function useCurrentUserQuery() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
