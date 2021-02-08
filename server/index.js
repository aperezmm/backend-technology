const express = require('express');
const server = express();
const cors = require('cors'); //Evita que los request de Angular sean bloqueados
const {Technology} = require('../models');

server.use(express.json());
server.use(express.static(__dirname + '/../public')); //Pone la carpeta publica de forma estatica
server.use(cors());

//TODAS LAS TECNOLOGIAS
server.get('/api/technologies', async (req, res) => {
    try {
        let technologies = await Technology.find(); //Se pone en variable let porque la vamos afectar con la imagen 
        technologies = technologies.map((technology) => {
        technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
        return technology
        });

        return res.status(200).json(
            technologies
        );
                
    } catch (error) {
        return res.status(404).send({
            "message": "no se ha encontrado ningún framework con esa ID"
        });
    }
});

server.get('/api/technology/:id', async(req, res) => {
    try {
        const {id} = req.params;
        let technology = await Technology.findById(id);
        technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;

        return res.status(200).json(
            technology
        );        
    } catch (error) {
        return res.status(404).send({
            "message": "No se ha encontrado ningún framework con esa ID"
        });
    }
    
});

server.get('/api/technology/search/:name', async(req, res) => {
    try {
        const {name} = req.params;
        let technologies = await Technology.find({
            name: { $regex: new RegExp(name, "i")}
        });
        technologies = technologies.map(technology =>{
        technology.logo = `${req.protocol}://${req.headers.host}/img/${technology.logo}`;
        return technology
    });

    return res.status(200).json(
        technologies
    );
        
    } catch (error) {
        return res.status(404).send({
            "message": "No se ha encontrado ningún framework"
        });
    }
    
});

module.exports = server;