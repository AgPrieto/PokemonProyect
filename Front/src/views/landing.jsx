import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landing.module.css';
import pokemonIcon from '../assets/pokemonIcon.png';

const Landing = () => {
  return (
    <div className={styles.landingPage}>
      <img
        src="https://images7.alphacoders.com/130/1305158.jpeg"
        alt="Imagen de bienvenida"
        className={styles.backgroundImage}
      />
      <Link to="/home">
        <button className={styles.enterButton}>
          <img src={pokemonIcon} alt="Pokemon" className={styles.iconButton} />
          Enter
        </button>
      </Link>
    </div>
  );
};

export default Landing;