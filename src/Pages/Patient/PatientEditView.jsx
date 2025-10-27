import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { getPatientById, updatePatient } from '../../Api/PatientApi';
import Patient from '../../Models/Patient';



function PatientEditView() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [errors, setErrors] = useState({});

  const fetchPatient = async (id) => {
    try {
      const response = await getPatientById(id);
      setPatient(new Patient(response));
    } catch (error) {
      console.error("Error fetching patient:", error);
      setErrors({ fetch: "Error fetching patient data" });
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updatePatient(patient.id, patient);
      alert('Patient updated successfully');
      navigate('/paciente');
    } catch (error) {
      console.error('Error updating patient:', error);
      setErrors(error.response.data);
    }
  };
  const handleCancel = () => {
    navigate('/paciente');
  };
  // Assuming the ID is passed in the URL, you can use useParams to get it
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      fetchPatient(id);
    }
  }, [id]);

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">
        <Col><h1>Editar Paciente</h1></Col>
      </Row>
      {patient && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={patient.name || ''}
              onChange={handleChange}
              isInvalid={!!errors.name}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formCedula">
            <Form.Label>Cedula</Form.Label>
            <Form.Control
              type="text"
              name="cedula"
              value={patient.cedula || ''}
              onChange={handleChange}
              isInvalid={!!errors.cedula}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.cedula}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formTelefono">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="phonenumber"
              name="phone"
              value={patient.phone || ''}
              onChange={handleChange}
              isInvalid={!!errors.telefono}
            />
            </Form.Group>


           
                <Form.Group controlId="formEmail">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={patient.email || ''}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
             <Form.Group controlId="terapias_faltantes">
              <Form.Label>Terapias Faltantes</Form.Label>
              <Form.Control
                type="number"
                name="terapias_faltantes"
                value={patient.terapias_faltantes ?? ''}
                onChange={handleChange}
                isInvalid={!!errors.terapias_faltantes}
              />
              <Form.Control.Feedback type="invalid">
                {errors.terapias_faltantes}
              </Form.Control.Feedback>
          
            </Form.Group>
          

          <div className='mt-3'>
            <Button variant="primary" type="submit" className="me-2 ">
              Guardar Cambios
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
          </div>

        </Form>
      )}
    </Container>
  );
}
export default PatientEditView;