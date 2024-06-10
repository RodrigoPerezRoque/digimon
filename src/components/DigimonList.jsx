import React from 'react';
import DigimonCard from './DigimonCard';

const DigimonList = ({ digimons, onDigimonClick }) => {
  return (
    <div className="row">
      {digimons.map((digimon, index) => (
        <div key={index} className="col-md-4 mb-4">
          <DigimonCard digimon={digimon} onDigimonClick={onDigimonClick} index={index} />
        </div>
      ))}
    </div>
  );
};

export default DigimonList;
