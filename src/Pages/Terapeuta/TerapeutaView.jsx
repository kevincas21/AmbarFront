import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button} from "react-bootstrap";
import { PencilSquare, Trash, Plus } from "react-bootstrap-icons";
import { getTerapeutas,deleteTerapeuta } from '../../Api/TerapeutaApi';

function TerapeutaView() {
  const [terapeuta, setTerapeuta] = useState([]);

  const navigate = useNavigate();

  const fetchTerapeuta = async () => {
    try {
      const response = await getTerapeutas();
      setTerapeuta(response);
    } catch (error) {
      console.error("Error fetching terapeuta:", error);
    }
  };

  useEffect(() => {
    fetchTerapeuta();
  }, []);

  const handleCreateTerapeuta = () => {
    navigate('/terapeuta/crear');
  };
  const handleEditTerapeuta = (id) => {
    navigate(`/terapeuta/editar/${id}`);
  };

  const handleDeleteTerapeuta = async (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar este terapeuta?")) {
      try {
        await deleteTerapeuta(id);
        setTerapeuta(terapeuta.filter(terapeuta => terapeuta.id !== id));
        alert('Terapeuta eliminado con éxito');
      } catch (error) {
        console.error("Error deleting terapeuta:", error);
        alert('Error al eliminar terapeuta');
      }
    }
  };



  return (
    <Container className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Terapeuta</h1>
            <Button variant="primary" onClick={handleCreateTerapeuta}>
              <Plus className="me-2" /> Crear Terapeuta
            </Button>
          </div>
    
      
    
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
              {terapeuta.map((terapeuta) => (
                <tr key={terapeuta.id}>
                  <td>{terapeuta.name}</td>
                  <td>{terapeuta.cedula}</td>
                  <td>{terapeuta.phone || 'N/A'}</td>
                  <td>{terapeuta.email || 'N/A'}</td>
                  <td>
                    <Button variant="light" size="sm" onClick={() => handleEditTerapeuta(terapeuta.id)}>
                      <PencilSquare color="blue" />
                    </Button>
                    <Button variant="light" size="sm" className="ms-2" onClick={() => handleDeleteTerapeuta(terapeuta.id)}>
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
export default TerapeutaView;