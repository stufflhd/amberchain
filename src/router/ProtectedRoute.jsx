import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import AuthLayout from '@/app/layouts/AuthLayout';
import PageLoader from '@/components/PageisLoading';

export default function ProtectedRoute() {
    const { user, isLoading } = useAuthStore();

    if (isLoading) {
        return (
            <AuthLayout>
                <PageLoader />
            </AuthLayout>
        );
    }
    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
}