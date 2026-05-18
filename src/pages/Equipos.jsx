import { useState } from "react";

function Equipos() {
  const [equipos, setEquipos] = useState([
    { id: 1, nombre: "Tubo de ensayo", estado: "Disponible" },
    { id: 2, nombre: "Microscopio", estado: "En mantenimiento" }
  ]);

  const [nombre, setNombre] = useState("");

  const agregarEquipo = (e) => {
    e.preventDefault();

    const nuevo = {
      id: Date.now(),
      nombre,
      estado: "Disponible"
    };

    setEquipos([...equipos, nuevo]);
    setNombre("");
  };

  const cambiarEstado = (id, estado) => {
    const actualizados = equipos.map((eq) =>
      eq.id === id ? { ...eq, estado } : eq
    );

    setEquipos(actualizados);
  };

  return (
    <div className="container mt-4">

      <h2>Equipamiento del laboratorio</h2>

      {/*form*/}
      <form className="card p-3 mb-4" onSubmit={agregarEquipo}>

        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <button className="btn btn-success">
          Agregar equipo
        </button>

      </form>

      {/* lista */}
      <div className="row">

        {equipos.map((e) => (
          <div className="col-md-4 mb-3" key={e.id}>
            <div className="card p-3 shadow">

              <h5>{e.nombre}</h5>

              <p>
                Estado:{" "}
                <span className="badge bg-info">
                  {e.estado}
                </span>
              </p>

              <div className="d-flex gap-2 flex-wrap">

                <button
                  className="btn btn-success btn-sm"
                  onClick={() => cambiarEstado(e.id, "Disponible")}
                >
                  Disponible
                </button>

                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => cambiarEstado(e.id, "En mantenimiento")}
                >
                  En mantenimiento
                </button>

                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => cambiarEstado(e.id, "Ocupado")}
                >
                  Ocupado
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Equipos;