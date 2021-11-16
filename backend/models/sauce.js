const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
//User Id du créateur du post 'sauce'.
userId: { type: String, required: true },
//Nom de la sauce.
name: { type: String, required: true },
//Marque de la sauce.
manufacturer: { type: String, required: true },
//Description de la sauce.
description: { type: String, required: true },
//Ingredients de la sauce.
mainPepper: { type: String, required: true },
//Url de l'image de la sauce.
imageUrl: { type: String, required: true },
//Degré de piquant de la sauce.
heat: { type: Number, required: true },
//Likes pour la sauce.
likes: { type: Number, default: 0 },
//Dislikes pour la sauce.
dislikes: { type: Number, default: 0 },
// Utilisateurs  ayant liké la sauce.
usersLiked: { type: [String], default: [] },
//Utilisateurs ayant disliké la sauce.
usersDisliked: { type: [String], default: [] }
});

module.exports = mongoose.model('Sauce', sauceSchema);