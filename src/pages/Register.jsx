import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterCard from '../components/organisms/RegisterCard';
import AuthService from '../services/login/AuthService';
import '../styles/pages/Login.css'; // Reutilizamos el layout centrado del Login

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
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.nombreUsuario.trim()) newErrors.nombreUsuario = 'El nombre de usuario es requerido';
        if (!formData.correo.trim()) newErrors.correo = 'El correo es requerido';
        if (formData.contrasena.length < 6) newErrors.contrasena = 'Mínimo 6 caracteres';
        if (formData.contrasena !== formData.confirmarContrasena) {
            newErrors.confirmarContrasena = 'Las contraseñas no coinciden';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            const datosRegistro = {
                nombreUsuario: formData.nombreUsuario,
                correo: formData.correo,
                contrasena: formData.contrasena
            };
            
            await AuthService.registrar(datosRegistro, formData.confirmarContrasena);
            alert('¡Cuenta creada con éxito!');
            navigate('/login'); 
        } catch (error) {
            const msg = error.response?.data?.error || 'Error al registrarse. Intenta nuevamente.';
            setErrors({ general: msg });
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
};

export default Register;