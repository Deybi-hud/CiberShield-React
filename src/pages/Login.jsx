import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCard from '../components/organisms/LoginCard';
import AuthService from '../services/login/AuthService';
import '../styles/pages/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      console.log('Iniciando proceso de login...');
      const response = await AuthService.login(email, password);
      console.log('Login exitoso, respuesta:', response);
      
      // Pequeña pausa antes de redirigir para permitir ver logs
      setTimeout(() => {
        alert('¡Inicio de sesión exitoso!');
        navigate('/');
      }, 500);
    } catch (error) {
      console.error('Error en login:', error);
      console.error('Detalles del error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        statusText: error.response?.statusText
      });
      setErrors({ 
        general: error.response?.data?.error || error.response?.data?.message || 'Credenciales incorrectas. Verifica tu correo y contraseña.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate('/registro');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <LoginCard
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          errors={errors}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onRegisterClick={handleRegisterClick}
        />
      </div>
    </div>
  );
};

export default Login;