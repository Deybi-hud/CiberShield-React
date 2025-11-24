import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginService } from '../services/auth/LoginService';
import LoginCard from '../components/organisms/LoginCard';

const Login = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { login } = useAuth();
=======
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
>>>>>>> parent of 3ce9864 (LOGIN Y REGISTER OK)

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
<<<<<<< HEAD
    setLoading(true);
    setErrors({});

    try {
      const res = await LoginService.login(form.correo, form.contrasena);
      const data = await res.json();
      login(data.usuario);
      navigate('/');
    } catch (err) {
      setErrors({ general: err.message });
=======

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
>>>>>>> parent of 3ce9864 (LOGIN Y REGISTER OK)
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