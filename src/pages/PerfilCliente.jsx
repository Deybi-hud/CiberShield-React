// src/pages/PerfilCliente.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
import { useAuth } from '../context/AuthContext';
import { perfilService } from '../services/cliente/perfilService';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';

const PerfilCliente = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usuario) {
      navigate('/login');
      return;
    }

    const cargarPerfil = async () => {
      try {
        const res = await perfilService.getPerfil();
        const data = await res.json();
        setPerfil(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, [usuario, navigate]);

  if (loading) return <div className="login-page"><Text>Cargando perfil...</Text></div>;
  if (!perfil) return <div className="login-page"><Text>Error al cargar perfil</Text></div>;

  return (
    <div className="login-page">
      <div className="login-container" style={{ maxWidth: '600px' }}>
        <Text as="h2">Mi Perfil</Text>
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          {usuario.imagenUsuario ? (
            <img src={usuario.imagenUsuario} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          ) : (
            <i className="bi bi-person-circle" style={{ fontSize: '80px' }}></i>
          )}
          <Text as="h3">{usuario.nombreUsuario}</Text>
          <Text as="p">{usuario.correo}</Text>
          <Text as="p" style={{ color: '#666' }}>Rol: {usuario.rol || 'Cliente'}</Text>
        </div>

        <div style={{ marginTop: '30px' }}>
          <Button onClick={logout} style={{ width: '100%', backgroundColor: '#dc3545' }}>
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PerfilCliente;
=======
import AuthService from '../services/login/AuthService';
import PerfilService from '../services/cliente/PerfilService';
import Wrapper from '../components/templates/Wrapper';
import SidebarCliente from '../components/organisms/SidebarCliente';
import MainClientePerfil from '../components/organisms/MainClientePerfil';

const ClientePerfil = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});


  const [usuarioData, setUsuarioData] = useState({
    nombreUsuario: '',
    correo: '',
    nombre: '',
    apellido: '',
    telefono: '',
    direccion: '',
    ciudad: ''
  });
  const [passwordData, setPasswordData] = useState({
    contrasenaActual: '',
    contrasenaNueva: '',
    confirmarContrasena: ''
  });

  useEffect(() => {
    if (!AuthService.isAutenticado()) {
      navigate('/login');
      return;
    }
    cargarPerfil();
  }, []);

  const cargarPerfil = async () => {
    try {
      setLoading(true);
      const data = await PerfilService.get();
      const usuario = data.usuario || {};
      const contacto = data.contacto || {};

      setUsuarioData({
        nombreUsuario: usuario.nombreUsuario || '',
        correo: usuario.correo || '',
        nombre: contacto.nombre || '',
        apellido: contacto.apellido || '',
        telefono: contacto.telefono || '',
        direccion: contacto.direccion?.calle ? `${contacto.direccion.calle} ${contacto.direccion.numero}` : '',
        ciudad: contacto.direccion?.comuna?.nombreComuna || ''
      });
    } catch (err) {
      console.error('Error al cargar perfil:', err);
      setErrors({ general: 'No se pudieron cargar los datos del perfil.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangeInfo = (e) => {
    setUsuarioData({ ...usuarioData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleChangePassword = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrors({});

    try {
      await PerfilService.update(usuarioData);
      setSuccessMessage('¡Perfil actualizado correctamente!');
    } catch (err) {
      setErrors({ general: err.response?.data?.mensaje || 'Error al actualizar el perfil.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    if (passwordData.contrasenaNueva !== passwordData.confirmarContrasena) {
      setErrors({ confirmarContrasena: 'Las contraseñas no coinciden' });
      return;
    }

    setLoading(true);
    setSuccessMessage('');
    setErrors({});

    try {
      await PerfilService.cambiarPassword({
        passwordActual: passwordData.contrasenaActual,
        passwordNueva: passwordData.contrasenaNueva
      });
      setSuccessMessage('¡Contraseña cambiada con éxito!');
      setPasswordData({ contrasenaActual: '', contrasenaNueva: '', confirmarContrasena: '' });
    } catch (err) {
      setErrors({ general: err.response?.data?.mensaje || 'Error al cambiar la contraseña.' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AuthService.logout();
    navigate('/login');
  };

  return (
    <Wrapper>
      <SidebarCliente />

      <MainClientePerfil
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        successMessage={successMessage}
        usuarioData={usuarioData}
        passwordData={passwordData}
        errors={errors}
        loading={loading}
        handleChangeInfo={handleChangeInfo}
        handleSubmitInfo={handleSubmitInfo}
        handleChangePassword={handleChangePassword}
        handleSubmitPassword={handleSubmitPassword}
        handleLogout={handleLogout}
      />
    </Wrapper>
  );
};

export default ClientePerfil;
>>>>>>> Stashed changes
