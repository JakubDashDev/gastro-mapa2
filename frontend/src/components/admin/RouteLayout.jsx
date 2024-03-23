import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import SideBar from './UI/SideBar';
import NavBar from './UI/NavBar';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) return <Navigate to="/dashboard/auth" replace />;

  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-200">
      <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="flex-1">
        <NavBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoute;
