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
    if (!token) {
      setMessage("❌ Missing token. Please check your link.");
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        // replace this with your backend base URL
        // const res = await axios.get(
        //   `https://wapp.amberchains.com/api/users/email-validation?token=${token}`
        // );
 const res = await axios.put(
          `https://wapp.amberchains.com/api/users/email-validation?token=${encodeURIComponent(token)}`
        );
        
        if (res.status === 200) {
          setMessage("✅ Email verified! Redirecting to login...");
          setTimeout(() => navigate("/auth/login"), 2000);
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
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
      <div className="p-6 max-w-md rounded-2xl shadow-md bg-white">
        <h1 className="text-2xl font-semibold mb-4">Email Verification</h1>
        <p className="text-gray-700">{message}</p>
        {loading && (
          <div className="mt-6 animate-spin rounded-full h-10 w-10 border-t-2 border-gray-400"></div>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
