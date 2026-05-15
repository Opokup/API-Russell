require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");


// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const catwayRoutes = require("./routes/catways");
const reservationRoutes = require("./routes/reservations");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.log("Erreur MongoDB :", err));

// Session sécurisée
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store:MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 // 1h
  }
}));

// Routes API

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/catways", catwayRoutes);
app.use("/catways", reservationRoutes);

// Lancement serveur
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});