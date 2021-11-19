const express = require("express");
const router = express.Router();
const Sauce = require("../models/Sauce");

const sauceController = require("../controllers/sauces");
const auth = require('../middelware/auth')

//création d'une sauce
router.post("/", auth, sauceController.createSauce);
//modification d'une sauce
router.put("/:id", auth, sauceController.modifySauce);
// Suppression d'un sauce
router.delete("/:id", auth, sauceController.deleteSauce);
// récupération d'une sauce spécifique
router.get("/:id", auth, sauceController.getOneSauce);
// récupération de la liste des sauces
router.get("/", auth, sauceController.getAllSauces);

module.exports = router;
