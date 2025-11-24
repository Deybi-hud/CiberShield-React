// src/pages/PerfilCliente.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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