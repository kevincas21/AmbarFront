// src/pages/GestionTurnos.jsx
import React, { useEffect, useState } from 'react';
import {
  getTurnos,
  updateStateAtendiendo,
  updateStatePendientePago,
  getTurnosAtendiendo
} from '../../Api/TurnoApi';
import { getPatientById } from '../../Api/PatientApi';
import { getTerapeutas } from '../../Api/TerapeutaApi'; // 👈 importar función

function GestionTurnos() {
  const [turnos, setTurnos] = useState([]);
  const [actual, setActual] = useState(null);
  const [pacienteActual, setPacienteActual] = useState(null);
  const [pacientesEnEspera, setPacientesEnEspera] = useState([]);
  const [terapeutas, setTerapeutas] = useState([]);
  const [terapeutaSeleccionado, setTerapeutaSeleccionado] = useState("");

  // 🚨 Obtener turno actual
  useEffect(() => {
    const fetchTurnoActual = async () => {
      try {
        const turnoAtendiendo = await getTurnosAtendiendo();
        const turno = Array.isArray(turnoAtendiendo) ? turnoAtendiendo[0] : turnoAtendiendo;
        setActual(turno);

        if (turno?.client) {
          const paciente = await getPatientById(turno.client);
          setPacienteActual({
            ...paciente,
            numero_turno: turno.numero_turno,
            state: turno.state,
            created_at: turno.created_at
          });
        } else {
          setPacienteActual(null);
        }
      } catch (error) {
        console.error("Error obteniendo turno actual:", error);
      }
    };

    fetchTurnoActual();
    const interval = setInterval(fetchTurnoActual, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🚨 Obtener lista completa de turnos en espera
  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const fetchedTurnos = await getTurnos();
        setTurnos(fetchedTurnos);

        const pacientes = await Promise.all(
          fetchedTurnos.map(async (turno) => {
            const paciente = await getPatientById(turno.client);
            return {
              ...paciente,
              numero_turno: turno.numero_turno,
              state: turno.state,
              created_at: turno.created_at
            };
          })
        );

        setPacientesEnEspera(pacientes);
      } catch (error) {
        console.error("Error al obtener turnos o pacientes:", error);
      }
    };

    fetchTurnos();
    const interval = setInterval(fetchTurnos, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🚨 Obtener terapeutas
  useEffect(() => {
    const fetchTerapeutas = async () => {
      try {
        const data = await getTerapeutas();
        setTerapeutas(data);
      } catch (error) {
        console.error("Error obteniendo terapeutas:", error);
      }
    };
    fetchTerapeutas();
  }, []);

  // 🚨 Llamar siguiente turno
  const siguiente = async () => {
    try {
      if (!terapeutaSeleccionado) return; // seguridad

      if (turnos.length > 0) {
        if (actual && actual.id) {
          await updateStatePendientePago(actual.id);
        }

        const siguienteTurno = turnos[0];
        if (!siguienteTurno) return;

        // ✅ pasamos terapeuta_id al update
        await updateStateAtendiendo(siguienteTurno.id, terapeutaSeleccionado);

        setActual(siguienteTurno);

        localStorage.setItem('turnos', JSON.stringify(turnos));
        localStorage.setItem('turnoActual', JSON.stringify(siguienteTurno));
      } else if (actual && actual.id) {
        await updateStatePendientePago(actual.id);
        setActual(null);
        setPacienteActual(null);

        localStorage.removeItem('turnoActual');
      } else {
        console.log("No hay turno actual ni pacientes en espera.");
      }

      // ✅ resetear selección después de llamar
      setTerapeutaSeleccionado("");
    } catch (error) {
      console.error("Error actualizando estados:", error);
    }
  };

  return (
    <div>
      <h2>Gestión de Turnos</h2>

      <div className="mt-3 flex gap-2 items-center">
        {/* Select de terapeutas */}
        <select
          className="form-select"
          value={terapeutaSeleccionado}
          onChange={(e) => setTerapeutaSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un terapeuta</option>
          {terapeutas.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name} 
            </option>
          ))}
        </select>

        <button
          className="btn btn-primary"
          onClick={siguiente}
          disabled={!terapeutaSeleccionado}
        >
          Llamar Siguiente
        </button>
      </div>

      <div className="mt-4">
        <strong>Turno Actual:</strong>{' '}
        {pacienteActual
          ? `${pacienteActual.name} (${pacienteActual.cedula}) - Turno: ${pacienteActual.numero_turno}`
          : 'Ninguno'}
      </div>

      <div className="mt-4">
        <strong>En Espera:</strong>
        <ul>
          {pacientesEnEspera.length > 0 ? (
            pacientesEnEspera.map((p, index) => (
              <li key={index}>
                {p.name} ({p.cedula}) - Turno: {p.numero_turno}
              </li>
            ))
          ) : (
            <li>No hay pacientes en espera</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default GestionTurnos;
