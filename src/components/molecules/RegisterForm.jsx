import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import '../../styles/molecules/LoginForm.css';

const RegisterForm = ({
  formData,
  onChange,
  errors,
  isLoading,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} style={{ width: '100%' }}>

      <Input
        type="text"
        name="nombreUsuario"
        placeholder="Nombre de usuario"
        value={formData.nombreUsuario}
        onChange={onChange}
        error={errors.nombreUsuario}
        required
        className="login-input"
      />
      <Input
        type="email"
        name="correo"
        placeholder="Correo electrónico"
        value={formData.correo}
        onChange={onChange}
        error={errors.correo}
        required
        className="login-input"
      />

      <Input
        type="password"
        name="contrasena"
        placeholder="Contraseña"
        value={formData.contrasena}
        onChange={onChange}
        error={errors.contrasena}
        required
        className="login-input"
      />

      <Input
        type="password"
        name="confirmarContrasena"
        placeholder="Confirmar contraseña"
        value={formData.confirmarContrasena}
        onChange={onChange}
        error={errors.confirmarContrasena}
        required
        className="login-input"
      />

      {errors.general && (
        <Text as="p" className="error-message">
          {errors.general}
        </Text>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="boton-iniciar-sesion"
      >
        {isLoading ? 'Registrando...' : 'Crear Cuenta'}
      </Button>
    </form>
  );
};

export default RegisterForm;