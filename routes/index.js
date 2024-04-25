const express = require('express');
const roomsRoutes = require('./rooms.routes');
const bookingRoutes = require('./booking.routes');

function routerApi(app){
    const apiRouter = express.Router();
    apiRouter.use('/rooms', roomsRoutes);
    apiRouter.use('/bookings', bookingRoutes);
    app.use('/api', apiRouter);
}

module.exports = routerApi;
