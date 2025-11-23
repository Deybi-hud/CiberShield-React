import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/login/AuthService';
import PedidoService from '../../services/cliente/PedidoService';
import '../../styles/pages/Cliente.css';

const ClientePedidos = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!AuthService.isAutenticado()) {
      navigate('/login');
      return;
    }

    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    try {
      setLoading(true);
      const data = await PedidoService.getAll();
      setPedidos(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError('Error al cargar pedidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarPedido = async (pedidoId) => {
    if (!window.confirm('¿Estás seguro de que deseas cancelar este pedido?')) {
      return;
    }

    try {
      await PedidoService.cancel(pedidoId);
      cargarPedidos();
    } catch (err) {
      setError('Error al cancelar pedido');
    }
  };

  const getEstadoBadge = (estado) => {
    return `estado-${estado.toLowerCase()}`;
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
    <div className="cliente-page">
      <div className="cliente-header">
        <h1>Mis Pedidos</h1>
        <button className="cliente-logout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
        </button>
      </div>

      <div className="cliente-container">
        <aside className="cliente-sidebar">
          <nav className="cliente-sidebar-menu">
            <button 
              className="cliente-sidebar-item"
              onClick={() => navigate('/cliente/perfil')}
            >
              <i className="bi bi-person"></i> Mi Perfil
            </button>
            <button 
              className="cliente-sidebar-item active"
              onClick={() => navigate('/cliente/pedidos')}
            >
              <i className="bi bi-bag"></i> Mis Pedidos
            </button>
            <button 
              className="cliente-sidebar-item"
              onClick={() => navigate('/')}
            >
              <i className="bi bi-shop"></i> Ir a Tienda
            </button>
          </nav>
        </aside>

        <main className="cliente-main">
          <div className="pedidos-header">
            <h2>Historial de Pedidos</h2>
          </div>

          {error && (
            <div style={{ color: 'var(--clr-danger)', padding: '1rem', backgroundColor: '#f8d7da', borderRadius: '0.5rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          {loading ? (
            <div className="empty-state">
              <i className="bi bi-hourglass-split"></i>
              <p>Cargando pedidos...</p>
            </div>
          ) : pedidos.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-inbox"></i>
              <h3>No tienes pedidos aún</h3>
              <p>Comienza a comprar en nuestra tienda</p>
              <button 
                className="btn-nuevo-pedido"
                onClick={() => navigate('/')}
                style={{ marginTop: '1rem', margin: '1rem auto' }}
              >
                <i className="bi bi-shop"></i> Ir a Tienda
              </button>
            </div>
          ) : (
            <div className="pedidos-list">
              {pedidos.map(pedido => (
                <div key={pedido.id} className="pedido-card">
                  <div className="pedido-header">
                    <span className="pedido-id">
                      Pedido #{pedido.id || 'N/A'}
                    </span>
                    <span className={`pedido-estado ${getEstadoBadge(pedido.estado || 'pendiente')}`}>
                      {pedido.estado || 'Pendiente'}
                    </span>
                  </div>

                  <div className="pedido-info">
                    <div className="pedido-info-item">
                      <span className="pedido-info-label">Fecha</span>
                      <span className="pedido-info-value">
                        {new Date(pedido.fecha || new Date()).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="pedido-info-item">
                      <span className="pedido-info-label">Artículos</span>
                      <span className="pedido-info-value">
                        {pedido.items?.length || 0}
                      </span>
                    </div>
                    <div className="pedido-info-item">
                      <span className="pedido-info-label">Total</span>
                      <span className="pedido-info-value">
                        ${pedido.total?.toFixed(2) || '0.00'}
                      </span>
                    </div>
                  </div>

                  {pedido.items && pedido.items.length > 0 && (
                    <div className="pedido-items">
                      {pedido.items.map((item, idx) => (
                        <div key={idx} className="pedido-item">
                          <span className="pedido-item-nombre">
                            {item.nombre || item.productoNombre} x{item.cantidad}
                          </span>
                          <span className="pedido-item-total">
                            ${(item.precio * item.cantidad).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pedido-acciones">
                    <button 
                      className="btn-ver-detalle"
                      onClick={() => console.log('Ver detalle:', pedido.id)}
                    >
                      <i className="bi bi-eye"></i> Ver Detalle
                    </button>
                    {pedido.estado?.toLowerCase() !== 'entregado' && 
                     pedido.estado?.toLowerCase() !== 'cancelado' && (
                      <button 
                        className="btn-cancelar-pedido"
                        onClick={() => handleCancelarPedido(pedido.id)}
                      >
                        <i className="bi bi-x-circle"></i> Cancelar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ClientePedidos;
