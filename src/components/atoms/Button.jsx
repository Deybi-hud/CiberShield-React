import React from 'react';
import '../../styles/atoms/Button.css';
const Button = ({ children, className = '', ...props }) => {
  return (
    <button className={`boton ${className}`} {...props}> {children}</button>
  );
};

export default Button;
