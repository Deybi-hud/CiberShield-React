import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterCard from '../components/organisms/RegisterCard';
import { LoginService } from '../services/Index';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.contrasena !== formData.confirmarContrasena) {
      setErrors({ general: 'Las contraseñas no coinciden' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await LoginService.register({
        nombreUsuario: formData.nombreUsuario,
        correo: formData.correo,
        contrasena: formData.contrasena
      }, formData.confirmarContrasena);
      
      alert('¡Cuenta creada con éxito!');
      navigate('/login');
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <RegisterCard
          formData={formData}
          onChange={handleChange}
          errors={errors}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Register;