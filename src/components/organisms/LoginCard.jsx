import React from 'react';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import LoginForm from '../molecules/LoginForm';

const LoginCard = ({
  email,
  setEmail,
  password,
  setPassword,
  errors,
  isLoading,
  onSubmit,
  onRegisterClick
}) => {
  return (
    <>
      <Image 
        src="/assets/img/login/user.png" 
        alt="Usuario CiberShield" 
        className="user-image"
      />
      
      <Text as="h2" className="login-title">
        Iniciar Sesión
      </Text>
      
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        errors={errors}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
      
      <a href="#" className="login-link" onClick={onRegisterClick}>
        ¿No tienes cuenta? Regístrate
      </a>
    </>
  );
};

export default LoginCard;