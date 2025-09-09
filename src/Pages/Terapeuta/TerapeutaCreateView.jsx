import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Terapeuta from "../../Models/Terapeuta";
import { createTerapeuta } from "../../Api/TerapeutaApi";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function TerapeutaCreateView() {
  const navigate = useNavigate();

  const [terapeuta, setTerapeuta] = useState(new Terapeuta({}));
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTerapeuta((prevTerapeuta) => ({
      ...prevTerapeuta,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createTerapeuta(terapeuta);
      alert("Terapeuta creado exitosamente");
      navigate("/terapeuta"); // 👈 Ajusta la ruta según tu app
    } catch (error) {
      console.error("Error creando terapeuta:", error);
      if (error.response?.data) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Crear Terapeuta</h1>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={terapeuta.name || ""}
            onChange={handleChange}
            isInvalid={!!errors.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCedula">
          <Form.Label>Cédula</Form.Label>
          <Form.Control
            type="text"
            name="cedula"
            value={terapeuta.cedula || ""}
            onChange={handleChange}
            isInvalid={!!errors.cedula}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.cedula}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={terapeuta.phone || ""}
            onChange={handleChange}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={terapeuta.email || ""}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={terapeuta.address || ""}
            onChange={handleChange}
            isInvalid={!!errors.address}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Crear Terapeuta
        </Button>
        <Button
          variant="secondary"
          className="mt-3 ms-2"
          onClick={() => navigate("/terapeuta")}
        >
          Cancelar
        </Button>
      </Form>
    </Container>
  );
}

export default TerapeutaCreateView;
