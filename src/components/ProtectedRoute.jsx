import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // Mientras carga, mostrar loading
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <p>Cargando...</p>
      </div>
    );
  }

  // Si no hay usuario, redirigir a login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si hay usuario, mostrar el componente
  return children;
}

export default ProtectedRoute;