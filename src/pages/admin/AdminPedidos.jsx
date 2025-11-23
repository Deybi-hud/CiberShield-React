import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/login/AuthService';
import AdminPedidoService from '../../services/admin/AdminPedidoService';
import '../../styles/pages/Admin.css';

const AdminPedidos = () => {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');

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
      const data = await AdminPedidoService.getAll();
      setPedidos(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError('Error al cargar pedidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAbrirModal = (pedido) => {
    setPedidoSeleccionado(pedido);
    setNuevoEstado(pedido.estado || 'pendiente');
    setShowModal(true);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setPedidoSeleccionado(null);
    setNuevoEstado('');
  };

  const handleCambiarEstado = async (e) => {
    e.preventDefault();
    if (!pedidoSeleccionado) return;

    try {
      setError('');
      await AdminPedidoService.updateStatus(pedidoSeleccionado.id, nuevoEstado);
      cargarPedidos();
      handleCerrarModal();
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al actualizar estado');
    }
  };

  const pedidosFiltrados = pedidos.filter(p => {
    const coincideEstado = filtroEstado === 'todos' || p.estado?.toLowerCase() === filtroEstado.toLowerCase();
    const coincideBusqueda = 
      p.id?.toString().includes(searchTerm) ||
      p.usuarioNombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return coincideEstado && coincideBusqueda;
  });

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate('/login');
    } catch (err) {
      navigate('/login');
    }
  };

  const getEstadoBadge = (estado) => {
    const estadoLower = estado?.toLowerCase() || 'pendiente';
    let badgeClass = 'badge-warning';
    
    if (estadoLower === 'entregado') badgeClass = 'badge-success';
    else if (estadoLower === 'cancelado') badgeClass = 'badge-danger';
    else if (estadoLower === 'enviado') badgeClass = 'badge-info';
    
    return `badge ${badgeClass}`;
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Gestión de Pedidos</h1>
        <button className="admin-logout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
        </button>
      </div>

      <div className="admin-container">
        <aside className="admin-sidebar">
          <nav className="admin-sidebar-menu">
            <button 
              className="admin-sidebar-item"
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
              className="admin-sidebar-item active"
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
          {error && (
            <div style={{ color: 'var(--clr-danger)', padding: '1rem', backgroundColor: '#f8d7da', borderRadius: '0.5rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          <div className="table-header">
            <h2>Pedidos</h2>
            <div className="table-controls">
              <input
                type="text"
                className="search-input"
                placeholder="Buscar por ID o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '2px solid var(--clr-gray)',
                  borderRadius: '0.5rem',
                  fontFamily: "'Rubik', sans-serif",
                  cursor: 'pointer'
                }}
              >
                <option value="todos">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="procesando">Procesando</option>
                <option value="enviado">Enviado</option>
                <option value="entregado">Entregado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading">
              <i className="bi bi-hourglass-split"></i>
              <p>Cargando pedidos...</p>
            </div>
          ) : pedidosFiltrados.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-inbox"></i>
              <p>No hay pedidos disponibles</p>
            </div>
          ) : (
            <table className="datos-table">
              <thead>
                <tr>
                  <th>ID Pedido</th>
                  <th>Cliente</th>
                  <th>Email</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidosFiltrados.map(pedido => (
                  <tr key={pedido.id}>
                    <td>#{pedido.id}</td>
                    <td>{pedido.usuarioNombre || pedido.cliente || '-'}</td>
                    <td>{pedido.email || '-'}</td>
                    <td>${pedido.total?.toFixed(2) || '0.00'}</td>
                    <td>
                      <span className={getEstadoBadge(pedido.estado)}>
                        {pedido.estado || 'Pendiente'}
                      </span>
                    </td>
                    <td>
                      {pedido.fecha ? new Date(pedido.fecha).toLocaleDateString() : '-'}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="btn-editar"
                          onClick={() => handleAbrirModal(pedido)}
                        >
                          <i className="bi bi-pencil"></i> Cambiar Estado
                        </button>
                        <button 
                          className="btn-ver"
                          onClick={() => console.log('Ver detalle:', pedido)}
                        >
                          <i className="bi bi-eye"></i> Ver
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>

      {showModal && pedidoSeleccionado && (
        <div className="modal-overlay" onClick={handleCerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Cambiar Estado del Pedido #{pedidoSeleccionado.id}</h2>
              <button className="btn-close-modal" onClick={handleCerrarModal}>
                <i className="bi bi-x"></i>
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <p><strong>Cliente:</strong> {pedidoSeleccionado.usuarioNombre || pedidoSeleccionado.cliente}</p>
              <p><strong>Total:</strong> ${pedidoSeleccionado.total?.toFixed(2) || '0.00'}</p>
              <p><strong>Estado Actual:</strong> <span className={getEstadoBadge(pedidoSeleccionado.estado)}>{pedidoSeleccionado.estado || 'Pendiente'}</span></p>
            </div>

            <form onSubmit={handleCambiarEstado}>
              <div className="form-group">
                <label>Nuevo Estado</label>
                <select
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                  required
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="procesando">Procesando</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancelar-modal"
                  onClick={handleCerrarModal}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar-modal">
                  Cambiar Estado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPedidos;
