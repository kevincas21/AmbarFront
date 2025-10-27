// src/pages/NavPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../Api/AuthApi';

function NavPage() {
  const navigate = useNavigate();
  const role = localStorage.getItem('user_role'); // obtenemos el rol guardado

  const openInNewTab = (path) => {
    const url = window.location.origin + path;
    window.open(url, '_blank');
  };

  const handleLogout = () => {
    console.log (role);
    logoutUser();
    navigate('/login'); // redirige al login

  };

  // Definimos qué botones ve cada rol
  const roleButtons = {
    administrador: [
      { label: 'Pacientes', path: '/paciente' },
      { label: 'Ingresar Turno', path: '/ingreso' },
      { label: 'Gestión', path: '/gestion' },
      { label: 'Pantalla', path: '/pantalla' },
      { label: 'Confirmar Pago', path: '/pago' },
      { label: 'Terapeutas', path: '/terapeuta' },
      { label: 'Reportes', path: '/reportes' },
    ],
    recepcionista: [
      { label: 'Pacientes', path: '/paciente' },
      { label: 'Ingresar Turno', path: '/ingreso' },
      { label: 'Gestión', path: '/gestion' },
      { label: 'Pantalla', path: '/pantalla' },
      { label: 'Confirmar Pago', path: '/pago' },
    ],
    ingresar: [
      { label: 'Ingresar Turno', path: '/ingreso' },
    ]
  };

  // Obtenemos los botones permitidos según el rol
  const buttonsToShow = roleButtons[role] || [];

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 position-relative">
      
      {/* Botón Cerrar Sesión arriba a la derecha */}
      <button 
        className="btn btn-danger position-absolute top-0 end-0 m-3" 
        onClick={handleLogout}
      >
        Cerrar Sesión
      </button>

      <h1 className="mb-4">Ambar</h1>
      <div className="d-grid gap-3">
        {buttonsToShow.map((btn, index) => (
          <button 
            key={index} 
            className="btn btn-primary" 
            onClick={() => openInNewTab(btn.path)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NavPage;
