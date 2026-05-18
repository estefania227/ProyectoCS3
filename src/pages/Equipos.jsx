import { useEffect, useState } from "react";
import { api } from "../services/api";

function Equipos() {

  const [equipos, setEquipos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("Disponible");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEquipos();
  }, []);

  const cargarEquipos = async () => {
    try {
      const res = await api.get("/equipos");
      setEquipos(res.data);
    } catch (error) {alert("Error");
    } finally {
      setLoading(false);
    }
  };

  const crearEquipo = async (e) => {
    e.preventDefault();

    try {
      await api.post("/equipos", {
        nombre,
        estado
      });

      setNombre("");
      setEstado("Disponible");

      cargarEquipos();

    } catch (error) {
      alert("No se puede registrar el equipo");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Equipos del laboratorio</h2>

      {}
      <form className="card p-3 mb-4 shadow" onSubmit={crearEquipo}>

        <input
          className="form-control mb-2"
          placeholder="Nombre del equipo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <select
          className="form-control mb-2"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="Disponible">Disponible</option>
          <option value="Ocupado">Ocupado</option>
        </select>

        <button className="btn btn-primary w-100">
          Registrar
        </button>

      </form>

      {}
      {loading ? (
        <p>Listar equipos</p>
      ) : (
        <div className="row">

          {equipos.map((e) => (
            <div className="col-md-4 mb-3" key={e.id}>

              <div className="card p-3 shadow">

                <h5>{e.nombre}</h5>

                <span className={`badge ${
                  e.estado === "Disponible"
                    ? "bg-success"
                    : "bg-danger"
                }`}>
                  {e.estado}
                </span>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Equipos;