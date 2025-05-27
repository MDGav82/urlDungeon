document.addEventListener("DOMContentLoaded", function () {
  const startEnigmeButton = document.getElementById("startEnigmeButton");
  const enigmesSection = document.getElementById("enigmesSection");
  const enigmeContent = document.getElementById("enigmeContent");
  const backButton = document.getElementById("backButton");
  const enigmeForm = document.getElementById("enigmeForm");
  const enigmeTitle = document.getElementById("enigmeTitle");
  const reponseInput = document.getElementById("reponse");

  afficherCles();
  verifierSortieDisponible(); // Vérifie dès le chargement

  let currentSalle = '';

  startEnigmeButton.addEventListener('click', function () {
    fetch('/api/sortie/hall/enigme', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reponse: 4 }) // Réponse au hall
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Bonne réponse, la clé est maintenant disponible !') {
          enigmesSection.classList.remove('hidden');
          startEnigmeButton.classList.add('hidden');
          afficherCles();
          verifierSortieDisponible();
        }
      })
      .catch(error => {
        console.error("Erreur de requête fetch :", error);
      });
  });

  backButton.addEventListener('click', function () {
    enigmeContent.classList.add('hidden');
    enigmesSection.classList.remove('hidden');
    backButton.classList.add('hidden');
  });

  function startEnigme(salle) {
    enigmesSection.classList.add('hidden');
    enigmeContent.classList.remove('hidden');
    backButton.classList.remove('hidden');
    currentSalle = salle;

    enigmeTitle.textContent = `Énigme de la Salle : ${salle}`;

    // ✅ Récupération de la question d'énigme (GET à ajouter côté backend si nécessaire)
    fetch(`/api/sortie/salle/${salle}/enigme`)
      .then(res => res.json())
      .then(data => {
        document.getElementById("enigmeQuestion").textContent = data.question;
      })
      .catch(error => {
        console.error("Erreur lors de la récupération de l'énigme :", error);
      });
  }

  enigmeForm.addEventListener('submit', function (event) {
    event.preventDefault();

    fetch(`/api/sortie/salle/${currentSalle}/enigme`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reponse: reponseInput.value })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Bonne réponse, la clé est maintenant disponible !') {
          alert('Bonne réponse, vous avez la clé !');
          backButton.classList.add('hidden');
          enigmesSection.classList.remove('hidden');
          enigmeContent.classList.add('hidden');
          afficherCles();
          verifierSortieDisponible();
        } else {
          alert('Mauvaise réponse, essayez encore !');
        }
      });
  });

  function afficherCles() {
    fetch('/api/sortie/cles')
      .then(res => res.json())
      .then(data => {
        const clesContainer = document.getElementById("clesListe");
        clesContainer.innerHTML = ''; // Reset

        data.cles.forEach(cle => {
          const item = document.createElement("li");
          item.textContent = `${cle.salle} : ${cle.trouve ? '✅' : '❌'}`;
          clesContainer.appendChild(item);
        });
      });
  }

  function verifierSortieDisponible() {
    fetch('/api/sortie/hall/pieceActuelle')
      .then(res => res.json())
      .then(data => {
        if (data.message.includes('vous pouvez sortir')) {
          document.getElementById("sortieButton").classList.remove("hidden");
        }
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
  const music = document.getElementById("backgroundMusic");
  music.play().catch(error => {
    console.log("Erreur lors de la lecture de la musique :", error);
  });
  });


  document.getElementById("mathsEnigmeButton").addEventListener('click', function () {
    startEnigme('maths');
  });

  document.getElementById("codeEnigmeButton").addEventListener('click', function () {
    startEnigme('code');
  });

  document.getElementById("astronomieEnigmeButton").addEventListener('click', function () {
    startEnigme('astronomie');
  });

  document.getElementById("histoireEnigmeButton").addEventListener('click', function () {
    startEnigme('histoire');
  });
});
