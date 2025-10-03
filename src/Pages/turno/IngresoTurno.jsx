import React, { useState, useEffect } from 'react';
import { createTurno } from '../../Api/TurnoApi';

function IngresoTurno() {
  const [cedula, setCedula] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!cedula) {
      setErrorMessage("⚠️ Por favor, ingrese su cédula.");
      return;
    }

    try {
      const cedulaNumber = parseInt(cedula, 10);
      if (isNaN(cedulaNumber) || cedulaNumber <= 0) {
        setErrorMessage("⚠️ Por favor, ingrese una cédula válida.");
        return;
      }

      await createTurno(cedula);
      setSuccessMessage(`✅ Turno creado para la cédula: ${cedula}`);
      setCedula('');
    } 
    catch (error) {
  if (error.response && error.response.status === 404) {
    setErrorMessage("❌ No se ha encontrado su cédula. Llame a recepción para su registro.");
  } 
  else if (error.response && error.response.status === 400) {
    setErrorMessage("❌ Ya tiene un turno pendiente. Por favor, espere su turno.");
  }
  else {
    console.error("Error al crear el turno:", error);
    setErrorMessage("❌ Ocurrió un error al crear el turno. Por favor, inténtelo de nuevo.");
  }
}

  };

  // 🔥 Borrar mensajes automáticamente después de 10 segundos
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
        setSuccessMessage(null);
      }, 10000); // 10 segundos

      return () => clearTimeout(timer); // limpiar si el componente se desmonta
    }
  }, [errorMessage, successMessage]);

  return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
      <h2>Ingrese su Cédula para Agendar</h2>

      {/* Alertas */}
      {errorMessage && (
        <div className="alert alert-danger w-50 text-center mt-3">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success w-50 text-center mt-3">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-3 w-50">
        <div className="mb-3">
          <label className="form-label">Cédula</label>
          <input
            className="form-control"
            type='number'
            value={cedula}
            onChange={e => setCedula(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Obtener Turno
        </button>
      </form>
    </div>
  );
}

export default IngresoTurno;
