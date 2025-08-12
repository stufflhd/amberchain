import AuthLayout from "@/app/layouts/AuthLayout";
import MainLayout from "@/app/layouts/MainLayout";
import RootLayout from "@/app/layouts/RootLayout";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "@/features/errors/NotFoundPage";
import AdminPage from "@/features/admin/AdminPage";
import RequireRole from "./RequireRole";
import ShipmentsDashboard from "@/features/shipments/shipmentsDashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
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
        ],
    },
]);

export default router;