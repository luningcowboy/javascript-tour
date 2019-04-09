var express = require('express');
var webApp = express();
var bodyParser = require('body-parser');
webApp.use(bodyParser.urlencoded({extended:true}));
webApp.use(bodyParser.json());

