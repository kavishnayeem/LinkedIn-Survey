import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verifyAuth = () => {
      const storedValid = localStorage.getItem('valid');
      const storedUser = localStorage.getItem('userData');
      
      if (storedValid === 'true' && storedUser) {
        setIsValid(true);
      } else {
        localStorage.removeItem('valid');
        localStorage.removeItem('userData');
        navigate('/login', { replace: true });
      }
    };

    verifyAuth();
  }, [navigate]);

  if (isValid === null) return <div>Loading...</div>;
  return isValid ? <Outlet /> : null;
};

export default ProtectedRoute;