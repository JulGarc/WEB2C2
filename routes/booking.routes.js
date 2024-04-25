
const express = require('express');
const router = express.Router();
const bookingControllers = require('../controllers/booking.controllers');

router
  .get('/', bookingControllers.getBookings)
  .get('/:codigo', bookingControllers.getBooking)
  .post('/', bookingControllers.createBooking)
  .patch('/:codigo', bookingControllers.updateBooking)
  .delete('/:codigo', bookingControllers.deleteBooking);

module.exports = router;

