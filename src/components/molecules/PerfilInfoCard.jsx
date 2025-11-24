import React from 'react';
import Text from '../atoms/Text';
import '../../styles/molecules/PerfilInfoCard.css';

const PerfilInfoCard = ({ titulo, icono, datos }) => {
  return (
    <div className="perfil-info-card">
      <div className="perfil-info-card-header">
        <i className={`bi bi-${icono}`}></i>
        <Text as="h4" className="perfil-info-card-titulo">{titulo}</Text>
      </div>
      <div className="perfil-info-card-body">
        {datos.map((dato, index) => (
          <div key={index} className="perfil-info-item">
            <Text as="span" className="perfil-info-label">{dato.label}:</Text>
            <Text as="span" className="perfil-info-valor">{dato.valor}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerfilInfoCard;