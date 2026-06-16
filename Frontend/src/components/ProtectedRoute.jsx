import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, token } = useContext(AuthContext);

  if (!token || !user) {
    // Non connecté, redirection vers login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Connecté mais pas le bon rôle, redirection vers l'accueil
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
