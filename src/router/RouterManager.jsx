import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "@/app/layouts/AuthLayout";
import MainLayout from "@/app/layouts/MainLayout";
import RootLayout from "@/app/layouts/RootLayout";
import ProtectedRoute from "./ProtectedRoute";
import RequireRole from "./RequireRole";
import PageLoader from "@/components/PageisLoading";
import NotFoundPage from "@/features/errors/NotFoundPage";
import ActiveShipmentsOverview from "@/features/shipments/ActiveShipmentsOverview";
import SearchResultsPage from "@/features/search/SearchResultsPage";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const AdminPage = lazy(() => import("@/features/admin/AdminPage"));
const ClientsDashboard = lazy(() => import("@/features/Clients/ClientsDashboard"));

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<PageLoader />}>
                <RootLayout />
            </Suspense>
        ),
        children: [
            {
                path: "auth",
                element: <AuthLayout title="pageTitles.login" />,
                errorElement: (
                    <AuthLayout title="pageTitles.notFound">
                        <NotFoundPage />
                    </AuthLayout>
                ),
                children: [
                    { index: true, element: <Navigate to="/auth/login" /> },
                    { path: "login", element: <LoginPage /> },
                    { path: "register", element: <RegisterPage /> },
                ],
            },
            {
                path: "",
                element: <ProtectedRoute />,
                children: [
                    {
                        element: <MainLayout title="pageTitles.home" />,
                        errorElement: (
                            <MainLayout title="pageTitles.notFound">
                                <NotFoundPage />
                            </MainLayout>
                        ),
                        children: [
                            { index: true, element: <div>Dashboard placeholder</div> },
                            {
                                path: "admin",
                                element: (
                                    <RequireRole allowedRoles={["admin"]}>
                                        <AdminPage />
                                    </RequireRole>
                                ),
                            },
                        ],
                    },
                ],
            },
            {
                path: "*",
                element: (
                    <AuthLayout title="pageTitles.notFound">
                        <NotFoundPage />
                    </AuthLayout>
                ),
            },
            {
                path: "search",
                element: (
                    <MainLayout title="pageTitles.searchResults">
                        <SearchResultsPage />
                    </MainLayout>
                ),
            },
            {
                path: "active-shipments",
                element: (
                    <MainLayout title="pageTitles.active-shipments">
                        <ActiveShipmentsOverview />
                    </MainLayout>
                ),
            },
            {
                path: "dashboard",
                element: (
                    <MainLayout title="pageTitles.dashboard">
                        <ClientsDashboard />
                    </MainLayout>
                ),
            },
            {
                path: "dashboard-view",
                element: (
                    <MainLayout title="pageTitles.dashboard-view">
                        <ClientsDashboard />
                    </MainLayout>
                ),
            },
        ],
    },
]);

export default router;