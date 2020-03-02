const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter =  require('./auth/authRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);

server.get('/', (req,res) => res.status(200).json({message: 'API is Running'}));

module.exports = server;