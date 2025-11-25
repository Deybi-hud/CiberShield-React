import React, { useState } from "react";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import Input from "../atoms/Input";
import PerfilInfoCard from "../molecules/PerfilInfoCard";
import "../../styles/organisms/MainPerfil.css";

const MainAdminDashboard = ({ perfilData, onLogout, onCrearProducto, onEliminarProducto, error, loading }) => {
  const [showCrearForm, setShowCrearForm] = useState(false);
  const [form, setForm] = useState({
    nombreProducto: '',
    sku: '',
    precio: '',
    stock: '',
    descripcion: '',
    imagen: '',
    marcaNombre: '',
    nombreCategoria: '',
    subCategoria: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.nombreProducto || !form.sku || !form.precio || !form.stock || 
        !form.marcaNombre || !form.nombreCategoria || !form.subCategoria) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    try {
      await onCrearProducto({
        nombreProducto: form.nombreProducto,
        sku: form.sku,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock),
        descripcion: form.descripcion || "Sin descripción",
        imagen: form.imagen || "/assets/react.svg",
        marcaNombre: form.marcaNombre,
        nombreCategoria: form.nombreCategoria,
        subCategoria: form.subCategoria
      });
      
      setForm({
        nombreProducto: '',
        sku: '',
        precio: '',
        stock: '',
        descripcion: '',
        imagen: '',
        marcaNombre: '',
        nombreCategoria: '',
        subCategoria: ''
      });
      setShowCrearForm(false);
    } catch (error) {
    }
  };

  const handleEliminarClick = async () => {
    const productoId = prompt('Ingresa el ID del producto a eliminar:');
    if (productoId) {
      await onEliminarProducto(productoId);
    }
  };

  if (!perfilData) {
    return (
      <main className="perfil-main">
        <Text as="h2" className="titulo-principal">Panel de Administrador</Text>
        <div className="perfil-error">
          <i className="bi bi-exclamation-triangle"></i>
          <Text as="p">No se pudieron cargar los datos del administrador</Text>
        </div>
      </main>
    );
  }

  const { nombre, email, rol } = perfilData;

  return (
    <main className="perfil-main">
      <div className="perfil-header">
        <Text as="h2" className="titulo-principal">Panel de Administrador</Text>
        <div className="perfil-acciones-header">
          <Button className="boton-cerrar-sesion" onClick={onLogout}>
            <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
          </Button>
        </div>
      </div>

      {error && (
        <div className="perfil-alerta">
          <i className="bi bi-exclamation-circle"></i>
          <Text as="p">{error}</Text>
        </div>
      )}

      <div className="perfil-contenedor">
        <div className="perfil-foto-seccion">
          <div className="perfil-foto-container">
            <Image
              src="/assets/img/login/user.png"
              alt="Foto de administrador"
              className="perfil-foto"
            />
          </div>
          <div className="perfil-nombre-container">
            <Text as="h3" className="perfil-nombre-completo">{nombre}</Text>
            <Text as="p" className="perfil-email-principal">{email}</Text>
            <span className="perfil-badge admin-badge">
              <i className="bi bi-shield-check"></i> {rol} - Administrador
            </span>
          </div>
        </div>

        <div className="admin-section">
          <Text as="h3" className="admin-section-title">Gestión de Productos</Text>
          
          <div className="admin-actions">
            <Button 
              className="boton-crear" 
              onClick={() => setShowCrearForm(!showCrearForm)}
            >
              <i className="bi bi-plus-circle"></i> {showCrearForm ? 'Cancelar' : 'Crear Producto'}
            </Button>
            
            <Button 
              className="boton-eliminar" 
              onClick={handleEliminarClick}
            >
              <i className="bi bi-trash"></i> Eliminar Producto
            </Button>
          </div>

          {showCrearForm && (
            <form onSubmit={handleSubmit} className="product-form-simple">
              <div className="form-grid">
                <Input
                  type="text"
                  name="nombreProducto"
                  placeholder="Nombre del producto *"
                  value={form.nombreProducto}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                
                <Input
                  type="text"
                  name="sku"
                  placeholder="SKU *"
                  value={form.sku}
                  onChange={handleChange}
                  required
                  className="form-input"
                />

                <Input
                  type="number"
                  name="precio"
                  placeholder="Precio *"
                  value={form.precio}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                
                <Input
                  type="number"
                  name="stock"
                  placeholder="Stock *"
                  value={form.stock}
                  onChange={handleChange}
                  required
                  className="form-input"
                />

                <Input
                  type="text"
                  name="marcaNombre"
                  placeholder="Marca *"
                  value={form.marcaNombre}
                  onChange={handleChange}
                  required
                  className="form-input"
                />

                <Input
                  type="text"
                  name="nombreCategoria"
                  placeholder="Categoría *"
                  value={form.nombreCategoria}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                
                <Input
                  type="text"
                  name="subCategoria"
                  placeholder="Subcategoría *"
                  value={form.subCategoria}
                  onChange={handleChange}
                  required
                  className="form-input"
                />

                <Input
                  type="text"
                  name="descripcion"
                  placeholder="Descripción"
                  value={form.descripcion}
                  onChange={handleChange}
                  className="form-input full-width"
                />

                <Input
                  type="text"
                  name="imagen"
                  placeholder="URL de imagen"
                  value={form.imagen}
                  onChange={handleChange}
                  className="form-input full-width"
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="boton-confirmar"
              >
                {loading ? 'Creando...' : 'Crear Producto'}
              </Button>
            </form>
          )}
        </div>

        <div className="perfil-info-grid">
          <PerfilInfoCard
            titulo="Información del Administrador"
            icono="person-fill"
            datos={[
              { label: "Nombre Completo ", valor: " " + nombre },
              { label: "Correo Electrónico ", valor: " " + email },
              { label: "Rol ", valor: " " + rol },
            ]}
          />

          <PerfilInfoCard
            titulo="Privilegios de Administrador"
            icono="shield-lock-fill"
            datos={[
              { label: "Gestión de Productos ", valor: " Crear y eliminar" },
              { label: "Acceso Exclusivo ", valor: " Panel administrativo" },
              { label: "Control Total ", valor: " Sistema completo" }
            ]}
          />

          <PerfilInfoCard
            titulo="Acciones Disponibles"
            icono="lightning-fill"
            datos={[
              { label: "Crear Productos ", valor: " Formulario integrado" },
              { label: "Eliminar Productos ", valor: " Por ID" },
              { label: "Gestionar Stock ", valor: " Próximamente" }
            ]}
          />
        </div>
      </div>
    </main>
  );
};

export default MainAdminDashboard;