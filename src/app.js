const express = require('express');
const cors = require('cors');
const { verifierReponse, verifierCles } = require('./enigmes');
const app = express();
const { enigmes } = require('./enigmes');

app.use(cors()); // Ajout de CORS pour permettre les requêtes entre domaines

app.use(express.static('public'));
app.use(express.json());

// Routes sous /api/sortie

app.get('/api/sortie/hall', (req, res) => {
  res.status(200).json({ message: 'Bienvenue dans le hall du donjon !' });
});

app.post('/api/sortie/hall/enigme', (req, res) => {
  console.log("Requête reçue pour l'énigme du Hall:", req.body); // Vérification de la requête

  const { reponse } = req.body;
  const resultat = verifierReponse('hall', reponse);

  if (resultat.success) {
    res.status(200).json({ message: 'Bonne réponse, la clé est maintenant disponible !' });
  } else {
    res.status(400).json({ message: 'Mauvaise réponse, essaie encore.' });
  }
});

app.get('/api/sortie/hall/pieceActuelle', (req, res) => {
  if (verifierCles()) {
    res.status(200).json({ message: 'Vous avez toutes les clés, vous pouvez sortir !' });
  } else {
    res.status(400).json({ message: 'Il manque des clés, vous ne pouvez pas sortir.' });
  }
});

// Routes pour les autres salles
app.post('/api/sortie/salle/maths/enigme', (req, res) => {
  const resultat = verifierReponse('maths', req.body.reponse);
  if (resultat.success) {
    res.status(200).json({ message: 'Bonne réponse, la clé est maintenant disponible !' });
  } else {
    res.status(400).json({ message: 'Mauvaise réponse, essaie encore.' });
  }
});

app.post('/api/sortie/salle/code/enigme', (req, res) => {
  const resultat = verifierReponse('code', req.body.reponse);
  if (resultat.success) {
    res.status(200).json({ message: 'Bonne réponse, la clé est maintenant disponible !' });
  } else {
    res.status(400).json({ message: 'Mauvaise réponse, essaie encore.' });
  }
});

app.post('/api/sortie/salle/astronomie/enigme', (req, res) => {
  const resultat = verifierReponse('astronomie', req.body.reponse);
  if (resultat.success) {
    res.status(200).json({ message: 'Bonne réponse, la clé est maintenant disponible !' });
  } else {
    res.status(400).json({ message: 'Mauvaise réponse, essaie encore.' });
  }
});

app.post('/api/sortie/salle/histoire/enigme', (req, res) => {
  const resultat = verifierReponse('histoire', req.body.reponse);
  if (resultat.success) {
    res.status(200).json({ message: 'Bonne réponse, la clé est maintenant disponible !' });
  } else {
    res.status(400).json({ message: 'Mauvaise réponse, essaie encore.' });
  }
});

//27/05

app.get('/api/sortie/salle/:salle/enigme', (req, res) => {
  const salle = req.params.salle;
  const enigme = enigmes[salle];
  if (!enigme) {
    return res.status(404).json({ message: "Salle inconnue." });
  }

  res.status(200).json({ question: enigme.question });
});

app.get('/api/sortie/cles', (req, res) => {
  const cles = Object.entries(enigmes).map(([salle, { trouve }]) => ({
    salle,
    trouve
  }));
  res.json({ cles });
});

app.post('/api/sortie/reset', (req, res) => {
  for (const salle in enigmes) {
    enigmes[salle].trouve = false;
  }
  res.status(200).json({ message: 'Le jeu a été réinitialisé.' });
});

app.post('/api/sortie/cles/reset', (req, res) => {
  // Réinitialiser ici l'état des clés (par exemple dans la session ou la base)
  reinitialiserClesPourUtilisateur(req.session.userId);
  res.json({ message: 'Clés réinitialisées' });
});



module.exports = app;
