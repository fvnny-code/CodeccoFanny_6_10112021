//import du pack Dotenv = masquage des informations de connexion.
require('dotenv').config();

//import d'Expess (framework Node JS)
const express = require("express");
//Import du pack Mongoose : gestion de la base de données
const mongoose = require('mongoose');
//Import de bodyParser : extraction des objets JSON depuis une requête POST
const bodyParser = require("body-parser");
//import des routes vers les sauces
const SaucesRoutes = require("./routes/sauces");
//import des routes utilisateurs
const userRoutes = require('./routes/user');
//Gestion des paths des fichiers et dossiers
const path = require('path');

// import du pack CORS pour la gestion des Cross Origins Ressource Sharing
// devenu inutile après mise à jour de Angular et nodeJS
// const cors = require('cors');
// app.use(cors());

// connexion à la base de données
const DB_URI = process.env.DB_URI;
mongoose.connect(
    `${DB_URI}`, 
    { useNewUrlParser: true, useUnifiedTopology: true }
    )
  .then(() => console.log("Connexion à la base de données réussie !"))
  .catch((error) => console.log("La connexion à la base de données a échoué !"));


const app = express();

//  Gestion du Cross Origins Ressource Sharing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Transforme les données de la requête POST en JSON
app.use(bodyParser.json());
// ROUTES
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', SaucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
