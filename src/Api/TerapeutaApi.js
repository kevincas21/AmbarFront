import axios from "axios";
import { getAuthHeaders } from "./AuthApi";

const API_BASE_URL = "http://127.0.0.1:8000/ambar";

export const getTerapeutas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/terapeutas/`, {
      ...getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching terapeutas:", error);
    throw error;
  }
};

export const createTerapeuta = async (terapeutaData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/terapeutas/`,
      terapeutaData,
      {
        ...getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating terapeuta:", error);
    throw error;
  }
};

export const updateTerapeuta = async (id, terapeutaData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/terapeutas/${id}/`,
      terapeutaData,
      {
        ...getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating terapeuta:", error);
    throw error;
  }
};

export const deleteTerapeuta = async (id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/terapeutas/${id}/`,
      {
        ...getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting terapeuta:", error);
    throw error;
  }
};

export const getTerapeutaById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/terapeutas/${id}/`, {
      ...getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching terapeuta by ID:", error);
    throw error;
  }
};
