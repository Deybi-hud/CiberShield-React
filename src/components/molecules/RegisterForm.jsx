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
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={onChange}
        error={errors.nombre}
        required
        className="login-input"
      />
      <Input
        type="text"
        name="apellido"
        placeholder="Apellido"
        value={formData.apellido}
        onChange={onChange}
        error={errors.apellido}
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