import { Navigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';

export default function RequireRole({ allowedRoles, children }) {
    const { user } = useAuthStore();

    // If there is a user and their role is in the list of allowed roles,=> render the children components
    if (user && allowedRoles?.includes(user.role)) {
        return children;
    }

    // If there is a user but their role is NOT allowed => send them to the dashboard
    if (user) {
        return <Navigate to="/" />;
    }

    // If there is no user at all => redirect to login
    return <Navigate to="/auth/login" />;
}