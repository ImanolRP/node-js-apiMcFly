const express = require('express');
const noteController = require('../controllers/noteController');

const api = express.Router();

api.get('/note', noteController.findAll);
api.get('/note/:id', noteController.findById);
api.get('/favorite',noteController.findFavorites);
api.get('/favorite/:id',noteController.markFavorite);

module.exports = api;