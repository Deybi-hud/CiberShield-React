// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterCard from '../components/organisms/RegisterCard';
import { LoginService } from '../services/auth/LoginService';

const Register = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
=======
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        contrasena: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
>>>>>>> parent of 3ce9864 (LOGIN Y REGISTER OK)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.contrasena !== formData.confirmarContrasena) {
      setErrors({ general: 'Las contraseñas no coinciden' });
      return;
    }
=======
    const validateForm = () => {
        const newErrors = {};
        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
        if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
        if (!formData.correo.trim()) newErrors.correo = 'El correo es requerido';
        if (formData.contrasena.length < 6) newErrors.contrasena = 'Mínimo 6 caracteres';
>>>>>>> parent of 3ce9864 (LOGIN Y REGISTER OK)

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

<<<<<<< HEAD
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
=======
        setIsLoading(true);

        try {
            const datosRegistro = {
                nombreUsuario: `${formData.nombre} ${formData.apellido}`,
                correo: formData.correo,
                contrasena: formData.contrasena
            };
            
            await AuthService.registrar(datosRegistro);
            alert('¡Cuenta creada con éxito!');
            navigate('/login'); 
        } catch (error) {
            setErrors({ general: error.response?.data?.error || 'Error al registrarse. Intenta nuevamente.' });
            console.error('Error en registro:', error);
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
>>>>>>> parent of 3ce9864 (LOGIN Y REGISTER OK)
};

export default Register;