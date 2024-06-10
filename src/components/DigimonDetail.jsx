import React from 'react';

const DigimonDetail = ({ digimon }) => {
  return (
    <div className="text-center">
      <img src={digimon.img} alt={digimon.name} className="img-fluid mb-3" />
      <h2>{digimon.name}</h2>
      <p><strong>Nivel:</strong> {digimon.level}</p>
      <p><strong>Tipo:</strong> {digimon.type}</p>
      <p><strong>Atributos:</strong> {digimon.attribute.join(', ')}</p>
      <p><strong>Descripción:</strong> {digimon.description}</p>
    </div>
  );
};

export default DigimonDetail;
