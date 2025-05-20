const express = require('express');
const { verifierReponse, verifierCles } = require('./enigmes');
const app = express();

app.use(express.json());

// Routes sous /api/sortie
app.get('/api/sortie/hall', (req, res) => {
  res.status(200).json({ message: 'Bienvenue dans le hall du donjon !' });
});

app.post('/api/sortie/hall/enigme', (req, res) => {
  const { reponse } = req.body;
  const resultat = verifierReponse('hall', reponse);

  res.status(resultat.success ? 200 : 400).json(resultat);
});

app.get('/api/sortie/hall/pieceActuelle', (req, res) => {
  if (verifierCles()) {
    res.status(200).json({ message: 'Vous avez toutes les clés, vous pouvez sortir !' });
  } else {
    res.status(400).json({ message: 'Il manque des clés, vous ne pouvez pas sortir.' });
  }
});

app.post('/api/sortie/salle/maths/enigme', (req, res) => {
  const resultat = verifierReponse('maths', req.body.reponse);
  res.status(resultat.success ? 200 : 400).json(resultat);
});

app.post('/api/sortie/salle/code/enigme', (req, res) => {
  const resultat = verifierReponse('code', req.body.reponse);
  res.status(resultat.success ? 200 : 400).json(resultat);
});

app.post('/api/sortie/salle/astronomie/enigme', (req, res) => {
  const resultat = verifierReponse('astronomie', req.body.reponse);
  res.status(resultat.success ? 200 : 400).json(resultat);
});

app.post('/api/sortie/salle/histoire/enigme', (req, res) => {
  const resultat = verifierReponse('histoire', req.body.reponse);
  res.status(resultat.success ? 200 : 400).json(resultat);
});

module.exports = app;
