const express = require('express');
const noteController = require('../controllers/noteController');

const api = express.Router();

api.get('/note', noteController.findAll);
api.get('/note/:id', noteController.findById);
api.get('/favorite',noteController.findFavorites);
api.put('/favorite/:id',noteController.markFavorite);
api.post('/newNote',noteController.createNote);
api.get('/help', noteController.help);

module.exports = api;