import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginCard from '../components/organisms/LoginCard';
import AuthService from '../services/login/AuthService';
import '../styles/pages/Login.css';

const Login = () => {
  const [form, setForm] = useState({ correo: '', contrasena: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.correo || !form.contrasena) {
      setErrors({ general: 'Completa todos los campos' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await AuthService.login(form);
      const usuario = response.data.usuario;
      const token = response.data.token;

      // Usar el contexto para guardar datos
      login(
        {
          id: usuario.id,
          nombreUsuario: usuario.nombreUsuario,
          correo: usuario.correo,
          rol: usuario.rol,
        },
        token
      );

      setForm({ correo: '', contrasena: '' });
      
      // Redirigir según rol
      setTimeout(() => {
        if (usuario.rol === 'ADMIN' || usuario.rol === 'MODERADOR') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }, 500);
    } catch (error) {
      const msg = error.response?.data?.error || 'Credenciales inválidas';
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <LoginCard
          form={form}
          handleChange={handleChange}
          errors={errors}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Login;