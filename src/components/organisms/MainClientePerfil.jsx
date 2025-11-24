import React from "react";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import ProfileTabs from "../molecules/ProfileTabs";
import ProfileInfoForm from "./ProfileInfoForm";
import ChangePasswordForm from "./ChangePasswordForm";
import "../../styles/organisms/MainProductDetail.css";

const MainClientePerfil = ({
    activeTab,
    setActiveTab,
    successMessage,
    usuarioData,
    passwordData,
    errors,
    loading,
    handleChangeInfo,
    handleSubmitInfo,
    handleChangePassword,
    handleSubmitPassword,
    handleLogout
}) => {

    return (
        <main>
            <Text as="h2" className="titulo-principal">Mi Perfil</Text>
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {successMessage && (
                <div style={{
                    padding: '1rem',
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    borderRadius: '0.5rem',
                    marginBottom: '1.5rem'
                }}>
                    <Text>{successMessage}</Text>
                </div>
            )}

            {activeTab === 'info' ? (
                <ProfileInfoForm
                    formData={usuarioData}
                    onChange={handleChangeInfo}
                    onSubmit={handleSubmitInfo}
                    loading={loading}
                    errors={errors}
                />
            ) : (
                <ChangePasswordForm
                    passwordData={passwordData}
                    onChange={handleChangePassword}
                    onSubmit={handleSubmitPassword}
                    loading={loading}
                    errors={errors}
                />
            )}
            <div style={{ marginTop: '3rem', borderTop: '1px solid var(--clr-gray)', paddingTop: '2rem' }}>
                <Button
                    onClick={handleLogout}
                    className="boton"
                    style={{ backgroundColor: 'var(--clr-red)', color: 'white', maxWidth: '200px' }}
                >
                    <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
                </Button>
            </div>
        </main>
    );
};

export default MainClientePerfil;