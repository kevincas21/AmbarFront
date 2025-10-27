import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { refreshToken, logoutUser } from '../Api/AuthApi';

// 🔁 Este componente maneja el refresco de tokens cada 15 min
function TokenRefresher() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await refreshToken();
      } catch (err) {
        console.error('Error refrescando token, cerrando sesión...');
        console.log(err);
        logoutUser();
        navigate('/login'); // redirige si falla
      }
    }, 15 * 60 * 1000); // 15 minutos

    return () => clearInterval(interval); // limpiar cuando el componente se desmonta
  }, [navigate]);

  return null; // no renderiza nada
}

export default TokenRefresher;