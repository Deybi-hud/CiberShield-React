import React from 'react';
import '../../styles/molecules/ProfileTabs.css';

const ProfileTabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className="profile-tabs">
            <button
                className={`tab-button ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => setActiveTab('info')}
            >
                Información Personal
            </button>
            <button
                className={`tab-button ${activeTab === 'password' ? 'active' : ''}`}
                onClick={() => setActiveTab('password')}
            >
                Cambiar Contraseña
            </button>
        </div>
    );
};

export default ProfileTabs;