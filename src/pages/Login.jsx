import React, { useState } from 'react';
import '../styles/pages/Login.css';
import Image from '../components/atoms/Image'; 

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (correo === '' || password === '') {
      setError('Por favor completa todos los campos.');
      return;
    }

    // Simulación de validación (ejemplo temporal)
    if (correo !== 'usuario@ejemplo.com') {
      setError('El usuario no existe. Regístrate primero.');
      return;
    }

    if (password !== '1234') {
      setError('Contraseña incorrecta.');
      return;
    }

    setError('');
    alert('Inicio de sesión exitoso 🎉');
  };

  return (
    <div className="login-container">
      <Image src="/assets/img/login/user.png" alt="Usuario" className="user-image" />
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
      <a href="#">¿No tienes cuenta? Regístrate</a>
    </div>
  );
};

export default Login;
