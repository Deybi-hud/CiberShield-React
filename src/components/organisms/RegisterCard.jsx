import React from 'react';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import RegisterForm from '../molecules/RegisterForm';
import Link from '../atoms/Link';

const RegisterCard = ({
  formData,
  onChange,
  errors,
  isLoading,
  onSubmit
}) => {
  return (
    <>
      <Image
        src="/assets/img/login/user.png"
        alt="Registro de Usuario"
        className="user-image"
      />
      <Text as="h2" className="login-title">
        Crear Cuenta
      </Text>

      <RegisterForm
        formData={formData}
        onChange={onChange}
        errors={errors}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />

      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <Link to="/login" className="login-link">
          ¿Ya tienes cuenta? Inicia Sesión
        </Link>
      </div>
    </>
  );
};

export default RegisterCard;