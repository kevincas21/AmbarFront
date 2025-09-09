import React, { useEffect, useState, useCallback } from 'react';
import { 
  getTurnosPendientePagoAndPagadoWithDate, 
  updateStatePagado 
} from '../Api/TurnoApi';
import { getPatientById } from '../Api/PatientApi';

function ConfirmarPago() {
  const [turnos, setTurnos] = useState([]);
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]); 
  const [endDate, setEndDate] = useState(() => new Date().toISOString().split("T")[0]); 

  const fetchTurnos = useCallback(async () => {
    try {
      const data = await getTurnosPendientePagoAndPagadoWithDate(startDate, endDate);

      const turnosConPacientes = await Promise.all(
        data.map(async (t) => {
          const paciente = await getPatientById(t.client);
          return {
            ...t,
            name: paciente.name,
            cedula: paciente.cedula,
            pagado: t.state === 'pagado'
          };
        })
      );

      setTurnos(turnosConPacientes);
    } catch (error) {
      console.error("Error cargando turnos:", error);
    }
  }, [startDate, endDate]); // 👈 dependencias seguras

  useEffect(() => {
    fetchTurnos();

    const interval = setInterval(fetchTurnos, 5000);
    return () => clearInterval(interval);
  }, [fetchTurnos]); // 👈 ahora sí lo puedes poner

  const marcarPagado = async (id) => {
    try {
      await updateStatePagado(id);
      setTurnos(turnos.map(t =>
        t.id === id ? { ...t, pagado: true } : t
      ));
    } catch (error) {
      console.error("Error al marcar como pagado:", error);
    }
  };

  return (
    <div>
      <h2>Confirmar Pago</h2>
      <div className="d-flex gap-2 align-items-center mt-3">
        <label>Fecha inicio:</label>
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
        />
        <label>Fecha fin:</label>
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
        />
        <button className="btn btn-primary btn-sm" onClick={fetchTurnos}>
          Buscar
        </button>
      </div>
      <ul className="list-group mt-3">
        {turnos.map(t => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={t.id}
          >
            {t.name} ({t.cedula}) - {t.pagado ? '✅ Pagado' : '❌ No pagado'}
            {!t.pagado && (
              <button className="btn btn-sm btn-success" onClick={() => marcarPagado(t.id)}>
                Marcar como Pagado
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConfirmarPago;
