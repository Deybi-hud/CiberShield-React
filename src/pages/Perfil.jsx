import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../components/templates/Wrapper';
import SidebarHome from '../components/organisms/SidebarHome';
import MainPerfil from '../components/organisms/MainPerfil';
import { useAuth } from '../context/AuthContext';
import { PerfilService } from '../services/index';
import '../styles/pages/Perfil.css';

const Perfil = () => {
  const navigate = useNavigate();
  const { usuario, isAuthenticated, logout } = useAuth();
  const [perfilData, setPerfilData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    cargarDatosPerfil();
  }, [isAuthenticated, navigate]);

  const cargarDatosPerfil = async () => {
    try {
      setLoading(true);
      const data = await PerfilService.getMiPerfil();
      setPerfilData(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar perfil:', err);
      setError('No se pudieron cargar los datos del perfil');
      // Si hay error, usamos datos del contexto como respaldo
      if (usuario) {
        setPerfilData(usuario);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEditarPerfil = () => {
    navigate('/perfil/editar');
  };

  if (loading) {
    return (
      <Wrapper>
        <SidebarHome
          categoriaActiva="perfil"
          filtrarPorCategoria={() => {}}
          productosEnCarrito={[]}
          onSearch={() => {}}
        />
        <main>
          <div className="perfil-loading">
            <i className="bi bi-hourglass-split"></i>
            <p>Cargando perfil...</p>
          </div>
        </main>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <SidebarHome
        categoriaActiva="perfil"
        filtrarPorCategoria={() => {}}
        productosEnCarrito={[]}
        onSearch={() => {}}
      />
      <MainPerfil
        perfilData={perfilData || usuario}
        onLogout={handleLogout}
        onEditar={handleEditarPerfil}
        error={error}
      />
    </Wrapper>
  );
};

export default Perfil;