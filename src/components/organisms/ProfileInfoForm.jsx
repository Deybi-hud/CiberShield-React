import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

const ProfileInfoForm = ({ usuarioData, onChange, onSubmit, loading, errors }) => {
    return (
        <form onSubmit={onSubmit} style={{ width: '100%' }}>
            <Input
                type="text"
                name="nombreUsuario"
                placeholder="Nombre de usuario"
                value={usuarioData.nombreUsuario}
                onChange={onChange}
                error={errors.nombreUsuario}
                required
                className="login-input"
            />
            <Input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={usuarioData.correo}
                onChange={onChange}
                error={errors.correo}
                required
                className="login-input"
            />
            <Input
                type="text"
                name="nombre"
                placeholder="Nombre (opcional)"
                value={usuarioData.nombre || ''}
                onChange={onChange}
                className="login-input"
            />
            <Input
                type="text"
                name="apellido"
                placeholder="Apellido (opcional)"
                value={usuarioData.apellido || ''}
                onChange={onChange}
                className="login-input"
            />

            {errors.general && (
                <Text as="p" className="error-message">
                    {errors.general}
                </Text>
            )}

            <Button type="submit" disabled={loading} className="boton-iniciar-sesion">
                {loading ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
        </form>
    );
};

export default ProfileInfoForm;