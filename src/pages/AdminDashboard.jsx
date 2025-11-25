import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../components/templates/Wrapper';
import SidebarHome from '../components/organisms/SidebarHome';
import MainAdminDashboard from '../components/organisms/MainAdminDashboard';
import { useAuth } from '../context/AuthContext';
import { AdminProductoService } from '../services/index';
import '../styles/pages/Perfil.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { usuario, isAuthenticated, logout, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
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
  }, [isAuthenticated, isAdmin, navigate]);

  const handleCrearProducto = async (productoData) => {
    try {
      setLoading(true);
      console.log('Enviando producto:', productoData);
      
      const resultado = await AdminProductoService.crearProducto(productoData);
      console.log('Producto creado:', resultado);
      alert('Producto creado exitosamente');
      return resultado;
    } catch (error) {
      console.error('Error al crear producto:', error);
      const errorMessage = error.response?.data?.error || error.message;
      alert('Error al crear producto: ' + errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarProducto = async (productoId) => {
    try {
      await AdminProductoService.eliminarProducto(productoId);
      alert('Producto eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      const errorMessage = error.response?.data?.error || error.message;
      alert('Error al eliminar producto: ' + errorMessage);
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const adminData = {
    nombre: usuario?.nombre || 'Administrador',
    email: usuario?.email || 'admin123@gmail.com',
    rol: 'ADMIN'
  };

  return (
    <Wrapper>
      <SidebarHome
        categoriaActiva="admin"
        filtrarPorCategoria={() => {}}
        productosEnCarrito={[]}
        onSearch={() => {}}
      />
      <MainAdminDashboard
        perfilData={adminData}
        onLogout={handleLogout}
        onCrearProducto={handleCrearProducto}
        onEliminarProducto={handleEliminarProducto}
        error={error}
        loading={loading}
      />
    </Wrapper>
  );
};

export default AdminDashboard;