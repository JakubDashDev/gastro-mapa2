import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (!userInfo) return <Navigate to="/admin/auth" replace />;

  return <Outlet />;
};

export default AdminRoute;
