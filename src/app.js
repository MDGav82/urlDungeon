const express = require('express');
const { verifierReponse, verifierCles } = require('./enigmes');
const app = express();

app.use(express.json());

app.get('/api/sortie/hall', (req, res) => {
  res.status(200).json({ message: 'Bienvenue dans le hall du donjon !' });
});

// Route pour résoudre l'énigme du hall
app.post('/api/sortie/hall/enigme', (req, res) => {
  const { reponse } = req.body;
  const resultat = verifierReponse('hall', reponse);

  if (resultat.success) {
    res.status(200).json(resultat);  // Si la réponse est correcte
  } else {
    res.status(400).json(resultat);  // Si la réponse est incorrecte
  }
});

app.get('/api/sortie/hall/pieceActuelle', (req, res) => {
  if (verifierCles()) {
    res.status(200).json({ message: 'Vous avez toutes les clés, vous pouvez sortir !' });
  } else {
    res.status(400).json({ message: 'Il manque des clés, vous ne pouvez pas sortir.' });
  }
});

app.post('/api/sortie/salle/maths/enigme', (req, res) => {
  const { reponse } = req.body;
  const resultat = verifierReponse('maths', reponse);

  if (resultat.success) {
    res.status(200).json(resultat);
  } else {
    res.status(400).json(resultat);
  }
});

app.post('/api/sortie/salle/code/enigme', (req, res) => {
  const { reponse } = req.body;
  const resultat = verifierReponse('code', reponse);

  if (resultat.success) {
    res.status(200).json(resultat);
  } else {
    res.status(400).json(resultat);
  }
});

app.post('/api/sortie/salle/astronomie/enigme', (req, res) => {
  const { reponse } = req.body;
  const resultat = verifierReponse('astronomie', reponse);

  if (resultat.success) {
    res.status(200).json(resultat);
  } else {
    res.status(400).json(resultat);
  }
});

app.post('/api/sortie/salle/histoire/enigme', (req, res) => {
  const { reponse } = req.body;
  const resultat = verifierReponse('histoire', reponse);

  if (resultat.success) {
    res.status(200).json(resultat);
  } else {
    res.status(400).json(resultat);
  }
});


module.exports = app;

