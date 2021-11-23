const express = require("express");
const router = express.Router();
const Sauce = require("../models/Sauce");
const auth = require('../middelware/auth')
const multer = require('../middelware/multer-config');


const sauceController = require("../controllers/sauces");


//création d'une sauce
router.post("/", auth, multer, sauceController.createSauce);
//modification d'une sauce
router.put("/:id", auth, multer, sauceController.modifySauce);
// Suppression d'un sauce
router.delete("/:id", auth, sauceController.deleteSauce);
// récupération d'une sauce spécifique
router.get("/:id", auth, sauceController.getOneSauce);
// récupération de la liste des sauces
router.get("/", auth, sauceController.getAllSauces);

module.exports = router;
