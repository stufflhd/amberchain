import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthLayout from "@/app/layouts/AuthLayout";
import MainLayout from "@/app/layouts/MainLayout";
import RootLayout from "@/app/layouts/RootLayout";
import ProtectedRoute from "./ProtectedRoute";
import RequireRole from "./RequireRole";
import PageLoader from "@/components/PageisLoading";
import NotFoundPage from "@/features/errors/NotFoundPage";
import ActiveShipmentsDashboard from "@/features/shipments/ActiveShipmentsDashboard";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const AdminPage = lazy(() => import("@/features/admin/AdminPage"));
const ShipmentsDashboard = lazy(() => import("@/features/shipments/shipmentsDashboard"));
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
                element: <AuthLayout />,
                errorElement: (
                    <AuthLayout>
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
                        element: <MainLayout />,
                        errorElement: (
                            <MainLayout>
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
                    <AuthLayout>
                        <NotFoundPage />
                    </AuthLayout>
                ),
            },
            {
                path: "shipments",
                element: (
                    <MainLayout>
                        <ShipmentsDashboard />
                    </MainLayout>
                ),
            },
            {
                path: "active-shipments",
                element: (
                    <MainLayout>
                        <ActiveShipmentsDashboard />
                    </MainLayout>
                ),
            },
            {
                path: "dashboard",
                element: (
                    <MainLayout>
                        <ClientsDashboard />
                    </MainLayout>
                ),
            },
            {
                path: "dashboard-view",
                element: (
                    <MainLayout>
                        <ClientsDashboard />
                    </MainLayout>
                ),
            },
        ],
    },
]);

export default router;