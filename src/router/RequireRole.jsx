import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

export default function RequireRole({ allowedRoles, children }) {
    const { user } = useAuthStore();

    if (user && allowedRoles?.includes(user.role)) {
        return children;
    }

    if (user) {
        return <Navigate to="/" />;
    }

    return <Navigate to="/auth/login" />;
}