// importe le schéma de la sauce
const Sauce = require("../models/Sauce");
// package File System pour gérer l'import et export de fichiers
const fs = require('fs');


// récupération de la liste de toutes les sauces de la base de données
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

//récupération d'une sauce avec son ID
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};


// création d'une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: "sauce enregistrée." }))
    .catch((error) => res.status(400).json({ error }));
};

// modification d'une sauce
exports.modifySauce = (req, res, next) => {

  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

  } : {...req.body};
  if (req.file){
    Sauce.findOne({ _id: req.params.id })
    .then(sauce =>{
      const filename = sauce.imageUrl.split('/images/') [1];
      console.log(filename);
      fs.unlink(`images/${filename}`, () => {
        console.log(`images/${filename} a été supprimée`);
      })
    })
  }
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié! " }))
    .catch((error) => res.status(400).json({ error }));
};

// suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/') [1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
    .catch((error) => res.status(400).json({ error }));
      });
    })
   .catch(error => res.status(500).json({error})); 
};

// Gestion des like / dislike
exports.likeStatus = (req, res, next) => {

// pour ajouter / supprimer un like ou un dislike à une sauce :
// On récupère les données de l'id utilisateur et les paramètres de la sauce
  let like = req.body.like;
  let userId = req.body.userId;
  let sauceId = req.params.id;

//Si l'utilisteur like : 
  if (like === 1) {
    // on met à jour la sauce
    Sauce.updateOne (
      { _id : sauceId},
      { // on ajoute un utilisateur au tableau 'usersLiked'
        $push: { usersLiked : userId},
        // on incrémente le compteur de 1 dans ce même tableau
        $inc: {likes: +1} 
      }
    )
    .then (()=>{ res.status(200).json({message: 'Like ajouté'}) }) 
    .catch((error) => res.status(400).json({error}))
  }
 // Si l'utilisateur dislike : 
  if (like === -1) {
    Sauce.updateOne (
      { _id : sauceId},
      { // on ajoute un utilisateur au tableau 'usersDisliked'
        $push: { usersDisliked : userId},
        // on incrémente le compteur de 1
        $inc: {dislikes : +1}
      }
    )
      .then (()=>{ res.status(200).json({message: 'Dislike ajouté'}) }) 
      .catch((error) => res.status(400).json({error}))
    }
  // Si l'utilisateur annule son like ou dislike :  
  if (like === 0) {
    Sauce.findOne ({ _id: sauceId })
    .then((sauce) => {
      if (sauce.usersLiked.includes(userId)) {
        Sauce.updateOne (
          { _id: sauceId},
          {
            $pull: {usersLiked: userId},
            $inc: {likes: -1}
          }
        )
          .then (()=> res.status(200).json({message: 'Like annulé'}))
          .catch((error) => res.status(400).json({error}))
      }
      if (sauce.usersDisliked.includes(userId)) {
        Sauce.updateOne (
          { _id: sauceId },
          {
            $pull: {usersDisliked: userId},
            $inc: {dislikes: -1}
          }
        )
        .then(() => res.status(200).json({message: 'Dislike annulé'}))
        .catch((error) => res.status(400).json({error}))
      }
    })
    .catch((error) => res.status(404).json({error}))
  }

}

