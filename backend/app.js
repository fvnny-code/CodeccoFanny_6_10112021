const express = require("express");

const app = express();

//middleware
app.use('/api/sauce', (req, res, next) =>{
  const sauce = [
    {
      userId: '',
      name: 'sauce',
      manufacturer: 'fabricant de la sauce',
      description: 'description dela sauce',
      mainPepper: ' le principal ingrédient épicé de la sauce',
      imageUrl:'',
      heat: 1, // nombre entre 1 et 10
      likes: 0, // nombre
      dislikes: 0, //nombre
      usersLiked: ['userId'], // tableau des identifiants d'utilisateurs ayant aimé (=liked) la sauce
      usersDisliked: ['userdId'], //tableau des identifiants d'utilisateurs n'pas ayant aimé (=disliked) la sauce
    }

  ];
  res.status(200).json(sauce);
})

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



module.exports = app;
