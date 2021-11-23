const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');

const SaucesRoutes = require("./routes/sauces");
const userRoutes = require('./routes/user');

mongoose
  .connect(
    "mongodb+srv://fvnny-code:Pipite@cluster1piiquante.aojie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, 
      useUnifiedTopology: true })
  .then(() => console.log("Connexion à la base de données réussie !"))
  .catch(() => console.log("La connexion à la base de données a échoué !"));

const app = express();

//  Gestion du Cross Origins Ressource Sharing
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

app.use(cors());


app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', SaucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
