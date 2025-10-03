import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Patient from '../../Models/Patient';
import { createPatient } from '../../Api/PatientApi';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
function PatientCreateView() {
  const navigate = useNavigate();

  const [patient, setPatient] = useState(new Patient({}));
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      await createPatient(patient)
      .then(() => {
        alert('Patient created successfully');
      })
      navigate('/paciente');
    }
  
    catch(error) {
        console.error('Error creating patient:', error);
        setErrors(error.response.data);
      };
    // Redirect to the patient view after creation  
    
  };

  return (
      <Container className="mt-4">
      <Row className="align-items-center mb-4">
        <Col><h1>Crear Paciente</h1></Col>
      </Row>
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

        <Form.Group controlId="formPhone">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            type="phonenumber"
            name="phone"
            value={patient.phone || ''}
            onChange={handleChange}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
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
        
          <Form.Group controlId="formTherapiesMissing">
          <Form.Label>Terapias Faltantes</Form.Label>
          <Form.Control
            type="number"
            name="terapias_faltantes"
            value={patient.terapias_faltantes || 0}
            onChange={handleChange}
            isInvalid={!!errors.terapias_faltantes}
          />
          <Form.Control.Feedback type="invalid">
            {errors.terapias_faltantes}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Crear Paciente
        </Button>
        <Button variant="secondary" className="mt-3 ms-2" onClick={() => navigate('/paciente')}>
          Cancelar
        </Button>
      </Form>
    </Container>
  );
}
export default PatientCreateView;