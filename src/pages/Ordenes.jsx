import { useState } from "react";

function Ordenes() {
  const [ordenes, setOrdenes] = useState([
    {
      id: 1,
      nanomaterial: "Órden 1",
      estado: "Borrador",
      equipo: "xxxx"
    }
  ]);

  const [nanomaterial, setNanomaterial] = useState("");
  const [equipo, setEquipo] = useState("");

  const crearOrden = (e) => {
    e.preventDefault();

    const nuevaOrden = {
      id: Date.now(),
      nanomaterial,
      equipo,
      estado: "Borrador"
    };

    setOrdenes([...ordenes, nuevaOrden]);

    setNanomaterial("");
    setEquipo("");
  };

  const cambiarEstado = (id, estado) => {
    const actualizadas = ordenes.map((o) =>
      o.id === id ? { ...o, estado } : o
    );

    setOrdenes(actualizadas);
  };

  return (
    <div className="container mt-4">

      <h2>Órdenes de síntesis</h2>

      {/* form */}
      <form className="card p-3 mb-4" onSubmit={crearOrden}>

        <input
          className="form-control mb-2"
          placeholder="Nanomaterial"
          value={nanomaterial}
          onChange={(e) => setNanomaterial(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Equipo"
          value={equipo}
          onChange={(e) => setEquipo(e.target.value)}
        />

        <button className="btn btn-success">
          Crear orden
        </button>

      </form>

      {/* lista */}
      <div className="row">

        {ordenes.map((o) => (
          <div className="col-md-6 mb-3" key={o.id}>
            <div className="card p-3 shadow">

              <h5>{o.nanomaterial}</h5>

              <p>
                Estado:{" "}
                <span className="badge bg-warning text-dark">
                  {o.estado}
                </span>
              </p>

              <p>Equipo: {o.equipo}</p>

              {/* estado orden */}
              <div className="d-flex gap-2">

                <button
                  className="btn btn-success btn-sm"
                  onClick={() => cambiarEstado(o.id, "Aprobada")}
                >
                  Aprobar
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => cambiarEstado(o.id, "En proceso")}
                >Procesar</button>

                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => cambiarEstado(o.id, "Completada")}
                >Completar</button>

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Ordenes;