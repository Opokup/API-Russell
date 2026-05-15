# API Port de Russell

Application web de gestion des catways et des réservations du port de Russell.

Projet réalisé avec Node.js, Express et MongoDB.

---

## Fonctionnalités

### Authentification
- Connexion utilisateur
- Déconnexion utilisateur
- Sessions sécurisées
- Mots de passe hashés avec bcrypt

### Gestion des utilisateurs
- Créer un utilisateur
- Lister les utilisateurs
- Modifier un utilisateur
- Supprimer un utilisateur

### Gestion des catways
- Créer un catway
- Lister les catways
- Modifier un catway
- Supprimer un catway

### Gestion des réservations
- Créer une réservation
- Lister les réservations
- Modifier une réservation
- Supprimer une réservation

---

## Technologies utilisées

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- express-session
- connect-mongo
- bcrypt

---

## Installation

### Cloner le projet

```bash
git clone <LIEN_GITHUB>
```

### Installer les dépendances

```bash
npm install
```

### Configurer le fichier `.env`

Créer un fichier `.env` :

```env
MONGO_URI=VOTRE_URL_MONGODB
SESSION_SECRET=VOTRE_SECRET
PORT=3000
```

### Lancer le serveur

```bash
node server.js
```

---

## Routes API

### Auth

| Méthode | Route |
|---|---|
| POST | /auth/login |
| GET | /auth/logout |

### Users

| Méthode | Route |
|---|---|
| GET | /users |
| GET | /users/:email |
| POST | /users |
| PUT | /users/:email |
| DELETE | /users/:email |

### Catways

| Méthode | Route |
|---|---|
| GET | /catways |
| GET | /catways/:id |
| POST | /catways |
| PUT | /catways/:id |
| DELETE | /catways/:id |

### Reservations

| Méthode | Route |
|---|---|
| GET | /catways/:id/reservations |
| GET | /catways/:id/reservations/:idReservation |
| POST | /catways/:id/reservations |
| PUT | /catways/:id/reservations/:idReservation |
| DELETE | /catways/:id/reservations/:idReservation |

---

## Frontend

Pages disponibles :

- `/`
- `/dashboard.html`
- `/catways.html`
- `/reservations.html`
- `/users.html`

---

## Données d’exemple

Les fichiers suivants sont disponibles dans le dossier `data/` :

- `catways.json`
- `reservations.json`

---

## Compte de démonstration

```text
Email : admin@russell.com
Mot de passe : admin123
```

---

## Auteur

Océane Deville