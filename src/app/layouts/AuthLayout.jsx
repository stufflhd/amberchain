import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout bg-accent/70 min-h-screen">
      <Navbar type='auth'/>
      {children || <Outlet />}
    </div>
  );
}