import React from 'react';

const DigimonCard = ({ digimon, onDigimonClick, index }) => {
  const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
                 '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D'];

  const randomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const cardStyle = {
    backgroundColor: randomColor(),
    transition: 'background-color 0.5s ease',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.1)',
  };

  return (
    <div
      className="card"
      style={cardStyle}
      onClick={() => onDigimonClick(digimon.name)}
    >
      <img
        src={digimon.img}
        alt={digimon.name}
        className="img-fluid mb-3"
        style={{ maxWidth: '150px' }}
      />
      <h4 style={{ color: '#333' }}>{digimon.name}</h4>
      
    </div>
  );
};

export default DigimonCard;
