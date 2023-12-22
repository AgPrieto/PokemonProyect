const { Router } = require('express');
const express = require('express');
const app = express();

const pokemonRouter = require('./pokemonRouter');
const typesRouter = require('./typesRouter');
const favoritesRouter = require('./favoritesRouter');



const router = Router();


app.use('/pokemons', pokemonRouter);
app.use('/types', typesRouter);
app.use('/fav', favoritesRouter);

module.exports = router;
