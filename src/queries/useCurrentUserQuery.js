import { useQuery } from '@tanstack/react-query';


const fetchCurrentUser = async () => {
  // Only return a demo user when a token is present in localStorage.
  // This avoids auto-authenticating users when no token exists (e.g., after logout).
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  // Simulate network latency for development/mock environment
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
