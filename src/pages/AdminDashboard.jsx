// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../components/templates/Wrapper';
import SidebarHome from '../components/organisms/SidebarHome';
import MainAdminDashboard from '../components/organisms/MainAdminDashboard';
import { useAuth } from '../context/AuthContext';
import { PerfilService, AdminProductoService } from '../services/index';
import '../styles/pages/Perfil.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { usuario, isAuthenticated, logout, isAdmin } = useAuth();
  const [perfilData, setPerfilData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!isAdmin) {
      setError('No tienes permisos de administrador');
      navigate('/');
      return;
    }

    cargarDatosPerfil();
  }, [isAuthenticated, isAdmin, navigate]);

  const cargarDatosPerfil = async () => {
    try {
      setLoading(true);
      const data = await PerfilService.getMiPerfil();
      setPerfilData(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar perfil de administrador:', err);
      setError('No se pudieron cargar los datos del administrador');
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

// src/pages/AdminDashboard.js - Actualizar las funciones
const handleCrearProducto = async (productoData) => {
  try {
    // Formatear los datos según lo que espera el backend
    const productoFormateado = {
      nombreProducto: productoData.nombreProducto,
      sku: productoData.sku,
      precio: productoData.precio,
      stock: productoData.stock,
      descripcion: productoData.descripcion || "Sin descripción",
      imagen: productoData.imagen || "/assets/react.svg",
      categoria: {
        id: productoData.categoriaId
      },
      ...(productoData.marcaId && {
        marca: {
          id: productoData.marcaId
        }
      })
    };

    const resultado = await AdminProductoService.crearProducto(productoFormateado);
    console.log('Producto creado:', resultado);
    alert('Producto creado exitosamente');
    return resultado;
  } catch (error) {
    console.error('Error al crear producto:', error);
    alert('Error al crear producto: ' + (error.response?.data?.error || error.message));
    throw error;
  }
};

const handleEliminarProducto = async (productoId) => {
  try {
    await AdminProductoService.eliminarProducto(productoId);
    alert('Producto eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    alert('Error al eliminar producto: ' + (error.response?.data?.error || error.message));
    throw error;
  }
};

  if (loading) {
    return (
      <Wrapper>
        <SidebarHome
          categoriaActiva="admin"
          filtrarPorCategoria={() => {}}
          productosEnCarrito={[]}
          onSearch={() => {}}
        />
        <main>
          <div className="perfil-loading">
            <i className="bi bi-hourglass-split"></i>
            <p>Cargando panel de administrador...</p>
          </div>
        </main>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <SidebarHome
        categoriaActiva="admin"
        filtrarPorCategoria={() => {}}
        productosEnCarrito={[]}
        onSearch={() => {}}
      />
      <MainAdminDashboard 
        perfilData={perfilData || usuario}
        onLogout={handleLogout}
        onCrearProducto={handleCrearProducto}
        onEliminarProducto={handleEliminarProducto}
        error={error}
      />
    </Wrapper>
  );
};

export default AdminDashboard;