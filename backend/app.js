const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//  Gestion du Cross Origins Ressource Sharing
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//middlewares
app.use(bodyParser.json());

app.post("/api/sauces", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: "Objet créé.",
  });
});

//Tableau des sauces de la base de données
app.use("/api/sauces", (req, res, next) => {
  const sauces = [
    {
      userId: '',
      name: '',
      manufacturer: '',
      description: '',
      mainPepper: '',
      imageUrl: '',
      heat: 1, // nombre entre 1 et 10
      likes: 0, // nombre
      dislikes: 0, //nombre
      usersLiked: [''], // tableau des identifiants d'utilisateurs ayant aimé (=liked) la sauce
      usersDisliked: [''], //tableau des identifiants d'utilisateurs n'pas ayant aimé (=disliked) la sauce
    },
  ];
  res.status(200).json(sauces);
});

module.exports = app;
