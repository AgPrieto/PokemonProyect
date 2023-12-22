const express = require('express');
const favoritesRouter = express.Router();
const { postFav, deleteFav, getFavorites} = require('../controllers/favoritesControllers');

favoritesRouter.post('/', async (req, res) => {
    try {
        const { id, name, image, hp, attack, defense, speed, height, weight, types } = req.body;

        if (!id || !name || !image || !hp || !attack || !defense || !speed || !height || !weight) {
            throw Error('Must provide more information');
        } else {
            const newFavorite = await postFav(id, name, image, hp, attack, defense, speed, height, weight, types);
            return res.status(200).json(newFavorite);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

favoritesRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const destroyFav = await deleteFav(id); 
        res.status(200).json(destroyFav);
    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


favoritesRouter.get('/', async (req, res) => {
    try {
        const favorites = await getFavorites();
        res.status(200).json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});











module.exports = favoritesRouter;