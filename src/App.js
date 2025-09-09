// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavPage from './Pages/NavPage';
import IngresoTurno from './Pages/turno/IngresoTurno';
import ConfirmarPago from './Pages/ConfirmarPago';
import PatientView from './Pages/Patient/PatientVIew';
import PatientCreateView from './Pages/Patient/PatientCreateView';
import PatientEditView from './Pages/Patient/PatientEditView';
import GestionTurnos from './Pages/turno/GestionTurno';
import VisualizacionTurnos from './Pages/turno/VisualizacionTurnos';
import TerapeutaView from './Pages/Terapeuta/TerapeutaView';
import TerapeutaCreateView from './Pages/Terapeuta/TerapeutaCreateView';
import TerapeutaEditView from './Pages/Terapeuta/TerapeutaEditView';
import ReporteView from './Pages/Report/ReporteView';
import LoginView from './Pages/Login/LoginView';
import PrivateRoute from './components/PrivateRoute';
import TokenRefresher from './components/TokenRefresher';

function App() {
  return (
    <Router>
      <TokenRefresher/>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/menu" element={<NavPage />} />

          {/* Pacientes */}
          <Route
            path="/paciente"
            element={<PrivateRoute element={PatientView} allowedRoles={['administrador', 'recepcionista']} />}
          />
          <Route
            path="/paciente/crear"
            element={<PrivateRoute element={PatientCreateView} allowedRoles={['administrador','recepcionista']} />}
          />
          <Route
            path="/paciente/editar/:id"
            element={<PrivateRoute element={PatientEditView} allowedRoles={['administrador','recepcionista']} />}
          />

          {/* Turnos */}
          <Route
            path="/ingreso"
            element={<PrivateRoute element={IngresoTurno} allowedRoles={['administrador', 'recepcionista', 'ingresar']} />}
          />
          <Route
            path="/gestion"
            element={<PrivateRoute element={GestionTurnos} allowedRoles={['administrador', 'recepcionista']} />}
          />
          <Route
            path="/pantalla"
            element={<PrivateRoute element={VisualizacionTurnos} allowedRoles={['administrador', 'recepcionista']} />}
          />

          {/* Pagos */}
          <Route
            path="/pago"
            element={<PrivateRoute element={ConfirmarPago} allowedRoles={['administrador', 'recepcionista']} />}
          />

          {/* Terapeutas */}
          <Route
            path="/terapeuta"
            element={<PrivateRoute element={TerapeutaView} allowedRoles={['administrador']} />}
          />
          <Route
            path="/terapeuta/crear"
            element={<PrivateRoute element={TerapeutaCreateView} allowedRoles={['administrador']} />}
          />
          <Route
            path="/terapeuta/editar/:id"
            element={<PrivateRoute element={TerapeutaEditView} allowedRoles={['administrador']} />}
          />

          {/* Reportes */}
          <Route
            path="/reportes"
            element={<PrivateRoute element={ReporteView} allowedRoles={['administrador']} />}
          />

          {/* 404 */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
