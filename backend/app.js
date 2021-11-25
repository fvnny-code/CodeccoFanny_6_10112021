//import d'Expess (framework Node JS)
const express = require("express");
//Import du pack Mongoose : gestion de la base de données
const mongoose = require("mongoose");
//Import de bodyParser : extraction des objets JSON depuis une requête POST
const bodyParser = require("body-parser");
//Gestion des paths des fichiers et dossiers
const path = require('path');
//import du pack Dotenv = masquage des informations de connexion.
require('dotenv').config();

// import du pack CORS pour la gestion des Cross Origins Ressource Sharing
const cors = require('cors');

// création de l'application Express
const app = express();

//import des routes vers les sauces
const SaucesRoutes = require("./routes/sauces");
//import des routes utilisateurs
const userRoutes = require('./routes/user');


mongoose.connect(
    // process.env.DB_URI,
    'mongodb+srv://fvnny-code:Pipite@cluster1piiquante.aojie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { 
      // useCreateIndex :true,
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    })
  .then(() => console.log("Connexion à la base de données réussie !"))
  .catch((error) => console.log("La connexion à la base de données a échoué !"));



//  Gestion du Cross Origins Ressource Sharing
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

app.use(cors());

//Transforme les données de la requête POST method en JSON
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', SaucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
