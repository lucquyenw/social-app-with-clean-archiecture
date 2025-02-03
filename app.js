const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const { expressConfig } = require('./framework/webservers/express');
const { serverConfig } = require('./framework/webservers/server');
const { connection } = require('./framework/database/mongodb/connection');
const { routes } = require('./framework/webservers/routes');

const app = express();
const server = http.createServer(app);

expressConfig(app);

serverConfig(app, mongoose, server, config).startServer();

connection(mongoose, config, {
	connectTimeoutMS: 1000,
}).connectToMongo();

routes(app, express, null);
