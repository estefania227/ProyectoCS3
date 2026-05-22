import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", {
        username,
        password
      });

      if (res.data.ok) {
        localStorage.setItem("user","admin");
        localStorage.setItem("token", res.data.token);
        
        navigate("/dashboard");
      } else {
        alert("Datos incorrectos");
      }

    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div className="container mt-5">

      <h2>Laboratorio</h2>

      <form onSubmit={handleLogin} className="card p-3">

        <input
          className="form-control mb-2"
          placeholder="Usuario"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary">
          Entrar
        </button>

      </form>

    </div>
  );
}

export default Login;