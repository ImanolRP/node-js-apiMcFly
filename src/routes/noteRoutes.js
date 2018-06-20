const express = require('express');
const noteController = require('../controllers/noteController');

const api = express.Router();

api.get('/note',noteController.findAll);
api.get('/note/:id',noteController.findById);

module.exports = api;