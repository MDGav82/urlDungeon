const request = require('supertest');
const app = require('../src/app');  // Assure-toi que ton app est exportée depuis src/app.js
const { enigmes } = require('../src/enigmes');  // Ajoute ceci pour accéder à l'état des clés

beforeEach(() => {
  // Réinitialiser toutes les clés
  for (const salle in enigmes) {
    enigmes[salle].trouve = false;
  }
});


describe('API /api/sortie/hall', () => {
  it('devrait retourner un statut 200 et un message de bienvenue', async () => {
    const response = await request(app).get('/api/sortie/hall');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Bienvenue dans le hall du donjon !');
  });
});

describe('API /api/sortie/hall/enigme', () => {
  it('devrait retourner 200 si la réponse est correcte', async () => {
    const response = await request(app)
      .post('/api/sortie/hall/enigme')
      .send({ reponse: 4 });  // La bonne réponse à l'énigme

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Bonne réponse, la clé est maintenant disponible !');
  });

  it('devrait retourner 400 si la réponse est incorrecte', async () => {
    const response = await request(app)
      .post('/api/sortie/hall/enigme')
      .send({ reponse: 5 });  // Mauvaise réponse

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Mauvaise réponse, essaie encore.');
  });
});

describe('API /api/sortie/hall/pieceActuelle', () => {
  it('devrait retourner 200 si toutes les clés sont trouvées', async () => {
    // Simuler que toutes les clés sont trouvées
    await request(app).post('/api/sortie/hall/enigme').send({ reponse: 4 });
    await request(app).post('/api/sortie/salle/maths/enigme').send({ reponse: 144 });
    await request(app).post('/api/sortie/salle/code/enigme').send({ reponse: 'object' });
    await request(app).post('/api/sortie/salle/astronomie/enigme').send({ reponse: 8 });
    await request(app).post('/api/sortie/salle/histoire/enigme').send({ reponse: 1492 });


    const response = await request(app)
      .get('/api/sortie/hall/pieceActuelle');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Vous avez toutes les clés, vous pouvez sortir !');
  });

  it('devrait retourner 400 si une clé manque', async () => {
    const response = await request(app)
      .get('/api/sortie/hall/pieceActuelle');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Il manque des clés, vous ne pouvez pas sortir.');
  });
});

//salle des maths
describe('API /api/sortie/salle/maths/enigme', () => {
  it('devrait retourner 200 si la réponse est correcte', async () => {
    const response = await request(app)
      .post('/api/sortie/salle/maths/enigme')
      .send({ reponse: 144 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Bonne réponse, la clé est maintenant disponible !');
  });

  it('devrait retourner 400 si la réponse est incorrecte', async () => {
    const response = await request(app)
      .post('/api/sortie/salle/maths/enigme')
      .send({ reponse: 100 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Mauvaise réponse, essaie encore.');
  });
});

//salle des enigmes
describe('API /api/sortie/salle/code/enigme', () => {
  it('devrait retourner 200 si la réponse est correcte', async () => {
    const response = await request(app)
      .post('/api/sortie/salle/code/enigme')
      .send({ reponse: 'object' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Bonne réponse, la clé est maintenant disponible !');
  });

  it('devrait retourner 400 si la réponse est incorrecte', async () => {
    const response = await request(app)
      .post('/api/sortie/salle/code/enigme')
      .send({ reponse: 'undefined' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Mauvaise réponse, essaie encore.');
  });
});

//salle de l'astronomie
describe('API /api/sortie/salle/astronomie/enigme', () => {
  it('devrait retourner 200 si la réponse est correcte', async () => {
    const response = await request(app)
      .post('/api/sortie/salle/astronomie/enigme')
      .send({ reponse: 8 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Bonne réponse, la clé est maintenant disponible !');
  });

  it('devrait retourner 400 si la réponse est incorrecte', async () => {
    const response = await request(app)
      .post('/api/sortie/salle/astronomie/enigme')
      .send({ reponse: 9 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Mauvaise réponse, essaie encore.');
  });

});

//salle de l'histoire
describe('API /api/sortie/salle/histoire/enigme', () => {
  it('devrait retourner 200 si la réponse est correcte', async () => {
    const response = await request(app)
      .post('/api/sortie/salle/histoire/enigme')
      .send({ reponse: 1492 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Bonne réponse, la clé est maintenant disponible !');
  });

  it('devrait retourner 400 si la réponse est incorrecte', async () => {
    const response = await request(app)
      .post('/api/sortie/salle/histoire/enigme')
      .send({ reponse: 1493 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Mauvaise réponse, essaie encore.');
  });
});

