import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginAPI } from "../services/authService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Llamar a la API
      const response = await loginAPI(username, password);

      if (response.ok) {
        // Si el login fue exitoso, guardar en contexto
        login(response.usuario, response.token);

        // Navegar a dashboard (replace: true evita volver atrás)
        navigate("/dashboard", { replace: true });
      } else {
        // Si falla, mostrar error
        setError(response.message || "Datos incorrectos");
      }
    } catch (err) {
      setError(err.message || "Error en la conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Laboratorio - Login</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleLogin} className="card p-4 shadow">
            <div className="mb-3">
              <label className="form-label">Usuario</label>
              <input
                type="text"
                className="form-control"
                placeholder="admin, cientifico1, operador1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="1234"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Autenticando..." : "Entrar"}
            </button>

            <div className="mt-3 small text-muted">
              <p><strong>Usuarios de prueba:</strong></p>
              <ul>
                <li>admin / 1234 (ADMIN)</li>
                <li>cientifico1 / 1234 (SCIENTIST)</li>
                <li>operador1 / 1234 (OPERATOR)</li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;