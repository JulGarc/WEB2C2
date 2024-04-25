const express = require('express');
const router = express.Router();
const roomsControllers = require('../controllers/room.controllers');

router
  .get('/', roomsControllers.getRooms)
  .get('/:codigo', roomsControllers.getRoom)
  .post('/', roomsControllers.createRoom)
  .patch('/:codigo', roomsControllers.updateRoom)
  .delete('/:codigo', roomsControllers.deleteRoom);

module.exports = router;