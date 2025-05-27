// Ne plus utiliser etatDesCles séparément

const enigmes = {
  hall: {
    question: 'Quel est 2 + 2 ?',
    reponse: 4,
    trouve: false
  },
  maths: {
    question: 'Quel est le résultat de 12 x 12 ?',
    reponse: 144,
    trouve: false
  },
  code: {
    question: 'Que retourne typeof null en JavaScript ?',
    reponse: 'object',
    trouve: false
  },
  astronomie: {
    question: 'Combien de planètes y a-t-il dans le système solaire ?',
    reponse: 8,
    trouve: false
  },
  histoire: {
    question: 'En quelle année Christophe Colomb a-t-il découvert l’Amérique ?',
    reponse: 1492,
    trouve: false
  }
};



const verifierReponse = (salle, reponse) => {
  const enigme = enigmes[salle];
  
  if (enigme && String(reponse).trim().toLowerCase() === String(enigme.reponse).toLowerCase()) {
    enigme.trouve = true;
    return { success: true, message: 'Bonne réponse, la clé est maintenant disponible !' };
  }

  return { success: false, message: 'Mauvaise réponse, essaie encore.' };
};

// ✅ Nouvelle version : check directement les flags 'trouve'
const verifierCles = () => {
  return Object.values(enigmes).every(enigme => enigme.trouve);
};

module.exports = { enigmes, verifierReponse, verifierCles };
