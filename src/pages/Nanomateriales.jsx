import { useState } from "react";

function Nanomateriales() {
  const [materiales, setMateriales] = useState([
    {
      id: 1,
      nombre: "Nanopartículas de oro",
      descripcion: "Uso: Pruebas de embarazo, COVID y VIH.",
      activo: true
    },
    {
      id: 2,
      nombre: "Nanopartículas de plata",
      descripcion: "Uso: Antibacterianas",
      activo: true
    }
  ]);

  const toggleEstado = (id) => {
    const actualizados = materiales.map((m) =>
      m.id === id ? { ...m, activo: !m.activo } : m
    );

    setMateriales(actualizados);
  };

  return (
    <div className="container mt-4">

      <h2>Nanomateriales</h2>

      <div className="row">

        {materiales.map((m) => (
          <div className="col-md-6 mb-3" key={m.id}>
            <div className="card p-3 shadow">

              <h5>{m.nombre}</h5>

              <p>{m.descripcion}</p>

              <p>
                Estado:{" "}
                <span className={m.activo ? "badge bg-success" : "badge bg-danger"}>
                  {m.activo ? "Activo" : "Inactivo"}
                </span>
              </p>

              <button
                className="btn btn-warning btn-sm"
                onClick={() => toggleEstado(m.id)}
              >
                Activar / Inactivar
              </button>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Nanomateriales;