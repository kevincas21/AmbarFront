// src/pages/ReporteView.jsx
import React, { useEffect, useState } from "react";
import {
  GetReportDateRange,
  GetReportByTerapeuta,
  GetReportByPaciente,
  GetMostEncargadoTerapeuta,
  GetMostFrequentPaciente,
} from "../../Api/ReportApi";
import { getTerapeutas } from "../../Api/TerapeutaApi";
import { getPatientById, getPatients } from "../../Api/PatientApi";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";



function ReporteView() {
  // 📌 Estados generales
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState(null);

  // 📌 Terapeutas
  const [terapeutas, setTerapeutas] = useState([]);
  const [terapeutaSeleccionado, setTerapeutaSeleccionado] = useState("");

  // Clientes
  const [clientNames, setClientNames] = useState({});

  // 📌 Pacientes
  const [pacientes, setPacientes] = useState([]);
  const [pacienteFiltro, setPacienteFiltro] = useState("");
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState("");

  // report Type
  const [reportType, setReportType] = useState(""); // <-- nuevo estado

  // 🚨 Cargar terapeutas y pacientes al inicio
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [terapeutasData, pacientesData] = await Promise.all([
          getTerapeutas(),
          getPatients(),
        ]);
        setTerapeutas(terapeutasData);
        setPacientes(pacientesData);
      } catch (error) {
        console.error("Error cargando terapeutas o pacientes:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
  const fetchClientNames = async () => {
    if (!reportData) return;
    
    const ids = [...new Set(reportData.map(item => item.client))]; // obtener IDs únicos
    const names = {};

    await Promise.all(ids.map(async (id) => {
      try {
        
        const data = await getPatientById(id);
        names[id] = data.name;
      } catch (error) {
        names[id] = "Desconocido";
      }
    }));

    setClientNames(names);
  };

  fetchClientNames();
}, [reportData]);


const generarPDF = () => {
  if (!reportData || reportData.length === 0) return;

  const doc = new jsPDF();
  let title = "";
  let head = [];
  let body = [];

  // Rango de fechas
  const fechaRango = `Desde: ${startDate || "N/A"} - Hasta: ${endDate || "N/A"}`;

  // 🎯 Usamos los títulos tal como aparecen en la UI
  switch (reportType) {
    case "turnos":
      if (terapeutaSeleccionado) title = "Turnos Hechos por Terapeuta";
      else if (pacienteSeleccionado) title = "Turnos por Paciente";
      else title = "Reporte General";
      
      head = ["Cliente", "Fecha", "Hora", "Estado", "Número de Turno", "Terapeuta Encargado"];
      body = reportData.map((item) => {
        const fecha = new Date(item.created_at);
        return [
          clientNames[item.client] || item.client,
          fecha.toLocaleDateString(),
          fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          item.state,
          item.numero_turno,
          item.terapeutaName || "Sin asignar"
        ];
      });
      break;

    case "masTrabajan":
      title = "Terapeutas que Más Trabajan";
      head = ["Nombre", "Identificación", "Número de turnos atendidos"];
      body = reportData.map((item) => [
        item.terapeuta.name,
        item.terapeuta.cedula,
        item.turno_count
      ]);
      break;

    case "masFrecuentes":
      title = "Pacientes Más Frecuentes";
      head = ["Nombre", "Identificación", "Frecuencia"];
      body = reportData.map((item) => [
        item.client.name,
        item.client.cedula,
        item.turno_count
      ]);
      break;

    default:
      title = "Reporte";
      head = [];
      body = [];
  }

  // Encabezado del PDF
  doc.setFontSize(18);
  doc.text(title, 14, 20);
  doc.setFontSize(11);
  doc.text(fechaRango, 14, 28);

  autoTable(doc, {
    startY: 35,
    head: [head],
    body: body,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [52, 58, 64] }
  });

  doc.save(`${title}.pdf`);

    // 🔄 Recargar página después de descargar
  window.location.reload();
};



 // 🚨 funciones de reportes actualizadas para setear el tipo
const generarReporteGeneral = async () => {
  try {
    const data = await GetReportDateRange(startDate, endDate);
    setReportData(data);
    setReportType("turnos"); // tipo: turnos
  } catch (error) { console.error(error); }
};
const generarReportePorTerapeuta = async () => {
  if (!terapeutaSeleccionado) return;
  try {
    const data = await GetReportByTerapeuta(terapeutaSeleccionado, startDate, endDate);
    setReportData(data);
    setReportType("turnos");
  } catch (error) { console.error(error); }
};

const generarReportePorPaciente = async () => {
  if (!pacienteSeleccionado) return;
  try {
    const data = await GetReportByPaciente(pacienteSeleccionado, startDate, endDate);
    setReportData(data);
    setReportType("turnos");
  } catch (error) { console.error(error); }
};

const generarMasTrabajan = async () => {
  try {
    const data = await GetMostEncargadoTerapeuta(startDate, endDate);
    setReportData(data);
    setReportType("masTrabajan"); // tipo: terapeutas
  } catch (error) { console.error(error); }
};

const generarMasFrecuentes = async () => {
  try {
    const data = await GetMostFrequentPaciente(startDate, endDate);
    setReportData(data);
    setReportType("masFrecuentes"); // tipo: pacientes
  } catch (error) { console.error(error); }
};
  // 📌 Filtro de pacientes
  const pacientesFiltrados = pacientes.filter((p) =>
    p.name.toLowerCase().includes(pacienteFiltro.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">📊 Reporte de Turnos</h1>

      {/* Reporte General */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Reporte General</Card.Title>
          <Row className="align-items-center">
            <Col md={4}>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Button onClick={generarReporteGeneral} variant="primary" block>
                Generar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Reporte por Terapeuta */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Turnos Hechos por Terapeuta</Card.Title>
          <Row className="align-items-center mb-2">
            <Col md={4}>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Select
                value={terapeutaSeleccionado}
                onChange={(e) => setTerapeutaSeleccionado(e.target.value)}
              >
                <option value="">Seleccione un terapeuta</option>
                {terapeutas.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col className="text-end">
              <Button onClick={generarReportePorTerapeuta} variant="primary">
                Generar
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Reporte por Paciente */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Turnos por Paciente</Card.Title>
          <Row className="align-items-center mb-2">
            <Col md={4}>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Buscar paciente..."
                value={pacienteFiltro}
                onChange={(e) => setPacienteFiltro(e.target.value)}
              />
            </Col>
          </Row>

          <ul className="list-group mt-2">
            {pacientesFiltrados.map((p) => (
              <li
                key={p.id}
                className={`list-group-item ${
                  pacienteSeleccionado === p.id ? "active" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setPacienteSeleccionado(p.id)}
              >
                {p.name} ({p.cedula})
              </li>
            ))}
          </ul>
          <Button
            onClick={generarReportePorPaciente}
            variant="primary"
            className="mt-3"
          >
            Generar
          </Button>
        </Card.Body>
      </Card>

      {/* Otros reportes */}
      <Row>
        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Terapeutas que Más Trabajan</Card.Title>
              <Row className="align-items-center mb-2">
                <Col md={6}>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Col>
              </Row>
              <div className="text-center">
                <Button onClick={generarMasTrabajan} variant="primary">
                  Generar
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Pacientes Más Frecuentes</Card.Title>
              <Row className="align-items-center mb-2">
                <Col md={6}>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Col>
              </Row>
              <div className="text-center">
                <Button onClick={generarMasFrecuentes} variant="primary">
                  Generar
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Resultados */}
   <Card className="mb-4 shadow-sm">
  <Card.Body>
    <Card.Title>Resultados</Card.Title>

    {reportData && reportData.length > 0 ? (
      <>
        {reportType === "turnos" && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Número de Turno</th>
                <th>Terapeuta Encargado</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item) => {
                const fecha = new Date(item.created_at);
                return (
                  <tr key={item.id}>
                    <td>{clientNames[item.client] || item.client}</td>
                    <td>{fecha.toLocaleDateString()}</td>
                    <td>{fecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td>{item.state}</td>
                    <td>{item.numero_turno}</td>
                    <td>{item.terapeutaName || "Sin asignar"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {reportType === "masTrabajan" && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Identificación</th>
                <th>Número de turnos atendidos</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item) => (
                <tr key={item.terapeuta.id}>
                  <td>{item.terapeuta.name}</td>
                  <td>{item.terapeuta.cedula}</td>
                  <td>{item.turno_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

{reportType === "masFrecuentes" && (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Identificación</th>
        <th>Frecuencia</th>
      </tr>
    </thead>
    <tbody>
      {reportData.map((item) => (
        <tr key={item.client.id}>
          <td>{item.client.name}</td>
          <td>{item.client.cedula}</td>
          <td>{item.turno_count}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

      </>
    ) : (
      <p>Sin datos</p>
    )}
  </Card.Body>
</Card>
{reportData && reportData.length > 0 && (
  <div className="text-end mb-3">
    <Button onClick={generarPDF} variant="success">
      Descargar PDF
    </Button>
  </div>
)}


    </Container>
  );
}

export default ReporteView;
