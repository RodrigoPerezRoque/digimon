import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DigimonList from './components/DigimonList';
import SearchBar from './components/SearchBar';
import DigimonDetail from './components/DigimonDetail';
import ModalComponent from './components/ModalComponent';
import Swal from 'sweetalert2';
import digimonLogo from './DigimonLogo.png'; 

const App = () => {
  const [digimons, setDigimons] = useState([]);
  const [filteredDigimons, setFilteredDigimons] = useState([]);
  const [selectedDigimon, setSelectedDigimon] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [noDigimonModalOpen, setNoDigimonModalOpen] = useState(false);

  useEffect(() => {
    const fetchDigimons = async () => {
      try {
        const savedDigimons = localStorage.getItem('digimons');
        if (savedDigimons) {
          const parsedDigimons = JSON.parse(savedDigimons);
          setDigimons(parsedDigimons);
          setFilteredDigimons(parsedDigimons);
        } else {
          const response = await axios.get('https://digimon-api.vercel.app/api/digimon');
          setDigimons(response.data);
          setFilteredDigimons(response.data);
          localStorage.setItem('digimons', JSON.stringify(response.data));
        }
      } catch (error) {
        Swal.fire('Error', 'No se pudo cargar la lista de Digimons', 'error');
      }
    };

    fetchDigimons();
  }, []);

  const handleSearch = (query) => {
    const normalizedQuery = query.toLowerCase().trim();
    if (normalizedQuery === '') {
      setFilteredDigimons(digimons);
      setNoDigimonModalOpen(true); // Mostrar modal si la búsqueda está vacía
    } else {
      const filtered = digimons.filter(digimon => digimon.name.toLowerCase().includes(normalizedQuery));
      setFilteredDigimons(filtered);
      setNoDigimonModalOpen(false); // Ocultar modal si hay resultados en la búsqueda
    }
  };

  const handleDigimonClick = async (name) => {
    try {
      const response = await axios.get(`https://digimon-api.vercel.app/api/digimon/name/${name}`);
      const digimonData = response.data[0];
  
      // Agregar más detalles al objeto digimon
      const detailedDigimon = {
        ...digimonData,
        description: digimonData.level === 'Mega' ? '¡Es un Digimon muy poderoso!' : 'Un Digimon bastante común.',
        type: 'Virus',
        attribute: ['Vaccine', 'Data'],
      };
  
      setSelectedDigimon(detailedDigimon);
      setModalOpen(true);
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar la información del Digimon', 'error');
    }
  };
  

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDigimon(null);
  };

  const handleCloseNoDigimonModal = () => {
    setNoDigimonModalOpen(false);
  };

  return (
    <div className="container mt-5">
      <div className="header">
          <img src={digimonLogo} alt="Digimon Logo" className="logo" />
        </div>
      <div className="d-flex justify-content-center mb-4">
        <SearchBar onSearch={handleSearch} />
        <button
          className="btn btn-primary ml-2"
          onClick={() => handleSearch('')}
        >
          Buscar
        </button>
      </div>
      <DigimonList digimons={filteredDigimons} onDigimonClick={handleDigimonClick} />
      {selectedDigimon && (
        <ModalComponent isOpen={modalOpen} onClose={handleCloseModal}>
          <DigimonDetail digimon={selectedDigimon} />
        </ModalComponent>
      )}
      <ModalComponent isOpen={noDigimonModalOpen} onClose={handleCloseNoDigimonModal}>
        <div className="text-center">
          <h2>No se encontraron Digimons</h2>
          <p>Intenta realizar otra búsqueda</p>
          <button className="btn btn-primary" onClick={handleCloseNoDigimonModal}>
            Cerrar
          </button>
        </div>
      </ModalComponent>
    </div>
  );
};


export default App;
