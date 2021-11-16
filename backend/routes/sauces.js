const express = require("express");
const router = express.Router();
const Sauce = require("../models/Sauce");

const sauceController = require("../controllers/sauces");

//création d'une sauce
router.post("/", sauceController.createSauce);
//modification d'une sauce
router.put("/:id", sauceController.modifySauce);
// Suppression d'un sauce
router.delete("/:id", sauceController.deleteSauce);
// récupération d'une sauce spécifique
router.get("/:id", sauceController.getOneSauce);
// récupération de la liste des sauces
router.get("/", sauceController.getAllSauces);

module.exports = router;
