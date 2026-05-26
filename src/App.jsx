import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

// Páginas
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reactivos from "./pages/Reactivos";
import Equipos from "./pages/Equipos";
import Nanomateriales from "./pages/Nanomateriales";
import Ordenes from "./pages/Ordenes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Ruta pública */}
          <Route path="/" element={<Login />} />

          {/* Rutas protegidas */}
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
          <Route
            path="/ordenes"
            element={
              <ProtectedRoute>
                <Ordenes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;