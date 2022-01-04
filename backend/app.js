//import du pack Dotenv = masquage des informations de connexion.
require('dotenv').config();

//import d'Expess (framework Node JS)
const express = require("express");
//Import du pack Mongoose : gestion de la base de données
const mongoose = require('mongoose');
//Import de bodyParser : extraction des objets JSON depuis une requête POST
const bodyParser = require("body-parser");

// Import helmet : sécurise les requêtes HTTP, et les failles XSS(cross-site scripting), prévient du détournement de clics (clickjacking), protège contre le reniflement de TYPE MIME(snifing).
const helmet =require("helmet");
// Import nocache : desactive la mise en cache du navigateur
const nocache = require("nocache");

//import des routes vers les sauces
const SaucesRoutes = require("./routes/sauces");
//import des routes utilisateurs
const userRoutes = require('./routes/user');
//Gestion des paths des fichiers et dossiers
const path = require('path');

const app = express();

// connexion à la base de données
const DB_URI = process.env.DB_URI;
mongoose.connect(
    `${DB_URI}`, 
    { useNewUrlParser: true, 
      useUnifiedTopology: true }
    )
  .then(() => console.log("Connexion à la base de données réussie !"))
  .catch((error) => console.log("La connexion à la base de données a échoué !"));

//  Gestion du Cross Origins Ressource Sharing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
//Transforme les données de la requête POST en JSON
app.use(bodyParser.json());

//Mise en place de la protection X-XSS, avec l'activation de filtres de scripts intersites (XSS) dans les navigateurs.
app.use(helmet());

// désactivation de la mise en cache du navigateur
app.use(nocache());

// ROUTES
app.use('/api/sauces', SaucesRoutes);
app.use('/api/auth', userRoutes);
// Gestion des images
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;
