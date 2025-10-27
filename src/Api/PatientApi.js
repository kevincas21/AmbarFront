import axios from "axios";
import { getAuthHeaders } from "./AuthApi";

const API_BASE_URL = "http://127.0.0.1:8000/ambar";
// 📌 Obtener todos los pacientes
export const getPatients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clients/`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
};

// 📌 Crear paciente
export const createPatient = async (patientData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/clients/`, patientData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error;
  }
};

// 📌 Actualizar paciente
export const updatePatient = async (id, patientData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/clients/${id}/`, patientData, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error updating patient:", error);
    throw error;
  }
};

// 📌 Eliminar paciente
export const deletePatient = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/clients/${id}/`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
};

// 📌 Obtener paciente por ID
export const getPatientById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clients/${id}/`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching patient by ID:", error);
    throw error;
  }
};

// 📌 Obtener paciente por cédula
export const getPatientByCedula = async (cedula) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clients/cedula/${cedula}/`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error fetching patient by cedula:", error);
    throw error;
  }
};

// 📌 Buscar pacientes por nombre
export const searchPatients = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clients/name/${query}/`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error searching patients:", error);
    throw error;
  }
};
