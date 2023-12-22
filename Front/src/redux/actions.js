import {SEARCH_NAME , GET_FAVORITES,POST_FAV, DELETE_FAV, GET_ALL, ON_CLOSE, RESET_SEARCH, NEXT_PAGE, FIRST_PAGE, PREVIOUS_PAGE, FILTER_POKEMONS, SORT_POKEMONS, CREATE_POKEMON} from "./action-types";
import axios from 'axios';


export const searchPokemon = (name) => async (dispatch) => {
  try {
    const endpoint = `http://localhost:3001/pokemons/?name=${name}`;
    const response = await axios.get(endpoint);
    const { data } = response;
    
    if (data.length === 0) {
      throw new Error('Pokemon not found');
    }

    dispatch({
      type: SEARCH_NAME,
      payload: data,
      
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      
      const { response } = error;
      const errorMessage = `Pokemon not found`;
      
      
      throw new Error(errorMessage);
    } else {
      
      throw error;
    }
  }
};

export const postFav = (pokemon) => {
  return async (dispatch) => {
    console.log(pokemon)
    try {
      const endpoint = 'http://localhost:3001/fav';
      const response = await axios.post(endpoint, pokemon);
      const { data } = response;

      dispatch({
        type: POST_FAV,
        payload: data,
      });
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };
};

   export const deleteFav = (id) => async (dispatch) => {
    try {
      const endpoint = `http://localhost:3001/fav/${id}`;
      const response = await axios.delete(endpoint);
      const { data } = response;
      
      dispatch({
        type: DELETE_FAV,
        payload: data,
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
     
    }
  };

  export const getAll = () => async (dispatch) => {
    try {
      const endpoint = `http://localhost:3001/pokemons`
      const response = await axios.get(endpoint);
      const { data } = response;
      console.log(data);
      dispatch({
        type: GET_ALL,
        payload: data,
      });


    } catch (error) {
      console.error('Error geting pokemons:', error);
    }
  }
  
  export const onClose = (name) => (dispatch) => {
    dispatch({
      type: ON_CLOSE,
      payload: name,
    });
  };

  export const resetSearch = () => (dispatch, getState) => {
    const { allPokemons } = getState();
  
    dispatch({
      type: RESET_SEARCH,
      payload: allPokemons,
    });
  };
    
  export const getFavorites =  () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:3001/fav');
        const { data } = response;
        
  
        dispatch({
          type: GET_FAVORITES,
          payload: data, 
        });
      } catch (error) {
        console.error('Error getting favorites:', error);
        
      }
    };
  };

  export const nextPage = () => {
    return {
      type: NEXT_PAGE,
    };
  };
  
  export const previousPage = () => {
    return {
      type: PREVIOUS_PAGE,
    };
  };
  
  export const firstPage = () => {
    return {
      type: FIRST_PAGE,
    };
  };
  
  export const filterPokemons = (type, origin) => ({
    type: FILTER_POKEMONS,
    payload: { filterType: type, filterOrigin: origin },
  });

  export const sortPokemons = (sortBy) => ({
    type: SORT_POKEMONS,
    payload: { sortBy },
  });

  export const createPokemon = (pokemon) => async (dispatch) => {
    
    try {
      const response = await axios.post('http://localhost:3001/pokemons', pokemon);
      dispatch({
        type: CREATE_POKEMON,
        payload: response.data
      });
    } catch (error) {
      console.error(error);
    }
  };

  
  