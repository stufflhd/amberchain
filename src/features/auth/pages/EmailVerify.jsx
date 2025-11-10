import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EmailVerify = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying your email...");
  const navigate = useNavigate();
  const token = searchParams.get("token");

  useEffect(() => {
    // Always redirect to login after 8 seconds
    const redirectTimer = setTimeout(() => navigate("/auth/login"), 8000);

    if (!token) {
      setMessage("❌ Your account needs confirmation. Please check your email.");
      setLoading(false);
      return () => clearTimeout(redirectTimer);
    }

    const verifyEmail = async () => {
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_APP_DOMAIN}/users/email-validation?token=${encodeURIComponent(token)}`
        );

        if (res.status === 200) {
          setMessage("✅ Email verified successfully! Redirecting to login...");
        }
      } catch (error) {
        const status = error.response?.status;
        console.error("Email validation error:", error);

        if (status === 400)
          setMessage("⚠️ Bad request. Please try again later.");
        else if (status === 401)
          setMessage("❌ Invalid or expired verification link.");
        else if (status === 403)
          setMessage("🚫 You are not allowed to verify this email.");
        else if (status === 404)
          setMessage("🔗 Verification link not found or expired.");
        else
          setMessage("💥 Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();

    return () => clearTimeout(redirectTimer);
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <div className="max-w-md w-full p-6 md:p-8 bg-card text-card-foreground border border-border shadow-sm rounded-lg text-center transition-transform duration-300 hover:scale-[1.01]">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3">
          Email Verification
        </h1>
        <p
          className={`text-base md:text-lg transition-colors duration-300 ${
            message.includes("✅")
              ? "text-primary"
              : message.includes("❌") || message.includes("🚫")
              ? "text-destructive"
              : message.includes("⚠️") || message.includes("🔗")
              ? "text-secondary"
              : "text-muted-foreground"
          }`}
        >
          {message}
        </p>

        {loading && (
          <div className="mt-6 flex justify-center">
            <div className="h-10 w-10 border-4 border-input border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        <p className="mt-6 text-sm text-muted-foreground animate-pulse">
          You’ll be redirected to login shortly...
        </p>
      </div>
    </div>
  );
};

export default EmailVerify;
