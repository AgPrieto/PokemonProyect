
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { postFav, deleteFav, onClose } from '../redux/actions'; 
import styles from "./Card.module.css"


const Card = ({ id, image, name, types, hp, attack, defense, speed, height, weight}) => {
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.myFavorites);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (Array.isArray(myFavorites)) {
      myFavorites.forEach((fav) => {
        if (fav.name === name) {
          setIsFav(true);
        }
      });
    }
  }, [myFavorites, name]);

  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      dispatch(deleteFav(id));
    } else {
      setIsFav(true);
      dispatch(postFav({id, image, name, types, hp, attack, defense, speed, height, weight}));
    }
  };

  const handleButtonClick = () => {
    dispatch(onClose(name));
  };

  return (
    <div className={styles.card}>
      <div className={styles.buttons}>
      {isFav ? (
        <button className={styles.button} onClick={handleFavorite}>
          ❤️
        </button>
      ) : (
        <button className={styles.button} onClick={handleFavorite}>
          🤍
        </button>
      )}
      <button className={styles.button} onClick={handleButtonClick}>
        X
      </button>
      </div>
      <Link to={`/detail/${id}`}>
        <div className={styles.img}>
          <img src={image} alt={name} />
        </div>
      </Link>
      <h1>{name}</h1>
      
    </div>
  );
};

export default Card;




