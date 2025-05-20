const enigme = {
  question: 'Quel est 2+2?',
  reponseCorrecte: 4
};

const verifierReponse = (reponse) => {
  if (reponse === enigme.reponseCorrecte) {
    return { message: 'Bonne réponse, la clé est maintenant disponible !' };
  } else {
    return { message: 'Mauvaise réponse, essaie encore.' };
  }
};

module.exports = { verifierReponse };
