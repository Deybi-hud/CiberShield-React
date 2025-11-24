import React from "react";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import Image from "../atoms/Image";
import PerfilInfoCard from "../molecules/PerfilInfoCard";
import "../../styles/organisms/MainPerfil.css";

const MainPerfil = ({ perfilData, onLogout, onEditar, error }) => {
  if (!perfilData) {
    return (
      <main className="perfil-main">
        <Text as="h2" className="titulo-principal">Mi Perfil</Text>
        <div className="perfil-error">
          <i className="bi bi-exclamation-triangle"></i>
          <Text as="p">No se pudieron cargar los datos del perfil</Text>
        </div>
      </main>
    );
  }

  const { nombre, email, telefono, direccion, comuna, region, fechaRegistro, rol } = perfilData;

  return (
    <main className="perfil-main">
      <div className="perfil-header">
        <Text as="h2" className="titulo-principal">Mi Perfil</Text>
        <div className="perfil-acciones-header">
          <Button className="boton-editar-perfil" onClick={onEditar}>
            <i className="bi bi-pencil-fill"></i> Editar Perfil
          </Button>
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
        {/* Sección de Foto de Perfil */}
        <div className="perfil-foto-seccion">
          <div className="perfil-foto-container">
            <Image
              src="/assets/img/login/user.png"
              alt="Foto de perfil"
              className="perfil-foto"
            />
          </div>
          <div className="perfil-nombre-container">
            <Text as="h3" className="perfil-nombre-completo">{nombre}</Text>
            <Text as="p" className="perfil-email-principal">{email}</Text>
            {rol && (
              <span className="perfil-badge">
                <i className="bi bi-shield-check"></i> {rol}
              </span>
            )}
          </div>
        </div>

        {/* Grid de Información */}
        <div className="perfil-info-grid">
          {/* Información Personal */}
          <PerfilInfoCard
            titulo="Información Personal"
            icono="person-fill"
            datos={[
              { label: "Nombre Completo", valor: nombre || "No especificado" },
              { label: "Correo Electrónico", valor: email || "No especificado" },
              { label: "Teléfono", valor: telefono || "No especificado" },
              { label: "Fecha de Registro", valor: fechaRegistro ? new Date(fechaRegistro).toLocaleDateString('es-CL') : "No disponible" }
            ]}
          />

          {/* Información de Contacto */}
          <PerfilInfoCard
            titulo="Dirección de Contacto"
            icono="geo-alt-fill"
            datos={[
              { label: "Dirección", valor: direccion || "No especificada" },
              { label: "Comuna", valor: comuna?.nombre || "No especificada" },
              { label: "Región", valor: region?.nombre || "No especificada" }
            ]}
          />

          {/* Información de la Cuenta */}
          <PerfilInfoCard
            titulo="Información de la Cuenta"
            icono="shield-lock-fill"
            datos={[
              { label: "Tipo de Usuario", valor: rol || "Cliente" },
              { label: "Estado de Cuenta", valor: "Activa" },
              { label: "Última Actualización", valor: new Date().toLocaleDateString('es-CL') }
            ]}
          />

          {/* Estadísticas (Opcional) */}
          <PerfilInfoCard
            titulo="Estadísticas"
            icono="graph-up"
            datos={[
              { label: "Pedidos Realizados", valor: "0" },
              { label: "Productos Favoritos", valor: "0" },
              { label: "Monto Total Gastado", valor: "$0" }
            ]}
          />
        </div>

        {/* Sección de Acciones Rápidas */}
        <div className="perfil-acciones-rapidas">
          <Text as="h3" className="perfil-seccion-titulo">Acciones Rápidas</Text>
          <div className="perfil-botones-acciones">
            <Button className="boton-accion">
              <i className="bi bi-box-seam"></i>
              <span>Mis Pedidos</span>
            </Button>
            <Button className="boton-accion">
              <i className="bi bi-heart"></i>
              <span>Favoritos</span>
            </Button>
            <Button className="boton-accion">
              <i className="bi bi-credit-card"></i>
              <span>Métodos de Pago</span>
            </Button>
            <Button className="boton-accion">
              <i className="bi bi-lock"></i>
              <span>Cambiar Contraseña</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPerfil;