import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/login/AuthService';
import AdminProductoService from '../../services/admin/AdminProductoService';
import '../../styles/pages/Admin.css';

const AdminProductos = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoria: '',
    imagen: '',
  });

  useEffect(() => {
    if (!AuthService.isAutenticado()) {
      navigate('/login');
      return;
    }

    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const data = await AdminProductoService.getAll();
      setProductos(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError('Error al cargar productos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (producto = null) => {
    if (producto) {
      setEditingId(producto.id);
      setFormData({
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        precio: producto.precio || '',
        stock: producto.stock || '',
        categoria: producto.categoria || '',
        imagen: producto.imagen || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria: '',
        imagen: '',
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
        await AdminProductoService.update(editingId, formData);
      } else {
        await AdminProductoService.create(formData);
      }
      cargarProductos();
      handleCloseModal();
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al guardar producto');
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return;
    }

    try {
      await AdminProductoService.delete(id);
      cargarProductos();
    } catch (err) {
      setError('Error al eliminar producto');
    }
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1>Gestión de Productos</h1>
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
              className="admin-sidebar-item active"
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
          {error && (
            <div style={{ color: 'var(--clr-danger)', padding: '1rem', backgroundColor: '#f8d7da', borderRadius: '0.5rem', marginBottom: '1rem' }}>
              {error}
            </div>
          )}

          <div className="table-header">
            <h2>Productos</h2>
            <div className="table-controls">
              <input
                type="text"
                className="search-input"
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                className="btn-agregar"
                onClick={() => handleOpenModal()}
              >
                <i className="bi bi-plus-circle"></i> Nuevo Producto
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading">
              <i className="bi bi-hourglass-split"></i>
              <p>Cargando productos...</p>
            </div>
          ) : productosFiltrados.length === 0 ? (
            <div className="empty-state">
              <i className="bi bi-inbox"></i>
              <p>No hay productos disponibles</p>
            </div>
          ) : (
            <table className="datos-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map(producto => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio?.toFixed(2) || '0.00'}</td>
                    <td>
                      <span className={`badge ${producto.stock > 0 ? 'badge-success' : 'badge-danger'}`}>
                        {producto.stock || 0}
                      </span>
                    </td>
                    <td>{producto.categoria || '-'}</td>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="btn-editar"
                          onClick={() => handleOpenModal(producto)}
                        >
                          <i className="bi bi-pencil"></i> Editar
                        </button>
                        <button 
                          className="btn-eliminar"
                          onClick={() => handleEliminar(producto.id)}
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
              <h2>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h2>
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
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Categoría</label>
                <input
                  type="text"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>URL de Imagen</label>
                <input
                  type="text"
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                />
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
                  {editingId ? 'Actualizar' : 'Crear'} Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductos;
