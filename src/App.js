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
      <TokenRefresher />
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/menu" element={<NavPage />} />

        {/* Pacientes */}
        <Route
          path="/paciente"
          element={<Wrapper><PrivateRoute element={PatientView} allowedRoles={['administrador', 'recepcionista']} /></Wrapper>}
        />
        <Route
          path="/paciente/crear"
          element={<Wrapper><PrivateRoute element={PatientCreateView} allowedRoles={['administrador','recepcionista']} /></Wrapper>}
        />
        <Route
          path="/paciente/editar/:id"
          element={<Wrapper><PrivateRoute element={PatientEditView} allowedRoles={['administrador','recepcionista']} /></Wrapper>}
        />

        {/* Turnos */}
        <Route
          path="/ingreso"
          element={<Wrapper><PrivateRoute element={IngresoTurno} allowedRoles={['administrador', 'recepcionista', 'ingresar']} /></Wrapper>}
        />
        <Route
          path="/gestion"
          element={<Wrapper><PrivateRoute element={GestionTurnos} allowedRoles={['administrador', 'recepcionista']} /></Wrapper>}
        />

        {/* 👇 Pantalla SIN márgenes */}
        <Route
          path="/pantalla"
          element={<PrivateRoute element={VisualizacionTurnos} allowedRoles={['administrador', 'recepcionista']} />}
        />

        {/* Pagos */}
        <Route
          path="/pago"
          element={<Wrapper><PrivateRoute element={ConfirmarPago} allowedRoles={['administrador', 'recepcionista']} /></Wrapper>}
        />

        {/* Terapeutas */}
        <Route
          path="/terapeuta"
          element={<Wrapper><PrivateRoute element={TerapeutaView} allowedRoles={['administrador']} /></Wrapper>}
        />
        <Route
          path="/terapeuta/crear"
          element={<Wrapper><PrivateRoute element={TerapeutaCreateView} allowedRoles={['administrador']} /></Wrapper>}
        />
        <Route
          path="/terapeuta/editar/:id"
          element={<Wrapper><PrivateRoute element={TerapeutaEditView} allowedRoles={['administrador']} /></Wrapper>}
        />

        {/* Reportes */}
        <Route
          path="/reportes"
          element={<Wrapper><PrivateRoute element={ReporteView} allowedRoles={['administrador']} /></Wrapper>}
        />

        {/* 404 */}
        <Route path="*" element={<Wrapper><h1>404 Not Found</h1></Wrapper>} />
      </Routes>
    </Router>
  );
}

// Componente que agrega container solo a las vistas normales
function Wrapper({ children }) {
  return <div className="container mt-3">{children}</div>;
}


export default App;
