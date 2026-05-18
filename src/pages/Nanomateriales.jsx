import { useEffect, useState } from "react";
import { api } from "../services/api";

function Nanomateriales() {

  const [nanomateriales, setNanomateriales] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarNanomateriales();
  }, []);

  const cargarNanomateriales = async () => {
    try {
      const res = await api.get("/nanomateriales");
      setNanomateriales(res.data);
    } catch (error) {
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  const crearNanomaterial = async (e) => {
    e.preventDefault();

    try {
      await api.post("/nanomateriales", {
        nombre,
        descripcion
      });
      setNombre("");
      setDescripcion("");
      cargarNanomateriales();
    } catch (error) {
      alert("No se puede registrar el nanomaterial");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Nanomateriales</h2>

      {}
      <form className="card p-3 mb-4 shadow" onSubmit={crearNanomaterial}>
        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <textarea
          className="form-control mb-2"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <button className="btn btn-dark w-100">
          Registrar
        </button>

      </form>

      {}
      {loading ? (
        <p>Listar nanomateriales</p>
      ) : (
        <div className="row">

          {nanomateriales.map((n) => (
            <div className="col-md-4 mb-3" key={n.id}>

              <div className="card p-3 shadow">
                <h5>{n.nombre}</h5>
                <p>{n.descripcion}</p>
              </div>
            </div>))}
        </div>
      )}
    </div>);
    }

export default Nanomateriales;