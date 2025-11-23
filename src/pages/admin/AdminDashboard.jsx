import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/login/AuthService';
import DashboardService from '../../services/admin/DashboardService';
import '../../styles/pages/Admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!AuthService.isAutenticado()) {
      navigate('/login');
      return;
    }

    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      setLoading(true);
      const data = await DashboardService.getStats();
      setStats(data);
    } catch (err) {
      setError('Error al cargar estadísticas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate('/login');
    } catch (err) {
      navigate('/login');
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Panel de Administrador</h1>
        <button className="admin-logout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
        </button>
      </div>

      <div className="admin-container">
        <aside className="admin-sidebar">
          <nav className="admin-sidebar-menu">
            <button 
              className="admin-sidebar-item active"
              onClick={() => navigate('/admin/dashboard')}
            >
              <i className="bi bi-speedometer2"></i> Dashboard
            </button>
            <button 
              className="admin-sidebar-item"
              onClick={() => navigate('/admin/productos')}
            >
              <i className="bi bi-box"></i> Productos
            </button>
            <button 
              className="admin-sidebar-item"
              onClick={() => navigate('/admin/usuarios')}
            >
              <i className="bi bi-people"></i> Usuarios
            </button>
            <button 
              className="admin-sidebar-item"
              onClick={() => navigate('/admin/pedidos')}
            >
              <i className="bi bi-bag"></i> Pedidos
            </button>
            <button 
              className="admin-sidebar-item"
              onClick={() => navigate('/')}
            >
              <i className="bi bi-shop"></i> Ir a Tienda
            </button>
          </nav>
        </aside>

        <main className="admin-main">
          <div className="dashboard-section">
            <div className="dashboard-header">
              <h2>Panel de Control</h2>
              <p>Resumen general de tu tienda</p>
            </div>

            {error && (
              <div style={{ color: 'var(--clr-danger)', padding: '1rem', backgroundColor: '#f8d7da', borderRadius: '0.5rem' }}>
                {error}
              </div>
            )}

            {loading ? (
              <div className="loading">
                <i className="bi bi-hourglass-split"></i>
                <p>Cargando estadísticas...</p>
              </div>
            ) : stats ? (
              <>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-value">{stats.usuariosTotal || 0}</div>
                    <div className="stat-label">Usuarios Totales</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-value">{stats.productosTotal || 0}</div>
                    <div className="stat-label">Productos</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-value">{stats.pedidosTotal || 0}</div>
                    <div className="stat-label">Pedidos Totales</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-value">${stats.ventasTotal?.toFixed(2) || '0.00'}</div>
                    <div className="stat-label">Ventas Totales</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-value">{stats.pedidosPendientes || 0}</div>
                    <div className="stat-label">Pedidos Pendientes</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-value">${stats.ventasHoy?.toFixed(2) || '0.00'}</div>
                    <div className="stat-label">Ventas Hoy</div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: 'var(--clr-gray)', borderRadius: '0.5rem' }}>
                  <h3 style={{ color: 'var(--clr-main)', marginBottom: '1rem' }}>
                    Información Adicional
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <div>
                      <p style={{ color: 'var(--clr-main-light)', marginBottom: '0.5rem' }}>
                        Productos sin Stock
                      </p>
                      <p style={{ color: 'var(--clr-main)', fontSize: '1.5rem', fontWeight: 700 }}>
                        {stats.productosSinStock || 0}
                      </p>
                    </div>
                    <div>
                      <p style={{ color: 'var(--clr-main-light)', marginBottom: '0.5rem' }}>
                        Ticket Promedio
                      </p>
                      <p style={{ color: 'var(--clr-main)', fontSize: '1.5rem', fontWeight: 700 }}>
                        ${stats.ticketPromedio?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <i className="bi bi-inbox"></i>
                <p>No hay datos disponibles</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
