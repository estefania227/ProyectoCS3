import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("user", JSON.stringify({email}));
      navigate("/dashboard");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
        <h3>Laboratorio</h3>
          <form onSubmit={handleLogin}>

            <input
              className="form-control mb-2"
              placeholder="Correo electrónico"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary w-100">
              Iniciar sesión
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;