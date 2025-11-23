import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

const LoginForm = ({
  form,
  handleChange,
  errors,
  loading,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} style={{ width: '100%' }}>
      <Input
        type="email"
        name="correo"
        placeholder="Correo electrónico"
        value={form.correo}
        onChange={handleChange}
        error={errors.correo}
        required
        className="login-input"
      />

      <Input
        type="password"
        name="contrasena"
        placeholder="Contraseña"
        value={form.contrasena}
        onChange={handleChange}
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
        disabled={loading}
        className="boton-iniciar-sesion"
      >
        {loading ? 'Iniciando sesión...' : 'Ingresar'}
      </Button>
    </form>
  );
};

export default LoginForm;