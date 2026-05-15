const express = require("express");
const User = require("../models/User");

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Tous les champs sont requis"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Identifiants invalides"
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Identifiants invalides"
      });
    }

    req.session.userId = user._id;

    res.json({
      message: "Connexion réussie",
      user: {
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

// LOGOUT
router.get("/logout", (req, res) => {

  req.session.destroy(() => {

    res.clearCookie("connect.sid");

    res.json({
      message: "Déconnexion réussie"
    });
  });
});

module.exports = router;