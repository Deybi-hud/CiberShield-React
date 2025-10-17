import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  errors,
  isLoading,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} style={{ width: '100%' }}>
      <Input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        required
        className="login-input"
      />
      
      <Input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
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
        className="login-button"
      >
        {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
      </Button>
    </form>
  );
};

export default LoginForm;