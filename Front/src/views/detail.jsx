import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './detail.module.css';
import { PiSwordDuotone } from 'react-icons/pi';
import { FaShieldHalved } from 'react-icons/fa6';
import { FaBoltLightning } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
import { FaWeightHanging } from 'react-icons/fa';
import { TbLineHeight } from 'react-icons/tb';
import { BarLoader } from 'react-spinners';

const Detail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`http://localhost:3001/pokemons/${id}`);
        const { data } = response;
        console.log(data);
  
        
        if (data.basicInfo && data.basicInfo.name) {
          setCharacter(data);
        } else if (data.dbPokemonData && data.dbPokemonData.name) {
          
          setCharacter(data.dbPokemonData);
        } else {
          setError('Pokemon not found with that ID');
        }
      } catch (error) {
        setError('Error loading pokemon');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);
  

  console.log('Estado actualizado:', character);

  return (
    <div className={styles.detail}>
      {loading && (
        <div className={styles.loadingContainer}>
          <p className={styles.loadingMessage}>Loading...</p>
          <BarLoader color="#000000" height={4} width={100} />
        </div>
      )}
      {error && <p>{error}</p>}
      {(!character.basicInfo || !character.basicInfo.name) && character && (
  <>
    <h2 className={styles.h2}>{character.name}</h2>
    <img src={character.image} alt={character.name} />
    <p>Types: {character.type}</p>
    <div className={styles.statsContainer}>
      <div className={styles.stats1}>
        <p>
          <FaWeightHanging /> : {character.weight || 'Unknown'}
        </p>
        <p>
          <FaHeart /> : {character.hp || 'Unknown'}
        </p>
        <p>
          <PiSwordDuotone /> : {character.attack || 'Unknown'}
        </p>
      </div>
      <div className={styles.stats2}>
        <p>
          <TbLineHeight /> : {character.height || 'Unknown'}
        </p>
        <p>
          <FaShieldHalved /> : {character.defense || 'Unknown'}
        </p>
        <p>
          <FaBoltLightning /> : {character.speed || 'Unknown'}
        </p>
      </div>
    </div>
  </>
)}

{character.basicInfo && character.basicInfo.name && !loading && (
  <>
    <h2 className={styles.h2}>{character.basicInfo.name}</h2>
    <img src={character.imageUrl} alt={character.basicInfo.name} />
    <p>Types: {character.basicInfo.type ? character.basicInfo.type.join(', ') : 'Unknown'}</p>
    <div className={styles.statsContainer}>
      <div className={styles.stats1}>
        <p>
          <FaWeightHanging /> : {character.basicInfo.weight || 'Unknown'}
        </p>
        <p>
          <FaHeart /> : {character.stats.find((stat) => stat.name === 'hp')?.value || 'Unknown'}
        </p>
        <p>
          <PiSwordDuotone /> : {character.stats.find((stat) => stat.name === 'attack')?.value || 'Unknown'}
        </p>
      </div>
      <div className={styles.stats2}>
        <p>
          <TbLineHeight /> : {character.basicInfo.height || 'Unknown'}
        </p>
        <p>
          <FaShieldHalved /> : {character.stats.find((stat) => stat.name === 'defense')?.value || 'Unknown'}
        </p>
        <p>
          <FaBoltLightning /> : {character.stats.find((stat) => stat.name === 'speed')?.value || 'Unknown'}
        </p>
      </div>
    </div>
  </>
)}

    </div>
  );
};

export default Detail;
