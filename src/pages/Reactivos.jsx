import { useState } from "react";

function Reactivos() {
  const [reactivos, setReactivos] = useState([
    { id: 1, nombre: "Ácidos", stock: 10, vencimiento: "2026-12-01" },
    { id: 2, nombre: "Hidróxidos", stock: 5, vencimiento: "2025-06-10" }
  ]);

  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState("");
  const [vencimiento, setVencimiento] = useState("");

  const agregarReactivo = (e) => {
    e.preventDefault();

    const nuevo = {
      id: Date.now(),
      nombre,
      stock: Number(stock),
      vencimiento
    };

    setReactivos([...reactivos, nuevo]);

    setNombre("");
    setStock("");
    setVencimiento("");
  };

  return (
    <div className="container mt-4">

      <h2>Reactivos químicos</h2>

      {}
      <form className="card p-3 mb-4" onSubmit={agregarReactivo}>
        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Existencias"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Fecha de vencimiento"
          type="date"
          value={vencimiento}
          onChange={(e) => setVencimiento(e.target.value)}
        />

        <button className="btn btn-success">
          Agregar
        </button>
      </form>

      {}
      <div className="row">

        {reactivos.map((r) => (
          <div className="col-md-4 mb-3" key={r.id}>
            <div className="card p-3 shadow">
              <h5>{r.nombre}</h5>
              <p>Disponibles: {r.stock}</p>

              <p>
                F.V.:{" "}
                <span className={r.vencimiento < "2026-01-01"
                  ? "text-danger"
                  : "text-success"}>
                  {r.vencimiento}
                </span>
              </p>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Reactivos;