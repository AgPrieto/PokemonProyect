import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './searchBar.module.css';
import { searchPokemon, resetSearch } from '../redux/actions';
import pokemonIcon from '../assets/pokemonIcon.png';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchedName, setName] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchedName.trim() !== '') {
      try {
        await dispatch(searchPokemon(searchedName));
        setError('');
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    }
  };

  const handleClick = (e) => {
    e.preventDefault(); 
    setName('');
    dispatch(resetSearch());
  };

  return (
    <div className={styles.searchBar}>
      {error && <p className={styles.error}>{error}</p>}
      <img src={pokemonIcon} alt="Pokemon" className={styles.iconButton} />
      <form onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          onChange={handleChange}
          type="text"
          placeholder="Search pokemon"
          value={searchedName}
        />
        <input className={styles.barButton} type="submit" value="Search" />
        <button className={styles.barButton} onClick={handleClick}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default SearchBar;