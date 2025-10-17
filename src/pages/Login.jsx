import React, { useState, useEffect } from 'react';
import LoginCard from '../components/organisms/LoginCard';
import '../styles/pages/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        console.log('Cargando usuarios...');
        const response = await fetch('/data/users.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const usersData = await response.json();
        console.log('Usuarios cargados:', usersData);
        setUsers(usersData);
        setIsUsersLoaded(true);
      } catch (error) {
        console.error('Error cargando usuarios:', error);
        setErrors({ general: 'Error cargando los usuarios' });
      }
    };
    
    loadUsers();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres';
    }

    if (!isUsersLoaded) {
      newErrors.general = 'Cargando usuarios, por favor espera...';
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
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Buscando usuario:', {
        emailBuscado: email,
        passwordBuscado: password,
        usuariosDisponibles: users
      });

      // ✅ CORREGIDO: Buscar usando "correo" y "contrasena" en lugar de "email" y "password"
      const user = users.find(u => 
        u.correo.toLowerCase().trim() === email.toLowerCase().trim() && 
        u.contrasena === password
      );
      
      if (user) {
        console.log('Usuario encontrado:', user);
        
        // Mostrar alerta de éxito con el nombre del usuario
        alert(`✅ ¡Bienvenido ${user.nombre} ${user.apellido}! Inicio de sesión exitoso.`);
        
        // Guardar en localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Redirigir después de 1.5 segundos
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
        
      } else {
        console.log('Usuario NO encontrado');
        console.log('Credenciales ingresadas:', { email, password });
        console.log('Usuarios disponibles:', users);
        
        setErrors({ 
          general: 'Credenciales incorrectas. Verifica tu correo y contraseña.' 
        });
      }
    } catch (error) {
      console.error('Error en login:', error);
      setErrors({ general: 'Error al iniciar sesión. Intenta nuevamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    alert('Funcionalidad de registro en desarrollo');
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
          isLoading={isLoading || !isUsersLoaded}
          onSubmit={handleSubmit}
          onRegisterClick={handleRegisterClick}
        />
      </div>
    </div>
  );
};

export default Login;