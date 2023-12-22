const { Pokemon, Type } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');

const getAllPokemon = async (url) => {
  try {
    const response = await axios.get(url);

    
    const apiPokemonData = {
      id: response.data.id,
      name: response.data.name,
      height: response.data.height,
      weight: response.data.weight,
      type: response.data.types.map(type => type.type.name),
    };

    const stats = response.data.stats.map(stat => ({
      name: stat.stat.name,
      value: stat.base_stat,
    }));

    const imageUrl = response.data.sprites.front_default;

    
    return {
      basicInfo: apiPokemonData,
      stats: stats,
      imageUrl: imageUrl,
    };
  } catch (error) {
    console.error(`Error fetching data from ${'https://pokeapi.co/api/v2/pokemon'}: ${error.message}`);
    throw error;
  }
};

const fetchAllPokemonData = async () => {
  const dbPokemons = await Pokemon.findAll();
  
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';
  const maxRetries = 3;
  let currentRetry = 0;

  while (currentRetry < maxRetries) {
    try {
      const response = await axios.get(apiUrl);
      const pokemonUrls = response.data.results.map(pokemon => pokemon.url);

      const pokemonDataPromises = pokemonUrls.map(url => getAllPokemon(url));
      const apiPokemon = await Promise.all(pokemonDataPromises);

      const allPokemonData = [...dbPokemons, ...apiPokemon];

      console.log(apiPokemon);
      return allPokemonData;
    } catch (error) {
      if (error.code === 'ETIMEDOUT') {
        
        console.error(`Error de tiempo de espera. Intento ${currentRetry + 1}/${maxRetries}.`);
        currentRetry++;
        await new Promise(resolve => setTimeout(resolve, 5000)); // Esperar 5 segundos antes de intentar nuevamente
      } else {
        
        console.error(`Error fetching Pokemon list: ${error.message}`);
        throw error;
      }
    }
  }

  console.error(`Número máximo de intentos alcanzado. No se pudo completar la solicitud.`);
  throw new Error('Número máximo de intentos alcanzado.');
};




const getPokemonById = async (id) => {
    try {
     
      const dbPokemon = await Pokemon.findByPk(id, {
        include: {
          model: Type,
          attributes: ['name'],
          through: {
            attributes: [],
          },
        },
      });
  
     
      if (dbPokemon) {
        const dbPokemonData = {
          id: dbPokemon.id,
          name: dbPokemon.name,
          height: dbPokemon.height,
          weight: dbPokemon.weight,
          type: dbPokemon.type,
          image: dbPokemon.image,
          hp: dbPokemon.hp,
          attack: dbPokemon.attack,
          defense: dbPokemon.defense,
          speed: dbPokemon.speed

       
        };
  
        return {
          
            dbPokemonData
        };
      }
  
      
      const apiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  
      
      const apiPokemonData = {
        id: apiPokemon.data.id,
        name: apiPokemon.data.name,
        height: apiPokemon.data.height,
        weight: apiPokemon.data.weight,
        type: apiPokemon.data.types.map(type => type.type.name),
        
      };
  
      const stats = apiPokemon.data.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat,
      }));
  
      const imageUrl = apiPokemon.data.sprites.front_default;
  
      
      return {
        basicInfo: apiPokemonData,
        stats: stats,
        imageUrl: imageUrl,
        
      };
    } catch (error) {
      console.error(`Error al obtener el detalle del Pokemon con ID ${id}:`, error);
      throw error;
    }
  };
  

  const getPokemonsByName = async (name) => {
    try {
       
        const dbPokemons = await Pokemon.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`, 
                },
            },
            include: Type,
        });

        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1292');
        const filteredResults = response.data.results.filter(pokemon => pokemon.name.toLowerCase().includes(name.toLowerCase()));

        const apiPokemons = await Promise.all(filteredResults.map(async pokemon => {
            const pokemonResponse = await axios.get(pokemon.url);
            const pokemonData = pokemonResponse.data;
            return {
                id: pokemonData.id,
                name: pokemonData.name,
                weight: pokemonData.weight,
                height: pokemonData.height,
                types: pokemonData.types.map(type => type.type.name),
                stats: pokemonData.stats.map(stat => ({ [stat.stat.name]: stat.base_stat })),
                image: pokemonData.sprites.front_default
            };
        }));

       
        const pokemons = [...dbPokemons, ...apiPokemons];

        return pokemons;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

let lastAssignedId = 100;

const postPokemons = async (name, image, hp, attack, defense, speed, height, weight, type) => {
  
  lastAssignedId++;

  

  const newPokemon = await Pokemon.create({
    
    id: lastAssignedId,
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    type,
    fromDatabase: true,
  });

  const typeObjects = await Type.findAll({
    where: {
      name: type,
    },
  });

  await newPokemon.setTypes(typeObjects);
  return newPokemon;
};




 


  
  
  
  

module.exports = {
  getPokemonById,
  getPokemonsByName,
  fetchAllPokemonData,
  postPokemons
};