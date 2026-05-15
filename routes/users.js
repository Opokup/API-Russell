
const express = require("express");

const User = require("../models/User");
const isAuth = require("../middlewares/auth");

const router = express.Router();

// GET ALL USERS

router.get("/", isAuth, async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

// GET ONE USER


router.get("/:email", isAuth, async (req, res) => {

  try {

    const user = await User.findOne({
      email: req.params.email
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

// CREATE USER

router.post("/", async (req, res) => {

  try {

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email déjà utilisé"
      });
    }

    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    res.status(201).json({
      message: "Utilisateur créé"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

// UPDATE USER

router.put("/:email", isAuth, async (req, res) => {

  try {

    const user = await User.findOneAndUpdate(

      {
        email: req.params.email
      },

      {
        username: req.body.username
      },

      {
        returnDocument: "after"
      }

    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

// DELETE USER

router.delete("/:email", isAuth, async (req, res) => {

  try {

    const user = await User.findOneAndDelete({
      email: req.params.email
    });

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }

    res.json({
      message: "Utilisateur supprimé"
    });

  } catch (error) {

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

module.exports = router;