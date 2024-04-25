const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const routerApi = require('./routes');

dotenv.config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend con NodeJS - Express + CRUD API REST + MySQL, hola mundo');
});

routerApi(app);

app.listen(port, ()=> {
    console.log("Port ==> ", port);
});
