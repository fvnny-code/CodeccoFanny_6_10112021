const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Sauce = require('./models/sauce');

const app = express();

mongoose.connect('mongodb+srv://fvnny-code:Pipite@cluster1piiquante.aojie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à la base de données réussie !'))
  .catch(() => console.log('La connexion à la base de données a échoué !'));


 

//  Gestion du Cross Origins Ressource Sharing
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH,OPTIONS");
  next();
});

app.use(bodyParser.json());

app.post('/models/sauce', (req, res, next)=> {
delete req.body._id;
const sauce = new Sauce ({
  ...req.body
});
sauce.save()
.then(()=> res.status(201).json({ message:'sauce enregistrée.'}))
.catch(error =>res.status(400).json ({error}));
});

app.get('/models/sauce/:id', (req, res, next)=>{
  Sauce.findOne({_id: req.params.id})
  .then(thing =>res.status(200).json(sauce))
  .catch(error => res.status(404).json({error}));
});

app.get('/models/sauce', (req, res, next)=> {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error =>res.status(400).json({error}));
});

module.exports = app;
