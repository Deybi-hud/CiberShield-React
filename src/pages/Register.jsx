import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterCard from '../components/organisms/RegisterCard';
import '../styles/pages/Login.css'; // Reutilizamos el layout centrado del Login

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        contrasena: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Manejar cambios en los inputs
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
        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
        if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
        if (!formData.correo.trim()) newErrors.correo = 'El correo es requerido';
        if (formData.contrasena.length < 6) newErrors.contrasena = 'Mínimo 6 caracteres';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);


        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simula espera
            console.log('Datos de registro:', formData);
            alert('¡Cuenta creada con éxito!');
            navigate('/login'); // Redirigir al login
        } catch (error) {
            setErrors({ general: 'Error al registrarse. Intenta nuevamente.' });
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