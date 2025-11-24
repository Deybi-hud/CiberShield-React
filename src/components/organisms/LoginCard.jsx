import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import LoginForm from '../molecules/LoginForm';

const LoginCard = ({ form, handleChange, errors, loading, onSubmit }) => {
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
        form={form}
        handleChange={handleChange}
        errors={errors}
        loading={loading}
        onSubmit={onSubmit}
      />

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <Link to="/registro" className="registro-link">
          ¿No tienes una cuenta? crea una cuenta
        </Link>
      </div>
    </>
  );
};

export default LoginCard;