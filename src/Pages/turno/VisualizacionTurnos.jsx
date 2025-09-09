import React, { useEffect, useState, useRef } from 'react';
import { getTurnos, getTurnosAtendiendo } from '../../Api/TurnoApi';
import { getPatientById } from '../../Api/PatientApi';
import { Person } from 'react-bootstrap-icons';
import { Card, Container } from 'react-bootstrap';

function VisualizacionTurnos() {
  const [pacienteActual, setPacienteActual] = useState(null);
  const [pacientesSiguientes, setPacientesSiguientes] = useState([]);
  const turnoAnteriorRef = useRef(null);

  // 🔊 Inicializar sonido (coloca un archivo en /public/sound.mp3 por ejemplo)
const sonidoTurno = useRef(null);

  useEffect(() => {
    const fetchTurnosConPacientes = async () => {
      try {
        // 🚨 Turno actual
        sonidoTurno.current = new Audio('/sounds/turno.mp3');
        const turnosActuales = await getTurnosAtendiendo();
        const turno = Array.isArray(turnosActuales) ? turnosActuales[0] : turnosActuales;

        if (turno?.client) {
          const paciente = await getPatientById(turno.client);
          const nuevoPaciente = {
            ...paciente,
            numero_turno: turno.numero_turno,
            state: turno.state,
            created_at: turno.created_at
          };

          // 🔊 Comparar si cambió el turno
          if (turnoAnteriorRef.current && turnoAnteriorRef.current.numero_turno !== nuevoPaciente.numero_turno) {
            sonidoTurno.current.play().catch(err => console.warn("No se pudo reproducir el sonido:", err));
          }

          turnoAnteriorRef.current = nuevoPaciente; // actualizar referencia
          setPacienteActual(nuevoPaciente);
        } else {
          setPacienteActual(null);
        }

        // 🚨 Próximos turnos
        const siguientes = await getTurnos();
        if (siguientes.length > 0) {
          const pacientes = await Promise.all(
            siguientes.map(async (turno) => {
              const paciente = await getPatientById(turno.client);
              return {
                ...paciente,
                numero_turno: turno.numero_turno,
                state: turno.state,
                created_at: turno.created_at
              };
            })
          );
          setPacientesSiguientes(pacientes);
        } else {
          setPacientesSiguientes([]);
        }
      } catch (error) {
        console.error("Error obteniendo turnos o pacientes:", error);
      }
    };

    fetchTurnosConPacientes();
    const interval = setInterval(fetchTurnosConPacientes, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="mt-4">
      {/* Turno Actual */}
      <h2 className="mb-4 fw-bold text-center">Turno Actual</h2>
      <Card bg="primary" text="white" className="mb-5 shadow-lg mx-auto" style={{ maxWidth: '900px' }}>
        <Card.Body className="d-flex flex-column align-items-center justify-content-center" style={{ height: '25vh' }}>
          <Person size={70} className="mb-3" />
          <div style={{ fontSize: '1.8rem', textAlign: 'center' }}>
            {pacienteActual
              ? <div>{pacienteActual.name} <br /> <strong>Posición #{pacienteActual.numero_turno}</strong></div>
              : 'No hay nadie asignado'}
          </div>
        </Card.Body>
      </Card>

      {/* Próximos Turnos */}
      <h2 className="mb-4 fw-bold text-center">Próximos Turnos</h2>
      {pacientesSiguientes.length === 0 && <p className="text-center">No hay próximos turnos</p>}
      {pacientesSiguientes.map((paciente, idx) => (
        <Card 
          key={idx} 
          bg="success" 
          text="white" 
          className="mb-3 shadow-sm mx-auto" 
          style={{ maxWidth: '850px' }}
        >
          <Card.Body className="d-flex align-items-center justify-content-between px-4" style={{ height: '10vh' }}>
            <div className="d-flex align-items-center">
              <Person size={40} className="me-3" />
              <div style={{ fontSize: '1.4rem' }}>{paciente.name}</div>
            </div>
            <div style={{ fontSize: '1.3rem' }}>
              Posición #{paciente.numero_turno}
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default VisualizacionTurnos;
