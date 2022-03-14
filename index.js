const http = require('http');
const app = require('./app');
const normalizePort = val =>{
    const port = parseInt(val,10);
    if(!isNaN(port)) return val;
    else if(port > 0) return port;
    else return null;
}
const port = normalizePort('3030' || process.env.PORT);
app.set('port',port);
const server = http.createServer(app);
server.listen(port);
console.log('le serveur est en ecoute en '+port);