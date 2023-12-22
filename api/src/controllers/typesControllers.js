const { Type } = require('../db');
const axios = require('axios');


const getAllTypes = async () => {
    try {
        const dbTypes = await Type.findAll();
        if(dbTypes.length === 0) 
        {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=20&limit=40');
        const apiTypesData = await Promise.all(response.data.results.map(async (pokemon) => {
            const pokemonUrl = await axios.get(pokemon.url);
            return pokemonUrl.data.types.map(type => type.type.name);
        }));
        const uniqueTypes = [...new Set(apiTypesData.flat())];
        
        for (const type of uniqueTypes) {
            await Type.findOrCreate({ where: { name: type } });
        }
        return uniqueTypes;
    } else {
        return dbTypes;
    }


    } catch (error) {
        console.error(`Error getting types: ${error.message}`);
        throw error;
    }



    
};



  module.exports = {
    getAllTypes
};