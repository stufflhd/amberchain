import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "@/app/layouts/AuthLayout";
import MainLayout from "@/app/layouts/MainLayout";
import RootLayout from "@/app/layouts/RootLayout";
import ProtectedRoute from "./ProtectedRoute";
import RequireRole from "./RequireRole";
import PageLoader from "@/components/PageisLoading";
import NotFoundPage from "@/features/errors/NotFoundPage";
import AuthRedirect from "@/app/AuthRedirect";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));
const AdminPage = lazy(() => import("@/features/admin/AdminPage"));
const ClientsDashboard = lazy(() => import("@/features/Clients/ClientsDashboard"));
const ActiveShipmentsOverview = lazy(() => import("@/features/shipments/ActiveShipmentsOverview"));
const QuotationsOverview = lazy(() => import("@/features/quotations/QuotationsOverview"));
const SearchResultsPage = lazy(() => import("@/features/search/SearchResultsPage"));
const BookingsOverview = lazy(() => import("@/features/bookings/BookingsOverview"));
const ContainersOverview = lazy(() => import("@/features/containers/ContainersOverview"));
const CompareOptions = lazy(() => import("@/features/compareOptions/CompareOptions"));
const Quote = lazy(() => import("@/features/quote/Quote"));
const EmailVerify = lazy(() => import("@/features/auth/pages/EmailVerify"));

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
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <AuthRedirect />
          </Suspense>
        ),
      },
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
          { 
            path: "login", 
            element: (
              <Suspense fallback={<PageLoader />}>
                <LoginPage />
              </Suspense>
            ),
          },
          { 
            path: "register", 
            element: (
              <Suspense fallback={<PageLoader />}>
                <RegisterPage />
              </Suspense>
            ),
          },
          { 
            path: "emailVerify", 
            element: (
              <Suspense fallback={<PageLoader />}>
                <EmailVerify />
              </Suspense>
            ),
          },
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
              { path: "dashboard", element: <ClientsDashboard /> },
              { path: "bookings", element: <BookingsOverview /> },
              { path: "quotations", element: <QuotationsOverview /> },
              { path: "containers", element: <ContainersOverview /> },
              { path: "containers/:shipmentId", element: <ContainersOverview /> },
              { path: "active-shipments", element: <ActiveShipmentsOverview /> },
              { path: "compare-options", element: <CompareOptions /> },
              { path: "quote", element: <Quote /> },
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
        path: "search",
        element: (
          <MainLayout title="pageTitles.searchResults">
            <SearchResultsPage />
          </MainLayout>
        ),
      },
      {
        path: "*",
        element: (
          <AuthLayout title="pageTitles.notFound">
            <NotFoundPage />
          </AuthLayout>
        ),
      },
    ],
  },
]);

export default router;
