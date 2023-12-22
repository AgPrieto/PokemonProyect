const express = require('express');
const { fetchAllPokemonData, getPokemonById, getPokemonsByName, postPokemons } = require('../controllers/pokemonsControllers');

const pokemonRouter = express.Router();

pokemonRouter.get('/', async (req, res) => {
  try {
    const { name } = req.query;

    if (name) {
      const pokemons = await getPokemonsByName(name);

      if (pokemons.length === 0) {
        return res.status(404).json({ message: 'No se encontraron pokemons con ese nombre.' });
      }

      return res.status(200).json(pokemons);
    } else {
      const allPokemon = await fetchAllPokemonData();
      return res.status(200).json(allPokemon);
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: 'Error interno del servidor. Detalles en el registro.' });
  }
});

pokemonRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const pokemon = await getPokemonById(id);
      return res.status(200).json(pokemon);
    } catch (error) {
      console.error(error.message);
      return res.status(404).json({ error: 'Pokemon not found' });
    }
  });

  pokemonRouter.post('/', async (req, res) => {
    const {name, image, hp, attack, defense, speed, height, weight, type} = req.body;
  
    try {
      if (!name || !image || !hp || !attack || !defense || !speed || !height || !weight || !type) throw Error('Must provide more information')

      else {
          const newPokemon = await postPokemons(name, image, hp, attack, defense, speed, height, weight, type);
          return res.status(200).json(newPokemon);

      }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear el Pokemon.' });
  }
});






  

  

module.exports = pokemonRouter;
