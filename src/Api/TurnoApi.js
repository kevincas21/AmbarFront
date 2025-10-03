import axios from "axios";
import { getAuthHeaders } from "./AuthApi";

const API_BASE_URL = "http://127.0.0.1:8000/ambar";

// 📌 Obtener todos los turnos
export const getTurnos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/turnos/`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching turnos:", error);
    throw error;
  }
};

// 📌 Crear turno por cédula
export const createTurno = async (cedula) => {
  try {
    console.log(getAuthHeaders());
    const response = await axios.post(
      `${API_BASE_URL}/turnos/cedula/${cedula}/`,
      {}, // body vacío
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error creating turno:", error);
    throw error;
  }
};

// 📌 Actualizar turno
export const updateTurno = async (id, turnoData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/turnos/${id}/`,
      turnoData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error updating turno:", error);
    throw error;
  }
};

// 📌 Eliminar turno
export const deleteTurno = async (id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/turnos/${id}/`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting turno:", error);
    throw error;
  }
};

// 📌 Obtener turno por ID
export const getTurnoById = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/turnos/${id}/`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching turno by ID:", error);
    throw error;
  }
};

// 📌 Cambiar estado a "atendiendo"
export const updateStateAtendiendo = async (id, terapeutaId) => {
  try {
    const turnoData = { state: "atendiendo", terapeuta_id: terapeutaId };
    const response = await axios.put(
      `${API_BASE_URL}/turnos/state/${id}/`,
      turnoData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error updating turno state to atendiendo:", error);
    throw error;
  }
};

// 📌 Cambiar estado a "pendiente_pago"
export const updateStatePendientePago = async (id) => {
  try {
    const turnoData = { state: "pendiente_pago" };
    const response = await axios.put(
      `${API_BASE_URL}/turnos/state/${id}/`,
      turnoData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error updating turno state to pendiente_pago:", error);
    throw error;
  }
};

// 📌 Cambiar estado a "pagado"
export const updateStatePagado = async (id) => {
  try {
    const turnoData = { state: "pagado" };
    const response = await axios.put(
      `${API_BASE_URL}/turnos/state/${id}/`,
      turnoData,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error updating turno state to pagado:", error);
    throw error;
  }
};

// 📌 Obtener turnos pendiente_pago y pagado
export const getTurnosPendientePago = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/turnos/pendiente_pago_pagado/`,
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching turnos pendiente pago:", error);
    throw error;
  }
};

// 📌 Obtener turnos en estado "atendiendo"
export const getTurnosAtendiendo = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/turnos/atendiendo/`,
      getAuthHeaders()
    );
    console.log("Turnos atendiendo response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching turnos atendidos:", error);
    throw error;
  }
};

// 📌 Cambiar estado a pendiente_pago (ruta especial)
export const updateTurnoPendientePago = async (id) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/turnos/update_to_pendiente_pago/${id}/`,
      {}, // body vacío
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error updating turno pendiente pago:", error);
    throw error;
  }
};

// 📌 Obtener turnos pagado/pendiente_pago por fecha
export const getTurnosPendientePagoAndPagadoWithDate = async (startDate, endDate) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/turnos/pagado_pendiente_pago/`,
      {
        params: { start_date: startDate, end_date: endDate },
        ...getAuthHeaders()
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching turnos pendiente pago and pagado with date:", error);
    throw error;
  }
};
