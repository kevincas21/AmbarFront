import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { getTerapeutaById, updateTerapeuta } from "../../Api/TerapeutaApi";
import Terapeuta from "../../Models/Terapeuta";

function TerapeutaEditView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [terapeuta, setTerapeuta] = useState(null);
  const [errors, setErrors] = useState({});

  // 🔹 Cargar terapeuta por ID
  const fetchTerapeuta = async (id) => {
    try {
      const response = await getTerapeutaById(id);
      setTerapeuta(new Terapeuta(response));
    } catch (error) {
      console.error("Error fetching terapeuta:", error);
      setErrors({ fetch: "Error obteniendo datos del terapeuta" });
    }
  };

  // 🔹 Manejar cambios en los inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setTerapeuta((prevTerapeuta) => ({
      ...prevTerapeuta,
      [name]: value,
    }));
  };

  // 🔹 Guardar cambios
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateTerapeuta(terapeuta.id, terapeuta);
      alert("Terapeuta actualizado exitosamente");
      navigate("/terapeuta"); // 👈 ajusta la ruta según tu app
    } catch (error) {
      console.error("Error actualizando terapeuta:", error);
      if (error.response?.data) {
        setErrors(error.response.data);
      }
    }
  };

  const handleCancel = () => {
    navigate("/terapeuta");
  };

  // 🔹 Ejecutar carga inicial
  useEffect(() => {
    if (id) {
      fetchTerapeuta(id);
    }
  }, [id]);

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Editar Terapeuta</h1>
        </Col>
      </Row>

      {terapeuta && (
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

          <div className="mt-3">
            <Button variant="primary" type="submit" className="me-2">
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

export default TerapeutaEditView;
