
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import useCurrentUserQuery from "@/queries/useCurrentUserQuery";

export default function AuthRedirect() {
  const navigate = useNavigate();
  const { user, isLoading, setUser } = useAuthStore();
  const { data, isLoading: isQueryLoading, isFetched } = useCurrentUserQuery();

  useEffect(() => {
    if (isQueryLoading) return;
    setUser(data || null);
  }, [isQueryLoading, data]);

  useEffect(() => {
    if (isLoading) return;
    if (!isFetched) return;
    if (user) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/auth/login", { replace: true });
    }
  }, [user, isLoading, isFetched, navigate]);

  return null;
}
