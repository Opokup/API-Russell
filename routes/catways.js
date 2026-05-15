const express = require("express");

const Catway = require("../models/Catway");
const isAuth = require("../middlewares/auth");

const router = express.Router();

// GET ALL CATWAYS

router.get("/", isAuth, async (req, res) => {

  try {

    const catways = await Catway.find();

    res.json(catways);

  } catch (error) {

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

// GET ONE CATWAY

router.get("/:id", isAuth, async (req, res) => {

  try {

    const catway = await Catway.findOne({
      catwayNumber: req.params.id
    });

    if (!catway) {
      return res.status(404).json({
        message: "Catway introuvable"
      });
    }

    res.json(catway);

  } catch (error) {

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

// CREATE CATWAY

router.post("/", isAuth, async (req, res) => {

  try {

    const { catwayNumber, catwayType, catwayState } = req.body;

    const existingCatway = await Catway.findOne({
      catwayNumber
    });

    if (existingCatway) {
      return res.status(400).json({
        message: "Numéro déjà utilisé"
      });
    }

    const catway = new Catway({
      catwayNumber,
      catwayType,
      catwayState
    });

    await catway.save();

    res.status(201).json(catway);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

// UPDATE CATWAY

router.put("/:id", isAuth, async (req, res) => {

  try {

    const catway = await Catway.findOneAndUpdate(
      {
        catwayNumber: req.params.id
      },
      {
        catwayState: req.body.catwayState
      },
      {
        new: true
      }
    );

    if (!catway) {
      return res.status(404).json({
        message: "Catway introuvable"
      });
    }

    res.json(catway);

  } catch (error) {

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

// DELETE CATWAY

router.delete("/:id", isAuth, async (req, res) => {

  try {

    const catway = await Catway.findOneAndDelete({
      catwayNumber: req.params.id
    });

    if (!catway) {
      return res.status(404).json({
        message: "Catway introuvable"
      });
    }

    res.json({
      message: "Catway supprimé"
    });

  } catch (error) {

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

module.exports = router;