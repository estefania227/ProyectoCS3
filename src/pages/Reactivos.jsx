import { useEffect, useState } from "react";
import { api } from "../services/api";

function Reactivos() {
  const [reactivos, setReactivos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState("");
  const [vencimiento, setVencimiento] = useState("");

  useEffect(() => {
    cargarReactivos();
  }, []);

  const cargarReactivos = async () => {
    try {
      const res = await api.get("/reactivos");
      setReactivos(res.data);
    } catch (error) {
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  const agregarReactivo = async (e) => {
    e.preventDefault();

    try {
      await api.post("/reactivos", {
        nombre,
        stock,
        vencimiento
      });

      cargarReactivos();

      setNombre("");
      setStock("");
      setVencimiento("");
    } catch (error) {
      alert("No se puede registrar el reactivo");
    }
  };

  return (
    <div className="container mt-4">

      <h2>Reactivos</h2>

      <form className="card p-3 mb-4" onSubmit={agregarReactivo}>

        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          type="date"
          className="form-control mb-2"
          value={vencimiento}
          onChange={(e) => setVencimiento(e.target.value)}
        />

        <button className="btn btn-success">
          Registrar
        </button>

      </form>

      {/* lista */}
      <div className="row">

        {reactivos.map((r) => (
          <div className="col-md-4 mb-3" key={r.id}>
            <div className="card p-3 shadow">

              <h5>{r.nombre}</h5>
              <p>Existencia: {r.stock}</p>
              <p>Vence: {r.vencimiento}</p>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Reactivos;