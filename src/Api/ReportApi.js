import axios from "axios"
import { getAuthHeaders } from "./AuthApi";

const API_BASE_URL = "http://127.0.0.1:8000/ambar";

export const GetReportDateRange = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports/turnos_by_date/?start_date=${startDate}&end_date=${endDate}`,getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
}

export const GetReportByTerapeuta = async (terapeutaId, startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports/turnos_by_terapeuta/${terapeutaId}/?start_date=${startDate}&end_date=${endDate}`,getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching report by terapeuta:", error);
    throw error;
  }
}

export const GetReportByPaciente = async (pacienteId, startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports/turnos_by_cliente/${pacienteId}/${startDate}/${endDate}/`,getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching report by paciente:", error);
    throw error;
  }
}

export const GetMostEncargadoTerapeuta = async (startDate, endDate) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/reports/terapeutas_most_encargado/${startDate}/${endDate}/`
    ,getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching most encargado terapeuta:", error);
    throw error;
  }
}

export const GetMostFrequentPaciente = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports/clients_most_turnos/${startDate}/${endDate}/`,getAuthHeaders());
    
    return response.data;
  } catch (error) {
    console.error("Error fetching most frequent paciente:", error);
    throw error;
  }
}

export const GetTurnosByTerapeuta = async (terapeutaId, startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports/turnos_by_terapeuta/${terapeutaId}/?start_date=${startDate}&end_date=${endDate}`,getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching turnos by terapeuta:", error);
    throw error;
  }
}

export const GetTerapeutaInfo = async (terapeutaId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/terapeutas/${terapeutaId}/`,getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching terapeuta info:", error);
    throw error;
  }
}


