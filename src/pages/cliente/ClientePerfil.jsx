import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/login/AuthService';
import PerfilService from '../../services/cliente/PerfilService';
import '../../styles/pages/Cliente.css';

const ClientePerfil = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
  });

  useEffect(() => {
    // Verificar autenticación
    if (!AuthService.isAutenticado()) {
      navigate('/login');
      return;
    }

    cargarPerfil();
  }, []);

  const cargarPerfil = async () => {
    try {
      setLoading(true);
      const usuario = AuthService.getUsuarioActual();
      if (usuario) {
        setFormData({
          nombre: usuario.nombre || '',
          apellido: usuario.apellido || '',
          email: usuario.email || '',
          telefono: usuario.telefono || '',
          direccion: usuario.direccion || '',
          ciudad: usuario.ciudad || '',
        });
      }
    } catch (err) {
      setError('Error al cargar el perfil');
    } finally {
      setLoading(false);
    }
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
      setLoading(true);
      setError('');
      setMensaje('');

      await PerfilService.update(formData);
      setMensaje('Perfil actualizado exitosamente');
      setEditing(false);

      // Actualizar datos en localStorage
      setTimeout(() => {
        cargarPerfil();
      }, 500);
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigate('/login');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
      navigate('/login');
    }
  };

  return (
    <div className="cliente-page">
      <div className="cliente-header">
        <h1>Mi Perfil</h1>
        <button className="cliente-logout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
        </button>
      </div>

      <div className="cliente-container">
        <aside className="cliente-sidebar">
          <nav className="cliente-sidebar-menu">
            <button 
              className="cliente-sidebar-item active"
              onClick={() => navigate('/cliente/perfil')}
            >
              <i className="bi bi-person"></i> Mi Perfil
            </button>
            <button 
              className="cliente-sidebar-item"
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
          <div className="perfil-section">
            <div className="perfil-header">
              <h2>Información Personal</h2>
              <p>Actualiza tu información de perfil</p>
            </div>

            {error && (
              <div style={{ color: 'var(--clr-danger)', padding: '1rem', backgroundColor: '#f8d7da', borderRadius: '0.5rem' }}>
                {error}
              </div>
            )}

            {mensaje && (
              <div style={{ color: '#0f5132', padding: '1rem', backgroundColor: '#d1e7dd', borderRadius: '0.5rem' }}>
                {mensaje}
              </div>
            )}

            <form onSubmit={handleGuardar}>
              <div className="perfil-info">
                <div className="perfil-field">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                  />
                </div>

                <div className="perfil-field">
                  <label>Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                  />
                </div>

                <div className="perfil-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                  />
                </div>

                <div className="perfil-field">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>

                <div className="perfil-field">
                  <label>Dirección</label>
                  <textarea
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>

                <div className="perfil-field">
                  <label>Ciudad</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </div>
              </div>

              <div className="perfil-actions">
                {editing ? (
                  <>
                    <button
                      type="button"
                      className="btn-cancelar"
                      onClick={() => {
                        setEditing(false);
                        cargarPerfil();
                      }}
                      disabled={loading}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn-guardar"
                      disabled={loading}
                    >
                      {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn-guardar"
                    onClick={() => setEditing(true)}
                  >
                    Editar Perfil
                  </button>
                )}
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientePerfil;
