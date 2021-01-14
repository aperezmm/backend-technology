const express = require('express');
const server = express();
const cors = require('cors'); //Evita que los request de Angular sean bloqueados
const {Technology} = require('../models');

server.use(express.json());
server.use(express.static(__dirname + '/../public')); //Pone la carpeta publica de forma estatica
server.use(cors());

//TODAS LAS TECNOLOGIAS
server.get('/api/technologies', async (req, res) => {
    let technologies = await Technology.find(); //Se pone en variable let porque la vamos afectar con la imagen 
    technologies = technologies.map((technology) => {
        technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
        return technology;
    });
    return res.send({
        error:false,
        data: technologies
    })
});

server.get('/api/technology/:id', async(req, res) => {
    const {id} = req.params;
    let technology = await Technology.findById(id);
    technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;

    return res.send({
        error: false,
        data: technology
    })
});

server.get('/api/technology/search/:name', async(req, res) => {
    const {name} = req.params;
    let technologies = await Technology.find({
        name: { $regex: new RegExp(name, "i")}
    });
    technologies = technologies.map(technology =>{
        technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
        return technology
    });
    
    return res.send({
        error:false,
        data: technologies
    });
});

module.exports = server;