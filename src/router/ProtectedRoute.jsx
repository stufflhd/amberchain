import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuthStore from '@/store/authStore';
import PageLoader from '@/components/PageisLoading';
import { getConnectedUser } from '@/services/auth';

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const { user, token, setAuth, logout } = useAuthStore();
  const [isFetchingUser, setIsFetchingUser] = useState(false);

  useEffect(() => {
    let mounted = true;
    const ensureUser = async () => {
      if (!token || user) return;
      setIsFetchingUser(true);
      try {
        const fetched = await getConnectedUser();
        if (!mounted) return;
        // If backend returns a valid user, set it in the store
        if (fetched) {
          setAuth(fetched, token);
        } else {
          // No valid session on server side: clear auth and navigate to login
          logout();
          navigate('/auth/login', { replace: true });
        }
      } catch (e) {
        // On any error, clear auth and redirect to login
        logout();
        navigate('/auth/login', { replace: true });
      } finally {
        if (mounted) setIsFetchingUser(false);
      }
    };

    ensureUser();
    return () => {
      mounted = false;
    };
  }, [token, user, setAuth, logout, navigate]);

  // No token means unauthenticated
  if (!token) return <Navigate to="/auth/login" replace />;

  // While fetching user data, show loader to avoid exposing protected UI
  if (isFetchingUser || (token && !user)) return <PageLoader />;

  return <Outlet />;
}
