// importation d'express
const express = require('express');
//appel du routeur express
const router = express.Router();
// importation du userController
const userController = require('../controllers/user');

// route pour la création d'un utilisateur, 
//avec cryptage du password et ajout de l'utilisateur dans la base de données.
router.post('/signup', userController.signup);
//route du login utilisateur,
// avec vérification des information de l'identifiant, et retour de l'ID utilisateur depuis la base de données + un token JSON.
router.post('/login', userController.login);


module.exports = router;