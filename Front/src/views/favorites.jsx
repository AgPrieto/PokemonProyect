import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import Card from '../components/Card'; 
import { getFavorites } from '../redux/actions';

const Favorites = () => {
  const dispatch = useDispatch();
  const myFavorites = useSelector((state) => state.myFavorites);

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  
  console.log(myFavorites);
  return (
    <div>
      <div>
        {myFavorites.map((favorito) => (
          <Card
            key={favorito.id}
            id={favorito.id}
            image={favorito.image}
            name={favorito.name}
            types={favorito.types}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
