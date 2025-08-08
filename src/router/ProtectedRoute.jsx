import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import AuthLayout from '@/app/layouts/AuthLayout';
import PageLoader from '@/components/PageisLoading';

export default function ProtectedRoute() {
    const { user, isLoading } = useAuthStore();

    // If we are still checking for a user, show a loading indicator
    if (isLoading) {
        return (
            <AuthLayout>
                <PageLoader />
            </AuthLayout>
        );
    }

    // If we finished loading and there is NO user, redirect to login
    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    // If we finished loading and there IS a user, show the requested page
    return <Outlet />;
}