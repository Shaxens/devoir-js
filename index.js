const { ObjectId } = require('bson');
const axios = require('axios');
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const Type = require('./models/type.model');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dbUrl = process.env.DB;
const apiUrl = process.env.API_URL;

let promise = mongoose.connect(dbUrl,{useNewUrlParser : true, useUnifiedTopology: true})

const pokemonSchema = new mongoose.Schema({
    id: Number,
    pokedexId: Number,
    name: String,
    image: String,
    sprite: String,
    slug: String,
    stats: {
        HP: Number,
        attack: Number,
        defense: Number,
        special_attack: Number,
        special_defense: Number,
        speed: Number
    },
    apiTypes: [{
        name: String,
        image: String
    }],
});

const Pokemon = mongoose.model('pokemonList', pokemonSchema, 'pokemonList');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static('./client/assets'));
app.use('/pages', express.static('./client/pages'));


/************ Pages routes ************/

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/pokemon/:id', async (req, res) => {
    try {
        const response = await axios.get(`${apiUrl}/pokemon/${new ObjectId(req.params.id)}`);
        const pokemon = response.data;
        if (!pokemon) {
            return res.status(404).send('Pokémon non trouvé');
        }
        res.sendFile(__dirname + '/client/pages/details.html')
        } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
        }
    });

    app.get('/add', (req, res) => {
        console.log("coucou")
        res.sendFile(__dirname + '/client/pages/newPokemon.html');
      });


      

/************ Api routes ************/

app.get('/api/pokemon', (req, res) => {
    Pokemon.find((err, pokemon) => {
        if (err) {
            res.send(err);
        } else {
            res.json(pokemon);
        }
    });
});


app.post('/api/add', async (req, res) => {
    try {
      const { name, image, sprite, stats, apiTypes} = req.body;
  
      const newPokemon = new Pokemon({
        _id: new ObjectId,
        name,
        sprite,
        image,
        stats,
        apiTypes
      });
  
      await newPokemon.save();
  
      res.status(201).json(newPokemon);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erreur du serveur');
    }
  });

app.get('/api/types', async (req, res) => {
    try {
        const types = await Type.find({});
        res.json(types);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
    }
});

app.put('/api/pokemon/:id', async (req, res) => {
    const { id } = req.params;
    const { name, sprite, stats, apiTypes } = req.body;
    try {
        const updatedPokemon = await Pokemon.findByIdAndUpdate(
            id,
            {
            name,
            sprite,
            stats,
            apiTypes
            },
            { new: true }
        );
        res.json(updatedPokemon);
        } catch (err) {
        console.error(err);
        res.status(500).send('Erreur serveur');
        }
    });

    app.get('/api/pokemon/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findOne({ _id: new ObjectId(req.params.id) });
        res.json(pokemon);
        } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
        }
    });

    app.delete('/api/pokemon/:id', (req, res) => {
        Pokemon.findOneAndDelete({ _id: req.params.id }, (err, pokemon) => {
            if (err) {
                res.send(err);
            } else {
                res.json(pokemon);
            }
        });
    });
    

promise.then((database) => {
    console.log('Connected');
    app.listen(port, () => {
        console.log(`App listening on port : ${port}`);
    });
    });

promise.catch(err => console.log(err));
