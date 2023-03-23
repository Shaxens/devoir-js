require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dbUrl = process.env.DB;

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
    apiGeneration: Number,
    apiResistances: [{
        name: String,
        damage_multiplier: Number,
        damage_relation: String
    }],
    apiEvolutions: [{
        name: String,
        pokedexId: Number
    }],
    apiPreEvolution: String,
    apiResistancesWithAbilities: Array
});

const Pokemon = mongoose.model('pokemonList', pokemonSchema, 'pokemonList');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/assets', express.static('./client/assets'));
app.use('/pages', express.static('./client/pages'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/api/pokemon', (req, res) => {
    Pokemon.find((err, pokemon) => {
        if (err) {
            res.send(err);
        } else {
            res.json(pokemon);
        }
    });
});

app.post('/api/pokemon', (req, res) => {
    const newPokemon = new Pokemon(req.body);
    newPokemon.save((err, pokemon) => {
        if (err) {
            res.send(err);
        } else {
            res.json(pokemon);
        }
    });
});

app.get('/api/pokemon/:id', (req, res) => {
    Pokemon.findOne({ id: req.params.id }, (err, pokemon) => {
        if (err) {
            res.send(err);
        } else {
            res.json(pokemon);
        }
    });
});

app.put('/api/pokemon/:id', (req, res) => {
    Pokemon.findOneAndUpdate({ id: req.params.id }, req.body, { new: true }, (err, pokemon) => {
        if (err) {
            res.send(err);
        } else {
            res.json(pokemon);
        }
    });
});

app.delete('/api/pokemon/:id', (req, res) => {
    Pokemon.findOneAndDelete({ id: req.params.id }, (err, pokemon) => {
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



