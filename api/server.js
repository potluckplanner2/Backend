const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter =  require('./auth/authRouter');
const itemsRouter = require('./items/itemsRouter');
const guestRouter = require('./guests/guestRouter');
const potluckRouter = require('./potluck/potluckRouter');
const validateToken = require('./middleware/validateToken');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api', validateToken, potluckRouter);
server.use('/api', validateToken, itemsRouter);
server.use('/api', validateToken, guestRouter);


server.get('/', (req,res) => res.status(200).json({message: 'API is Running'}));

module.exports = server;