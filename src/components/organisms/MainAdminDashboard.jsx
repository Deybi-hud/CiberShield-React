// src/components/organisms/MainAdminDashboard.js
import React from "react";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import PerfilInfoCard from "../molecules/PerfilInfoCard";
import ProductManager from "../molecules/ProductManager";
import "../../styles/organisms/MainPerfil.css";

const MainAdminDashboard = ({ perfilData, onLogout, onCrearProducto, onEliminarProducto, error }) => {
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

  const { nombre, email, telefono, direccion, comuna, region, rol } = perfilData;

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
            {rol && (
              <span className="perfil-badge admin-badge">
                <i className="bi bi-shield-check"></i> {rol} - Administrador
              </span>
            )}
          </div>
        </div>

        {/* Gestión de Productos */}
        <div className="admin-section">
          <ProductManager
            onCrearProducto={onCrearProducto}
            onEliminarProducto={onEliminarProducto}
          />
        </div>

        <div className="perfil-info-grid">
          <PerfilInfoCard
            titulo="Información del Administrador"
            icono="person-fill"
            datos={[
              { label: "Nombre Completo ", valor: " " + nombre || " No especificado" },
              { label: "Correo Electrónico ", valor: " " + email || " No especificado" },
              { label: "Teléfono ", valor: telefono || " No especificado" },
            ]}
          />

          <PerfilInfoCard
            titulo="Privilegios de Administrador"
            icono="shield-lock-fill"
            datos={[
              { label: "Gestión de Productos ", valor: " Crear, editar y eliminar" },
              { label: "Gestión de Usuarios ", valor: " Ver y administrar" },
              { label: "Acceso al Dashboard ", valor: " Estadísticas completas" }
            ]}
          />

          <PerfilInfoCard
            titulo="Estadísticas Rápidas"
            icono="graph-up-fill"
            datos={[
              { label: "Productos Activos ", valor: " Cargando..." },
              { label: "Usuarios Registrados ", valor: " Cargando..." },
              { label: "Pedidos Hoy ", valor: " Cargando..." }
            ]}
          />
        </div>
      </div>
    </main>
  );
};

export default MainAdminDashboard;