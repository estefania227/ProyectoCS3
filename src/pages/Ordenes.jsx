import { useEffect, useState } from "react";
import { api } from "../services/api";

function Ordenes() {

  // estados en componentes
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nanomateriales, setNanomateriales] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [reactivosList, setReactivosList] = useState([]);
  const [nanomaterial, setNanomaterial] = useState("");
  const [equipo, setEquipo] = useState("");
  const [reactivos, setReactivos] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);

      const [ord, nanos, eq, reac] = await Promise.all([
        api.get("/ordenes"),
        api.get("/nanomateriales"),
        api.get("/equipos"),
        api.get("/reactivos")
      ]);

      setOrdenes(ord.data);
      setNanomateriales(nanos.data);
      setEquipos(eq.data);
      setReactivosList(reac.data);

    } catch (error) {
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  // validar existencia de retroactivos
  const validarStock = () => {
    for (let r of reactivos) {
      const encontrado = reactivosList.find(x => x.nombre === r);

      if (!encontrado || encontrado.stock <= 0) {
        return false;
      }
    }
    return true;
  };


  const crearOrden = async (e) => {
    e.preventDefault();

    if (!validarStock()) {
      alert("No hay existencia suficiente de retroactivos");
      return;
    }

    try {
      await api.post("/ordenes", {
        nanomaterial,
        reactivos,
        equipo
      });

      setNanomaterial("");
      setReactivos([]);
      setEquipo("");

      cargarDatos();

    } catch (error) {
      alert("No se puede registrar la orden");
    }
  };

  const cambiarEstado = async (id, estado) => {
    try {
      await api.put(`/ordenes/${id}/estado?estado=${estado}`);
      cargarDatos();

    } catch (error) {
      console.log(error);
      alert("Error cambiando estado");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Órdenes de síntesis</h2>

      { }
      <form className="card p-3 mb-4 shadow" onSubmit={crearOrden}>
        { }
        <select
          className="form-control mb-2"
          value={nanomaterial}
          onChange={(e) => setNanomaterial(e.target.value)}
          required
        >
          <option value="">Selecciona un nanomaterial</option>
          {nanomateriales.map((n) => (
            <option key={n.id} value={n.nombre}>
              {n.nombre}
            </option>
          ))}
        </select>

        { }
        <label className="form-label">Selecciona los reactivos:</label>
        <select
          className="form-control mb-2"
          multiple
          value={reactivos}
          onChange={(e) =>
            setReactivos(
              Array.from(e.target.selectedOptions, option => option.value)
            )
          } required>

          {reactivosList.map((r) => (
            <option key={r.id} value={r.nombre}>
              {r.nombre} (stock: {r.stock})
            </option>
          ))}
        </select>

        { }
        <select
          className="form-control mb-2"
          value={equipo}
          onChange={(e) => setEquipo(e.target.value)}
          required
        >
          <option value="">Selecciona un equipo</option>
          {equipos.map((e) => (
            <option key={e.id} value={e.nombre}>
              {e.nombre}
            </option>
          ))}
        </select>

        <button className="btn btn-primary w-100">
          Registrar
        </button>

      </form>

      { }
      {loading ? (
        <p>Listar órdenes</p>
      ) : (
        <div className="row">

          {ordenes.map((o) => (
            <div className="col-md-4 mb-3" key={o.id}>

              <div className="card shadow p-3">
                <p><b>Nanomarierial1:</b> {o.nanomaterial}</p>
                <p><b>Reactivos:</b></p>
                <ul>
                  {o.reactivos?.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
                <p><b>Equipo:</b> {o.equipo}</p>


                {}
                <span className={`badge ${o.estado === "Borrador"
                    ? "bg-secondary"
                    : o.estado === "Aprobada"
                      ? "bg-primary"
                      : o.estado === "En proceso"
                        ? "bg-warning text-dark"
                        : o.estado === "Cancelada"
                          ? "bg-danger"
                          : "bg-success"
                  }`}>
                  {o.estado}
                </span>

                <div className="d-flex gap-2 mt-2 flex-wrap">

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => cambiarEstado(o.id, "Aprobada")}
                  >
                    Aprobar
                  </button>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => cambiarEstado(o.id, "En proceso")}
                  >
                    Proceso
                  </button>

                  <button
                    className="btn btn-dark btn-sm"
                    onClick={() => cambiarEstado(o.id, "Completada")}
                  >
                    Completar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => cambiarEstado(o.id, "Cancelada")}
                  >
                    Cancelar
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Ordenes;