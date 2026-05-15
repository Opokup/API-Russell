module.exports = (req, res, next) => {

  if (!req.session.userId) {
    return res.status(401).json({
      message: "Accès refusé - utilisateur non connecté"
    });
  }

  next();
};