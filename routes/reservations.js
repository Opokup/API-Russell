const express = require("express");

const Reservation = require("../models/Reservation");
const Catway = require("../models/Catway");

const isAuth = require("../middlewares/auth");

const router = express.Router();

// GET ALL RESERVATIONS FOR CATWAY

router.get("/:id/reservations", isAuth, async (req, res) => {

  try {

    const reservations = await Reservation.find({
      catwayNumber: req.params.id
    });

    res.json(reservations);

  } catch (error) {

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

// GET ONE RESERVATION

router.get("/:id/reservations/:idReservation", isAuth, async (req, res) => {

  try {

    const reservation = await Reservation.findById(
      req.params.idReservation
    );

    if (!reservation) {
      return res.status(404).json({
        message: "Réservation introuvable"
      });
    }

    res.json(reservation);

  } catch (error) {

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

// CREATE RESERVATION

router.post("/:id/reservations", isAuth, async (req, res) => {

  try {

    const catway = await Catway.findOne({
      catwayNumber: req.params.id
    });

    if (!catway) {
      return res.status(404).json({
        message: "Catway introuvable"
      });
    }

    if (
      new Date(req.body.startDate) >=
      new Date(req.body.endDate)
    ) {
      return res.status(400).json({
        message: "Dates invalides"
      });
    }

    const reservation = new Reservation({

      catwayNumber: req.params.id,

      clientName: req.body.clientName,

      boatName: req.body.boatName,

      startDate: req.body.startDate,

      endDate: req.body.endDate
    });

    await reservation.save();

    res.status(201).json(reservation);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

// UPDATE RESERVATION

router.put("/:id/reservations/:idReservation", isAuth, async (req, res) => {

  try {

    const reservation = await Reservation.findByIdAndUpdate(

      req.params.idReservation,

      req.body,

      {
        new: true
      }
    );

    if (!reservation) {
      return res.status(404).json({
        message: "Réservation introuvable"
      });
    }

    res.json(reservation);

  } catch (error) {

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

// DELETE RESERVATION

router.delete("/:id/reservations/:idReservation", isAuth, async (req, res) => {

  try {

    const reservation = await Reservation.findByIdAndDelete(
      req.params.idReservation
    );

    if (!reservation) {
      return res.status(404).json({
        message: "Réservation introuvable"
      });
    }

    res.json({
      message: "Réservation supprimée"
    });

  } catch (error) {

    res.status(500).json({
      message: "Erreur serveur"
    });
  }
});

module.exports = router;