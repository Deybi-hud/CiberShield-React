import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✨ AGREGAR
import LoginCard from '../components/organisms/LoginCard';
import { AuthService } from '../services/index';
import '../styles/pages/Login.css';

const Login = () => {
  const [form, setForm] = useState({ correo: '', contrasena: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth(); // ✨ AGREGAR

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('📝 Form actual:', form);
    
    if (!form.correo || !form.contrasena) {
      setErrors({ general: 'Completa todos los campos' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      console.log('🔐 Enviando login con:', form);
      const response = await AuthService.login(form);
      console.log('📦 Respuesta completa:', response.data);
      
      const usuario = response.data.usuario;
      const token = response.data.token || 'session-token';

      console.log('👤 Usuario recibido:', usuario);

      // ✨ Mapear a la estructura del contexto
      const usuarioMapeado = {
        id: usuario.id,
        nombre: usuario.nombreUsuario, // Mapear nombreUsuario -> nombre
        email: usuario.correo, // Mapear correo -> email
        rol: usuario.rol
      };

      console.log('✨ Usuario mapeado:', usuarioMapeado);
      console.log('🔑 Token:', token);

      // ✨ Guardar en el contexto (esto automáticamente guarda en localStorage)
      login(usuarioMapeado, token);

      console.log('✅ Sesión guardada correctamente');

      setForm({ correo: '', contrasena: '' });
      
      // Redirigir según rol
      if (usuario.rol === 'ADMIN' || usuario.rol === 'MODERADOR') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('❌ Error en login:', error);
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
