import React from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

const ChangePasswordForm = ({ passwordData, onChange, onSubmit, loading, errors }) => {
    return (
        <form onSubmit={onSubmit} style={{ width: '100%' }}>
            <Input
                type="password"
                name="contrasenaActual"
                placeholder="Contraseña actual"
                value={passwordData.contrasenaActual}
                onChange={onChange}
                error={errors.contrasenaActual}
                required
                className="login-input"
            />
            <Input
                type="password"
                name="contrasenaNueva"
                placeholder="Contraseña nueva"
                value={passwordData.contrasenaNueva}
                onChange={onChange}
                error={errors.contrasenaNueva}
                required
                className="login-input"
            />
            <Input
                type="password"
                name="confirmarContrasena"
                placeholder="Confirmar contraseña nueva"
                value={passwordData.confirmarContrasena}
                onChange={onChange}
                error={errors.confirmarContrasena}
                required
                className="login-input"
            />

            {errors.general && (
                <Text as="p" className="error-message">
                    {errors.general}
                </Text>
            )}

            <Button type="submit" disabled={loading} className="boton-iniciar-sesion">
                {loading ? 'Actualizando...' : 'Cambiar Contraseña'}
            </Button>
        </form>
    );
};

export default ChangePasswordForm;