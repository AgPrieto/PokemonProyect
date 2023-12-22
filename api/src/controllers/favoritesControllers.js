const { Favorites } = require('../db');

const postFav = async (id, name, image, hp, attack, defense, speed, height, weight, types) => {
    try {
        const existingFavorite = await Favorites.findOne({ where: { name: name } });
        if (existingFavorite) {
            return { error: 'El favorito ya existe.' };
        }

        const newFavorite = await Favorites.create({
            id, name, image, hp, attack, defense, speed, height, weight, types
        });

        const allFavorites = await Favorites.findAll();

        return allFavorites;
    } catch (error) {
        console.error(`Error posting pokemon: ${error.message}`);
        throw error;
    }
};

const deleteFav = async (id) => {
    try {
        const favoriteToDelete = await Favorites.findOne({ where: { id: id } });

        if (!favoriteToDelete) {
            return { error: 'Favorite doesnt exist' };
        }

        await Favorites.destroy({ where: { id: id } });

        const allFavorites = await Favorites.findAll();
        return allFavorites;

    } catch (error) {
        console.error(`Error deleting favorite: ${error.message}`);
        throw error;
    }
};

const getFavorites = async () => {
    try {
        const favorites = await Favorites.findAll();
        return favorites;  
    } catch (error) {
        console.error(`Error getting favorites: ${error.message}`);
        throw error;
    }
};


module.exports = {
    postFav,
    deleteFav,
    getFavorites
};