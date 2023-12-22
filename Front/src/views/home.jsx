import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import { nextPage, previousPage, firstPage, filterPokemons, sortPokemons } from '../redux/actions';
import styles from "./home.module.css";
import { FaHandPointRight } from "react-icons/fa";
import { FaHandPointLeft } from "react-icons/fa";
import { BarLoader } from "react-spinners";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingMain, setLoadingMain] = useState(true);
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem('selectedOption') || "alphabeticalAsc");
  const [selectedType, setSelectedType] = useState(localStorage.getItem('selectedType') || 'All');
  const [selectedOrigin, setSelectedOrigin] = useState(localStorage.getItem('selectedOrigin') || 'All');

  
  const displayedPokemons = useSelector((state) => state.displayedPokemons);
  const searchedPokemons = useSelector((state) => state.searchedPokemons);

  useEffect(() => {
   
    if (loading) {
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 500); 
      

      return () => clearTimeout(timeoutId);
    }
  }, [displayedPokemons, searchedPokemons, loading]);

  useEffect(() => {
    if (displayedPokemons.length > 0) {
      setLoadingMain(false);
    }
  }, [displayedPokemons]);

  const renderPokemons = () => {
    if (searchedPokemons.length !== 0) {
      return searchedPokemons.map((pokemon) => {
        console.log(pokemon);
        if (pokemon.fromDatabase) {
          return (
            <Card
            key={pokemon.id}
            id={pokemon.id}
            image={pokemon.image}
            name={pokemon.name}
            types={pokemon.type}
            hp={pokemon.hp}
            attack={pokemon.attack}
            defense={pokemon.defense}
            speed={pokemon.speed}
            height={pokemon.height}
            weight={pokemon.weight}
          />
          );
        } else {
          return (
            <Card
  key={pokemon.id}
  id={pokemon.id}
  image={pokemon.image}
  name={pokemon.name}
  types={pokemon.types ? pokemon.types.join(', ') : 'Unknown'}
  hp={pokemon.stats ? (pokemon.stats.find((stat) => stat.hp).hp || 'Unknown') : 'Unknown'}
  attack={pokemon.stats ? (pokemon.stats.find((stat) => stat.attack).attack || 'Unknown') : 'Unknown'}
  defense={pokemon.stats ? (pokemon.stats.find((stat) => stat.defense).defense || 'Unknown') : 'Unknown'}
  speed={pokemon.stats ? (pokemon.stats.find((stat) => stat.speed).speed || 'Unknown') : 'Unknown'}
  height={pokemon.height || 'Unknown'}
  weight={pokemon.weight || 'Unknown'}
/>
          );
        }
      });
    }
  
    return displayedPokemons.map((pokemon) => {
      if (pokemon.fromDatabase) {
       
        return (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            image={pokemon.image}
            name={pokemon.name}
            types={pokemon.type}
            hp={pokemon.hp}
            attack={pokemon.attack}
            defense={pokemon.defense}
            speed={pokemon.speed}
            height={pokemon.height}
            weight={pokemon.weight}
          />
        );
      } else {
        
        return (
          <Card
            key={pokemon.id || pokemon.basicInfo.id}
            id={pokemon.id || pokemon.basicInfo.id}
            image={pokemon.image || pokemon.imageUrl}
            name={pokemon.name || pokemon.basicInfo.name}
            types={(pokemon.types || pokemon.basicInfo.type) ? (pokemon.types || pokemon.basicInfo.type).join(', ') : 'Unknown'}
            hp={pokemon.stats ? (pokemon.stats.find((stat) => stat.name === 'hp')?.value || 'Unknown') : 'Unknown'}
            attack={pokemon.stats ? (pokemon.stats.find((stat) => stat.name === 'attack')?.value || 'Unknown') : 'Unknown'}
            defense={pokemon.stats ? (pokemon.stats.find((stat) => stat.name === 'defense')?.value || 'Unknown') : 'Unknown'}
            speed={pokemon.stats ? (pokemon.stats.find((stat) => stat.name === 'speed')?.value || 'Unknown') : 'Unknown'}
            height={pokemon.height || pokemon.basicInfo.height || 'Unknown'}
            weight={pokemon.weight || pokemon.basicInfo.weight || 'Unknown'}
          />
        );
      }
    });
  };
  

  const handleNextPage = () => {
    setLoading(true);
    dispatch(nextPage());
    
  };

  const handlePreviousPage = () => {
    setLoading(true);
    dispatch(previousPage());
    
  };

  const handleFirstPage = () => {
    setLoading(true);
    dispatch(firstPage());
    
  };

  const filterType = useSelector((state) => state.filterType);
  const handleTypeChange = (type) => {
    dispatch(filterPokemons(type, filterOrigin));
    setSelectedType(type);
    localStorage.setItem('selectedType', type);
  };
  
  
  const filterOrigin = useSelector((state) => state.filterOrigin);
  const handleOriginChange = (origin) => {
    setSelectedOrigin(origin);
    localStorage.setItem('selectedOrigin', origin);
    dispatch(filterPokemons(filterType, origin));
  };


  const handleSortChange = (sortBy) => {
    dispatch(sortPokemons(sortBy));
    setSelectedOption(sortBy);
    localStorage.setItem('selectedOption', sortBy);
};

  return (
    <div>
      
      <div className={styles.selectContainer}>
      <select
  value={selectedType}
  className={styles.select}
  name="type"
  id="type"
  onChange={(event) => handleTypeChange(event.target.value)}
>
  <option value="All">All</option>
  <option value="normal">Normal</option>
  <option value="flying">Flying</option>
  <option value="poison">Poison</option>
  <option value="electric">Electric</option>
  <option value="ground">Ground</option>
  <option value="fairy">Fairy</option>
  <option value="fire">Fire</option>
  <option value="grass">Grass</option>
  <option value="bug">Bug</option>
  <option value="water">Water</option>
  <option value="fighting">Fighting</option>
  <option value="psychic">Psychic</option>
  <option value="rock">Rock</option>
  <option value="steel">Steel</option>
  <option value="ice">Ice</option>
  <option value="ghost">Ghost</option>
  <option value="dragon">Dragon</option>
  <option value="dark">Dark</option>
</select>
<select
  value={selectedOrigin}
  name="origin"
  id="origin"
  onChange={(event) => handleOriginChange(event.target.value)}
>
  <option value="All">All</option>
  <option value="Api">Api</option>
  <option value="Database">Database</option>
</select>
<select
  value={selectedOption}
  name="sort"
  id="sort"
  onChange={(event) => handleSortChange(event.target.value)}
>
  <option value="alphabeticalAsc">Alphabetical (Asc)</option>
  <option value="alphabeticalDesc">Alphabetical (Desc)</option>
  <option value="attackAsc">Attack (Asc)</option>
  <option value="attackDesc">Attack (Desc)</option>
  <option value="hpAsc">Hp (Asc)</option>
  <option value="hpDesc">Hp (Desc)</option>
  <option value="defenseAsc">Defense (Asc)</option>
  <option value="defenseDesc">Defense (Desc)</option>
  <option value="speedAsc">Speed (Asc)</option>
  <option value="speedDesc">Speed (Desc)</option>
  <option value="weightAsc">Weight (Asc)</option>
  <option value="weightDesc">Weight (Desc)</option>
  <option value="heightAsc">Height (Asc)</option>
  <option value="heightDesc">Height (Desc)</option>
</select>
      </div>
      {loading ? (
        <div className={styles.loadingContainer}>
        <p className={styles.loadingMessage}>Loading...</p>
          <BarLoader color="#000000" height={4} width={100} />
        </div>
      ) : (
        <div className={styles.loadingContainerMain}>
        {loadingMain ? (
    <>
      <BarLoader className={styles.loaderMain} />
      <p className={styles.loadingMessageMain}>Loading pokemons data...</p>
    </>
  ) : (
    renderPokemons()
  )}
</div>


      )}
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handlePreviousPage}><FaHandPointLeft /></button>
        <button className={styles.button} onClick={handleNextPage}><FaHandPointRight /></button>
        <button className={styles.button} onClick={handleFirstPage}>First Page</button>
      </div>
    </div>
  );
};

export default Home;

