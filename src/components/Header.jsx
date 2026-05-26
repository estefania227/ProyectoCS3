import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { logoutAPI } from "../services/authService";

function Header() {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Llamar al backend para cerrar sesión
      await logoutAPI(token);
    } catch (err) {
      console.log("Error en logout:", err);
    } finally {
      // Siempre limpiar localmente
      logout();
      navigate("/", { replace: true });
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link to="/dashboard" className="navbar-brand">
          🔬 Laboratorio de Nanomateriales
        </Link>

        {user && (
          <div className="d-flex align-items-center gap-3">
            <span className="text-white small">
              👤 {user.username} <strong>[{user.rol}]</strong>
            </span>
            <button
              className="btn btn-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;