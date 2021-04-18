const http = require('http');

const routes = require('./routes'); //this will look for module.exports in routes.js

console.log(routes.someText);

const server = http.createServer(routes.handler);

server.listen(3000)