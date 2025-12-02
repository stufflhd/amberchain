import { useEffect, useState } from "react";

export function useSubmittedBookingBanner() {
  const [show, setShow] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const raw = localStorage.getItem("submittedBooking");
    if (!raw) return;

    let parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch {
      localStorage.removeItem("submittedBooking");
      return;
    }

    const expiresAt = parsed?.expiresAt
      ? Number(parsed.expiresAt)
      : Date.now() + 30_000;

    const remainingMs = expiresAt - Date.now();
    if (remainingMs <= 0) {
      localStorage.removeItem("submittedBooking");
      return;
    }

    setShow(true);
    setCountdown(Math.ceil(remainingMs / 1000));

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShow(false);
          localStorage.removeItem("submittedBooking");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.removeItem("submittedBooking");
  };

  return { show, countdown, dismiss };
}
