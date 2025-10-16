import React from "react";
import Image from '../atoms/Image';
import Text from '../atoms/Text';

const HeaderLogin = () => {
  return (
    <header className="header-login">
      <Image src="/assets/img/login/user.png" alt="Usuario" className="user-image" />
      <Text>Iniciar Sesión</Text>
    </header>
  );
};

export default HeaderLogin;
