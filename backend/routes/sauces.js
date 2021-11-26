const express = require("express");
const router = express.Router();
const auth = require('../middelware/auth')
const multer = require('../middelware/multer-config');

const sauceController = require("../controllers/sauces");


// Création d'une sauce
router.post("/", auth, multer, sauceController.createSauce);
// Modification d'une sauce
router.put("/:id", auth, multer, sauceController.modifySauce);
// Suppression d'un sauce
router.delete("/:id", auth, sauceController.deleteSauce);
// Récupération de la liste des sauces
router.get("/", auth, sauceController.getAllSauces);
// Récupération d'une sauce spécifique
router.get("/:id", auth, sauceController.getOneSauce);

// Gestion des likes des sauces
router.post('/:id/like', auth, sauceController.likeStatus)


module.exports = router;
