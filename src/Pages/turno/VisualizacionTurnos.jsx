import React, { useEffect, useState, useRef } from 'react';
import { getTurnos, getTurnosAtendiendo } from '../../Api/TurnoApi';
import { getPatientById } from '../../Api/PatientApi';
import { Person } from 'react-bootstrap-icons';
import { Card, Row, Col } from 'react-bootstrap';

function VisualizacionTurnos() {
  const [pacienteActual, setPacienteActual] = useState(null);
  const [pacientesSiguientes, setPacientesSiguientes] = useState([]);
  const turnoAnteriorRef = useRef(null);

  // 🔊 Inicializar sonido
  const sonidoTurno = useRef(null);

  // 🎥 Lista de videos en /public/videos
  const videos = [
    "/videos/5-sentidos.mp4",
    "/videos/CONOCE-23.mp4",
    "/videos/desagolpiador.mp4"
  ];

  const [videoIndex, setVideoIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchTurnosConPacientes = async () => {
      try {
        sonidoTurno.current = new Audio('/sounds/turno.mp3');
        sonidoTurno.current.volume = 1; // 🔊 máximo volumen del pitido
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

          if (turnoAnteriorRef.current && turnoAnteriorRef.current.numero_turno !== nuevoPaciente.numero_turno) {
            sonidoTurno.current.play().catch(err => console.warn("No se pudo reproducir el sonido:", err));
          }

          turnoAnteriorRef.current = nuevoPaciente;
          setPacienteActual(nuevoPaciente);
        } else {
          setPacienteActual(null);
        }

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

  const handleVideoEnded = () => {
    setVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => { });
    }
  }, [videoIndex]);
// 💻 Controlar volumen del video
useEffect(() => {
  if (videoRef.current) {
    videoRef.current.volume = 0.02; // 🔈 volumen más bajo para los videos
    videoRef.current.load();
    videoRef.current.play().catch(() => { });
  }
}, [videoIndex]);
  return (
    <div style={{
      position: "relative", height: "100vh", 
      overflow: "hidden", 
      background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)" // 👈 fondo completo
    }}>
      <Row className="h-100" style={{ margin: 0 }}>
        {/* Columna de Videos */}
        <Col md={6} className="ps-0 d-flex" style={{ padding: 0 }}>
          <video
            key={videoIndex}
            ref={videoRef}
            src={videos[videoIndex]}
            autoPlay
            controls={false}
            onEnded={handleVideoEnded}
            style={{
              width: '100%',
              height: '100vh',
              objectFit: 'cover',
              borderRadius: '0',
              display: 'block'
            }}
          />
        </Col>

        {/* Columna de Turnos */}
        <Col
          md={6}
          className="d-flex flex-column pe-3"
          style={{ overflowY: "auto", padding: "20px" }}
        >
          <h2 className="mb-4 fw-bold text-center">Turno Actual</h2>
          <Card
            className="mb-5 shadow-lg w-100"
            style={{
              background: "linear-gradient(135deg, #28a745 0%, #218838 100%)",
              color: "white",
              borderRadius: "20px"
            }}
          >
            <Card.Body
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ height: '30vh' }}
            >
              <Person size={120} className="mb-4" />
              {pacienteActual ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '4rem', fontWeight: 'bold' }}>
                    {pacienteActual.name}
                  </div>
                  <div style={{ fontSize: '3rem', marginTop: "15px" }}>
                    Posición #{pacienteActual.numero_turno}
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                  No hay nadie asignado
                </div>
              )}
            </Card.Body>
          </Card>

          <h2 className="mb-4 fw-bold text-center">Próximos Turnos</h2>
          {pacientesSiguientes.length === 0 && <p className="text-center">No hay próximos turnos</p>}
          {pacientesSiguientes.map((paciente, idx) => (
            <Card
              key={idx}
              className="mb-4 shadow-sm w-100"
              style={{
                background: " #1039f2ff 100%",
                color: "white",
                borderRadius: "15px"
              }}
            >
              <Card.Body
                className="d-flex align-items-center justify-content-between px-4"
                style={{ height: '18vh' }}
              >
                <div className="d-flex align-items-center">
                  <Person size={80} className="me-4" />
                  <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>{paciente.name}</div>
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                  #{paciente.numero_turno}
                </div>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>


      {/* Texto en movimiento abajo */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "rgba(0,0,0,0.7)",
          color: "white",
          fontSize: "2rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          zIndex: 10,
          padding: "5px 0"
        }}
      >
        <div
          style={{
            display: "inline-block",
            paddingLeft: "100%",
            animation: "marquee 15s linear infinite"
          }}
        >
          Bienvenido Al Centro De Rehabilitación Doctora Vilma Arias
        </div>
      </div>

      {/* Animación CSS */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
}

export default VisualizacionTurnos;
