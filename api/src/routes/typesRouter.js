const express = require('express');
const typesRouter = express.Router();
const { getAllTypes } = require('../controllers/typesControllers');

typesRouter.get('/', async (req, res) => {
  try {
    const allTypes = await getAllTypes();
    return res.status(200).json(allTypes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error obtaining Pokemon types' });
  }
});

module.exports = typesRouter;
