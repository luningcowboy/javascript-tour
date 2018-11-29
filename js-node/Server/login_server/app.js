global.login = {};
login.client = require('./client');
login.server = require('./server');

login.client.start();
login.server.start();