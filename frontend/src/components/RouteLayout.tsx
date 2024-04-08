import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./ui/SideBar";
import NavBar from "./ui/NavBar";
import { useAppSelector } from "../redux/store";

const AdminRoute = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);

  if (!userInfo) return <Navigate to="/dashboard/auth" replace />;

  return (
    <div className="flex flex-col lg:flex-row bg-gray-200">
      <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex-1">
        <NavBar setShowSidebar={setShowSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoute;
