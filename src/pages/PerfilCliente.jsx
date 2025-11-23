import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import PerfilService from '../services/cliente/PerfilService';
import '../styles/pages/Login.css';

const PerfilCliente = () => {
  const navigate = useNavigate();
  const [usuarioData, setUsuarioData] = useState({
    nombreUsuario: '',
    correo: '',
    nombre: '',
    apellido: '',
  });
  const [passwordData, setPasswordData] = useState({
    contrasenaActual: '',
    contrasenaNueva: '',
    confirmarContrasena: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('info');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(user);
    setUsuarioData(prev => ({
      ...prev,
      nombreUsuario: userData.nombreUsuario || '',
      correo: userData.correo || '',
      nombre: userData.nombre || '',
      apellido: userData.apellido || ''
    }));
  }, [navigate]);

  const handleChangeInfo = (e) => {
    const { name, value } = e.target;
    setUsuarioData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    setSuccessMessage('');
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    setSuccessMessage('');
  };

  const handleSubmitInfo = async (e) => {
    e.preventDefault();

    if (!usuarioData.nombreUsuario || !usuarioData.correo) {
      setErrors({ general: 'El nombre de usuario y correo son requeridos' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      const datosActualizacion = {
        nombreUsuario: usuarioData.nombreUsuario,
        correo: usuarioData.correo,
        nombre: usuarioData.nombre || null,
        apellido: usuarioData.apellido || null
      };

      await PerfilService.actualizarPerfil(datosActualizacion);

      // Actualizar localStorage
      localStorage.setItem('user', JSON.stringify({
        ...user,
        nombreUsuario: usuarioData.nombreUsuario,
        correo: usuarioData.correo,
        nombre: usuarioData.nombre,
        apellido: usuarioData.apellido
      }));

      setSuccessMessage('Información actualizada correctamente');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      const msg = error.response?.data?.error || error.message || 'Error al actualizar la información';
      setErrors({ general: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    if (!passwordData.contrasenaActual || !passwordData.contrasenaNueva) {
      setErrors({ general: 'Completa los campos de contraseña' });
      return;
    }

    if (passwordData.contrasenaNueva !== passwordData.confirmarContrasena) {
      setErrors({ confirmarContrasena: 'Las contraseñas no coinciden' });
      return;
    }

    if (passwordData.contrasenaNueva.length < 6) {
      setErrors({ contrasenaNueva: 'La contraseña debe tener al menos 6 caracteres' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await PerfilService.cambiarContrasena(
        passwordData.contrasenaActual,
        passwordData.contrasenaNueva
      );

      setPasswordData({
        contrasenaActual: '',
        contrasenaNueva: '',
        confirmarContrasena: ''
      });

      setSuccessMessage('Contraseña actualizada correctamente');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      const msg = error.response?.data?.error || 'Error al cambiar la contraseña';
      setErrors({ general: msg });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <Text as="h2" style={{ marginBottom: '30px', textAlign: 'center' }}>
          Mi Perfil
        </Text>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #ddd' }}>
          <button
            onClick={() => setActiveTab('info')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'info' ? '#007bff' : 'transparent',
              color: activeTab === 'info' ? 'white' : '#666',
              border: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'info' ? '600' : 'normal'
            }}
          >
            Información Personal
          </button>
          <button
            onClick={() => setActiveTab('password')}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === 'password' ? '#007bff' : 'transparent',
              color: activeTab === 'password' ? 'white' : '#666',
              border: 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'password' ? '600' : 'normal'
            }}
          >
            Cambiar Contraseña
          </button>
        </div>

        {/* Mensaje de éxito */}
        {successMessage && (
          <Text as="p" style={{ color: '#28a745', marginBottom: '15px', textAlign: 'center' }}>
            {successMessage}
          </Text>
        )}

        {/* Tab: Información Personal */}
        {activeTab === 'info' && (
          <form onSubmit={handleSubmitInfo} style={{ width: '100%' }}>
            <Input
              type="text"
              name="nombreUsuario"
              placeholder="Nombre de usuario"
              value={usuarioData.nombreUsuario}
              onChange={handleChangeInfo}
              error={errors.nombreUsuario}
              required
              className="login-input"
            />
            <Input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={usuarioData.correo}
              onChange={handleChangeInfo}
              error={errors.correo}
              required
              className="login-input"
            />
            <Input
              type="text"
              name="nombre"
              placeholder="Nombre (opcional)"
              value={usuarioData.nombre || ''}
              onChange={handleChangeInfo}
              className="login-input"
            />
            <Input
              type="text"
              name="apellido"
              placeholder="Apellido (opcional)"
              value={usuarioData.apellido || ''}
              onChange={handleChangeInfo}
              className="login-input"
            />

            {errors.general && (
              <Text as="p" className="error-message">
                {errors.general}
              </Text>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="boton-iniciar-sesion"
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </form>
        )}

        {/* Tab: Cambiar Contraseña */}
        {activeTab === 'password' && (
          <form onSubmit={handleSubmitPassword} style={{ width: '100%' }}>
            <Input
              type="password"
              name="contrasenaActual"
              placeholder="Contraseña actual"
              value={passwordData.contrasenaActual}
              onChange={handleChangePassword}
              error={errors.contrasenaActual}
              required
              className="login-input"
            />
            <Input
              type="password"
              name="contrasenaNueva"
              placeholder="Contraseña nueva"
              value={passwordData.contrasenaNueva}
              onChange={handleChangePassword}
              error={errors.contrasenaNueva}
              required
              className="login-input"
            />
            <Input
              type="password"
              name="confirmarContrasena"
              placeholder="Confirmar contraseña nueva"
              value={passwordData.confirmarContrasena}
              onChange={handleChangePassword}
              error={errors.confirmarContrasena}
              required
              className="login-input"
            />

            {errors.general && (
              <Text as="p" className="error-message">
                {errors.general}
              </Text>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="boton-iniciar-sesion"
            >
              {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
            </Button>
          </form>
        )}

        {/* Botón Cerrar Sesión */}
        <div style={{ marginTop: '30px', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
          <Button
            onClick={handleLogout}
            className="boton-iniciar-sesion"
            style={{ backgroundColor: '#dc3545', width: '100%' }}
          >
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PerfilCliente;
