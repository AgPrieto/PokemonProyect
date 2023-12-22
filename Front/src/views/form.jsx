import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPokemon } from '../redux/actions';
import styles from "./form.module.css";
import pencilCreate from "../assets/pencilCreate.png";

const Form = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [hp, setHp] = useState('');
  const [attack, setAttack] = useState('');
  const [defense, setDefense] = useState('');
  const [speed, setSpeed] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [type, setType] = useState('');
  const [nameErrors, setNameErrors] = useState([]);
  const [imageErrors, setImageErrors] = useState([]);
  const [hpErrors, setHpErrors] = useState([]);
  const [attackErrors, setAttackErrors] = useState([]);
  const [defenseErrors, setDefenseErrors] = useState([]);
  const [speedErrors, setSpeedErrors] = useState([]);
  const [heightErrors, setHeightErrors] = useState([]);
  const [weightErrors, setWeightErrors] = useState([]);
  const [typesErrors, setTypesErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  
  

  useEffect(() => {
    validateName(name);
  }, [name]);

  useEffect(() => {
    validateImage(image);
  }, [image]);

  useEffect(() => {
    validateStat(hp, setHpErrors, 'HP', 1, 100);
  }, [hp]);

  useEffect(() => {
    validateStat(attack, setAttackErrors, 'Attack', 1, 130);
  }, [attack]);

  useEffect(() => {
    validateStat(defense, setDefenseErrors, 'Defense', 1, 100);
  }, [defense]);

  useEffect(() => {
    validateStat(speed, setSpeedErrors, 'Speed', 1, 100);
  }, [speed]);

  useEffect(() => {
    validateStat(height, setHeightErrors, 'Height', 1, 30);
  }, [height]);

  useEffect(() => {
    validateStat(weight, setWeightErrors, 'Weight', 10, 5000);
  }, [weight]);

  useEffect(() => {
    validateType(type);
  }, [type]);

  const validateName = (value) => {
    const errors = [];
    if (!value) {
      errors.push("The Pokémon's name is required");
    } else if (!/^[a-zA-Z]+$/.test(value)) {
      errors.push("The Pokémon's name can only contain letters");
    } else if (value.length > 15) {
      errors.push("The Pokémon's name cannot exceed 15 characters");
    } else if (value.length < 2) {
      errors.push("The Pokémon's name must have at least two characters");
    } 
    setNameErrors(errors);
  };

  const validateImage = (value) => {
    const errors = [];
    if (!value) {
      errors.push("The Pokémon's image is required");
    }
    setImageErrors(errors);
  };

  const validateStat = (value, setErrors, statName, minValue, maxValue) => {
    const errors = [];
    if (!value) {
      errors.push(`The Pokémon's ${statName} is required`);
    } else if (value < minValue || value > maxValue) {
      errors.push(`${statName} must be between ${minValue} and ${maxValue}`);
    }
    setErrors(errors);
  };

  const validateType = (value) => {
    const errors = [];
    const allowedTypes = [
      "normal", "flying", "poison", "electric", "ground", "fairy", "fire",
      "grass", "bug", "water", "fighting", "psychic", "rock", "steel", "ice",
      "ghost", "dragon", "dark"
    ];
    if (!allowedTypes.includes(value.toLowerCase())) {
      errors.push("Invalid Pokémon type");
    }
    setTypesErrors(errors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    
    if (
      nameErrors.length === 0 &&
      imageErrors.length === 0 &&
      hpErrors.length === 0 &&
      attackErrors.length === 0 &&
      defenseErrors.length === 0 &&
      speedErrors.length === 0 &&
      heightErrors.length === 0 &&
      weightErrors.length === 0 &&
      typesErrors.length === 0
    ) {
      dispatch(createPokemon({
        name,
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        type
      }));

      setSuccessMessage("Pokémon successfully created!");

      setTimeout(() => {
        setSuccessMessage('');
        resetForm();
      }, 1000);
    }
  };

  const resetForm = () => {
    setName('');
    setImage('');
    setHp('');
    setAttack('');
    setDefense('');
    setSpeed('');
    setHeight('');
    setWeight('');
    setType('');
    setNameErrors([]);
    setImageErrors([]);
    setHpErrors([]);
    setAttackErrors([]);
    setDefenseErrors([]);
    setSpeedErrors([]);
    setHeightErrors([]);
    setWeightErrors([]);
    setTypesErrors([]);
    setSuccessMessage('');
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.h1}><img src={pencilCreate} alt="Pokemon" className={styles.pencilCreate} /> Create your pokemon! </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <br />
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateName(e.target.value);
            }}
          />
          <p>{nameErrors.join(', ')}</p>
        </label>
        <label>
          Image:
          <br />
          <input
            className={styles.input}
            type="text"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
              validateImage(e.target.value);
            }}
          />
          <p>{imageErrors.join(', ')}</p>
        </label>
        <label>
          Hp:
          <br />
          <input
            className={styles.input}
            type="number"
            value={hp}
            onChange={(e) => {
              setHp(e.target.value);
              validateStat(e.target.value, setHpErrors, 'HP', 1, 100);
            }}
          />
          <p>{hpErrors.join(', ')}</p>
        </label>
        <label>
          Attack:
          <br />
          <input
            className={styles.input}
            type="number"
            value={attack}
            onChange={(e) => {
              setAttack(e.target.value);
              validateStat(e.target.value, setAttackErrors, 'Attack', 1, 130);
            }}
          />
          <p>{attackErrors.join(', ')}</p>
        </label>
        <label>
          Defense:
          <br />
          <input
            className={styles.input}
            type="number"
            value={defense}
            onChange={(e) => {
              setDefense(e.target.value);
              validateStat(e.target.value, setDefenseErrors, 'Defense', 1, 100);
            }}
          />
          <p>{defenseErrors.join(', ')}</p>
        </label>
        <label>
          Speed:
          <br />
          <input
            className={styles.input}
            type="number"
            value={speed}
            onChange={(e) => {
              setSpeed(e.target.value);
              validateStat(e.target.value, setSpeedErrors, 'Speed', 1, 100);
            }}
          />
          <p>{speedErrors.join(', ')}</p>
        </label>
        <label>
          Height:
          <br />
          <input
            className={styles.input}
            type="number"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
              validateStat(e.target.value, setHeightErrors, 'Height', 1, 30);
            }}
          />
          <p>{heightErrors.join(', ')}</p>
        </label>
        <label>
          Weight:
          <br />
          <input
            className={styles.input}
            type="number"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
              validateStat(e.target.value, setWeightErrors, 'Weight', 10, 5000);
            }}
          />
          <p>{weightErrors.join(', ')}</p>
        </label>
        <label>
          Types:
          <br />
          <input
            className={styles.input}
            type="text"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              validateType(e.target.value);
            }}
          />
          <p>{typesErrors.join(', ')}</p>
        </label>
        <input className={styles.buttonSubmit} type="submit" value="Create Pokémon"  />
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default Form;
