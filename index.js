const server = require('./server');
const {PORT} = require('./config');

server.listen(PORT, ()=>{
    console.log('CoddingApp backend on port ' + PORT);
});