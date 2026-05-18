/*function App() {
  return (
    <div className="container mt-5">
      <h1>🧪 Sistema Laboratorio Nanomateriales</h1>
      <p>Proyecto funcionando correctamente</p>
    </div>
  );
}

export default App;*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Reactivos from "./pages/Reactivos";
import Ordenes from "./pages/Ordenes";
import Equipos from "./pages/Equipos";
import Nanomateriales from "./pages/Nanomateriales";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/reactivos"
  element={
    <ProtectedRoute>
      <Reactivos />
    </ProtectedRoute>
  }
/>
<Route
  path="/ordenes"
  element={
    <ProtectedRoute>
      <Ordenes />
    </ProtectedRoute>
  }
/>
     <Route
  path="/equipos"
  element={
    <ProtectedRoute>
      <Equipos />
    </ProtectedRoute>
  }
/>
<Route
  path="/nanomateriales"
  element={
    <ProtectedRoute>
      <Nanomateriales />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;