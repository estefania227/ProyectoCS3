import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div className="container mt-5">
            <h2>Bienvenido(a)</h2>
            { }
            <Link to="/reactivos" className="btn btn-primary">
                Reactivos
            </Link>
            <Link to="/ordenes" className="btn btn-warning ms-2">
                Órdenes de síntesis
            </Link>
            <Link to="/equipos" className="btn btn-secondary ms-2">
                Equipos
            </Link>
            <Link to="/nanomateriales" className="btn btn-info ms-2">
                Nanomateriales
            </Link>
        </div>
    );
}

export default Dashboard;