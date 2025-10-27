import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Form, Row, Col } from "react-bootstrap";
import { PencilSquare, Trash, Plus, Search, ArrowCounterclockwise } from "react-bootstrap-icons";
import { getPatients, deletePatient, searchPatients } from '../../Api/PatientApi';

function PatientView() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleCreatePatient = () => {
    navigate('/paciente/crear');
  };

  const handleEditPatient = (id) => {
    navigate(`/paciente/editar/${id}`);
  };

  const handleDeletePatient = async (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar este paciente?")) {
      try {
        await deletePatient(id);
        setPatients(patients.filter(patient => patient.id !== id));
        alert('Paciente eliminado con éxito');
      } catch (error) {
        console.error("Error deleting patient:", error);
        alert('Error al eliminar paciente');
      }
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      alert("Ingrese un nombre o cédula para buscar");
      return;
    }
    try {
      const result = await searchPatients(searchQuery);
      // si tu backend devuelve un solo cliente, lo envolvemos en array
      setPatients(Array.isArray(result) ? result : [result]);
    } catch (error) {
      alert("Paciente no encontrado");
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    fetchPatients();
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Pacientes</h1>
        <Button variant="primary" onClick={handleCreatePatient}>
          <Plus className="me-2" /> Crear Paciente
        </Button>
      </div>

      {/* Barra de búsqueda */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Ingrese nombre o cédula"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col>
          <Button variant="success" onClick={handleSearch}>
            <Search className="me-2" /> Buscar
          </Button>
          <Button variant="secondary" className="ms-2" onClick={handleReset}>
            <ArrowCounterclockwise className="me-2" /> Resetear
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Teléfono</th>
            <th>Correo Electrónico</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.cedula}</td>
              <td>{patient.phone || 'N/A'}</td>
              <td>{patient.email || 'N/A'}</td>
              <td>
                <Button variant="light" size="sm" onClick={() => handleEditPatient(patient.id)}>
                  <PencilSquare color="blue" />
                </Button>
                <Button variant="light" size="sm" className="ms-2" onClick={() => handleDeletePatient(patient.id)}>
                  <Trash color="red" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default PatientView;
