import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/login/AuthService';
import AdminUsuarioService from '../../services/admin/AdminUsuarioService';
import '../../styles/pages/Admin.css';

const AdminUsuarios = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    rol: 'cliente',
  });

  useEffect(() => {
    if (!AuthService.isAutenticado()) {
      navigate('/login');
      return;
    }

    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const data = await AdminUsuarioService.getAll();
      setUsuarios(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (usuario = null) => {
    if (usuario) {
      setEditingId(usuario.id);
      setFormData({
        nombre: usuario.nombre || '',
        apellido: usuario.apellido || '',
        email: usuario.email || '',
        rol: usuario.rol || 'cliente',
      });
    } else {
      setEditingId(null);
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        rol: 'cliente',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      setError('');
      if (editingId) {
        await AdminUsuarioService.update(editingId, formData);
      } else {
        await AdminUsuarioService.create(formData);
      }
      cargarUsuarios();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al guardar usuario');
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      return;
    }

    try {
      await AdminUsuarioService.delete(id);
      cargarUsuarios();
    } catch (err) {
      setError('Error al eliminar usuario');
    }
  };

  const usuariosFiltrados = usuarios.filter(u =>
    u.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate('/login');
    } catch (err) {
      navigate('/login');
    }
  };

  const getRolBadge = (rol) => {
    const badgeClass = rol === 'admin' ? 'badge-danger' : rol === 'cliente' ? 'badge-info' : 'badge-warning';
    return `badge ${badgeClass}`;
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Gestión de Usuarios</h1>
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
              className="admin-sidebar-item active"
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
          {error && (
            <div style={{ color: 'var(--clr-danger)', padding: '1rem', backgroundColor: '#f8d7da', borderRadius: '0.5rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          <div className="table-header">
            <h2>Usuarios</h2>
            <div className="table-controls">
              <input
                type="text"
                className="search-input"
                placeholder="Buscar usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                className="btn-agregar"
                onClick={() => handleOpenModal()}
              >
                <i className="bi bi-plus-circle"></i> Nuevo Usuario
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading">
              <i className="bi bi-hourglass-split"></i>
              <p>Cargando usuarios...</p>
            </div>
          ) : usuariosFiltrados.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-inbox"></i>
              <p>No hay usuarios disponibles</p>
            </div>
          ) : (
            <table className="datos-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Fecha Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map(usuario => (
                  <tr key={usuario.id}>
                    <td>{`${usuario.nombre || ''} ${usuario.apellido || ''}`.trim()}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <span className={getRolBadge(usuario.rol)}>
                        {usuario.rol}
                      </span>
                    </td>
                    <td>
                      {usuario.fechaRegistro ? new Date(usuario.fechaRegistro).toLocaleDateString() : '-'}
                    </td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="btn-editar"
                          onClick={() => handleOpenModal(usuario)}
                        >
                          <i className="bi bi-pencil"></i> Editar
                        </button>
                        <button 
                          className="btn-eliminar"
                          onClick={() => handleEliminar(usuario.id)}
                        >
                          <i className="bi bi-trash"></i> Eliminar
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

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
              <button className="btn-close-modal" onClick={handleCloseModal}>
                <i className="bi bi-x"></i>
              </button>
            </div>

            <form onSubmit={handleGuardar}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Rol</label>
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  required
                >
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancelar-modal"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar-modal">
                  {editingId ? 'Actualizar' : 'Crear'} Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsuarios;
