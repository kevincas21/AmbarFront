import axios from "axios";
import { getAuthHeaders } from "./AuthApi";

const API_BASE_URL = "http://127.0.0.1:8000/ambar";

export const getTurnos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/turnos/`,getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching turnos:", error);
    throw error;
  }
}
export const createTurno = async (cedula) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/turnos/cedula/${cedula}/`,getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error creating turno:", error);
    throw error;
  }
}
export const updateTurno = async (id, turnoData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/turnos/${id}/`, turnoData,getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error updating turno:", error);
    throw error;
  }
}
export const deleteTurno = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/turnos/${id}/`,getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error deleting turno:", error);
    throw error;
  }
}
export const getTurnoById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/turnos/${id}/`,getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching turno by ID:", error);
    throw error;
  }
}
export const updateStateAtendiendo = async (id,terapeutaId) => {
  try {
    const atending = "atendiendo";
    const turnoData = { state: atending,
       terapeuta_id: terapeutaId
     };
    const response = await axios.put(`${API_BASE_URL}/turnos/state/${id}/`, turnoData,getAuthHeaders());
    return response.data;

  } catch (error) {
    console.error("Error updating turno state to atendiendo:", error);
    throw error;
  }
}
export const updateStatePendientePago = async (id) => {
  try {
    const pendientePago = "pendiente_pago";
    const turnoData = { state: pendientePago };
    const response = await axios.put(`${API_BASE_URL}/turnos/state/${id}/`, turnoData,getAuthHeaders());
    return response.data;

  } catch (error) {
    console.error("Error updating turno state to pendiente_pago:", error);
    throw error;
  }
}
export const updateStatePagado = async (id) => {
  try {
    const pagado = "pagado";
    const turnoData = { state: pagado };
    const response = await axios.put(`${API_BASE_URL}/turnos/state/${id}/`, turnoData,getAuthHeaders());
    return response.data;

  } catch (error) {
    console.error("Error updating turno state to pagado:", error);
    throw error;
  }
}

export const getTurnosPendientePago = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/turnos/pendiente_pago_pagado/`,getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching turnos pendiente pago:", error);
    throw error;
  }
}
export const getTurnosAtendiendo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/turnos/atendiendo/`,getAuthHeaders());
    console.log("Turnos atendiendo response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching turnos atendidos:", error);
    throw error;
  }
}

export const updateTurnoPendientePago = async (id, turnoData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/turnos/update_to_pendiente_pago/${id}/`,getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error updating turno pendiente pago:", error);
    throw error;
  }
}
export const getTurnosPendientePagoAndPagadoWithDate = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/turnos/pagado_pendiente_pago/`, {
      params: { start_date: startDate, end_date: endDate }
    },getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching turnos pendiente pago and pagado with date:", error);
    throw error;
  }
}