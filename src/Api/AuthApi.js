import axios from 'axios';

const API_BASE_URL = "http://127.0.0.1:8000/ambar/";


// 🔐 Función para hacer login y guardar tokens en localStorage
export const loginUser = async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}login/`, credentials);
      const data = response.data;
  
      // Guardar tokens y datos del usuario en localStorage
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user_role', data.role);
      localStorage.setItem('username', data.username);
      localStorage.setItem('user_id', data.user_id);
  
      return true;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return false; // Devuelve false si falla
    }
  };

// 🔁 Función para refrescar el token de acceso
export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh_token');
  if (!refresh) throw new Error('No hay refresh token almacenado.');

  try {
    const response = await axios.post(`${API_BASE_URL}token/refresh/`, { refresh });
    const newAccess = response.data.access;

    // Actualizar el access token en localStorage
    localStorage.setItem('access_token', newAccess);

    return newAccess;
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    throw error;
  }
};

export const logoutUser = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
  };
  
export const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };