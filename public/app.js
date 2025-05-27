document.addEventListener("DOMContentLoaded", function () {
  const startEnigmeButton = document.getElementById("startEnigmeButton");
  const enigmesSection = document.getElementById("enigmesSection");
  const enigmeContent = document.getElementById("enigmeContent");
  const backButton = document.getElementById("backButton");
  const enigmeForm = document.getElementById("enigmeForm");
  const enigmeTitle = document.getElementById("enigmeTitle");
  const reponseInput = document.getElementById("reponse");

  afficherCles();

  // Variables pour suivre l'énigme sélectionnée
  let currentSalle = '';

  // Lorsque l'utilisateur clique pour commencer l'énigme du hall
  startEnigmeButton.addEventListener('click', function () {
    console.log("Le bouton a été cliqué !"); // Log ajouté ici

    fetch('/api/sortie/hall/enigme', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reponse: 4 })  // La réponse correcte pour le Hall
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Bonne réponse, la clé est maintenant disponible !') {
        enigmesSection.classList.remove('hidden');
        startEnigmeButton.classList.add('hidden');
      }
    })
    .catch(error => {
      console.error("Erreur de requête fetch :", error); // Ajouter un log pour les erreurs
    });
  });

  // Fonction pour revenir au Hall
  backButton.addEventListener('click', function () {
    enigmeContent.classList.add('hidden');
    enigmesSection.classList.remove('hidden');
    backButton.classList.add('hidden');
  });

  // Fonction pour afficher le formulaire de l'énigme de chaque salle
  function startEnigme(salle) {
  enigmesSection.classList.add('hidden');
  enigmeContent.classList.remove('hidden');
  backButton.classList.remove('hidden');
  currentSalle = salle;

  enigmeTitle.textContent = `Énigme de la Salle : ${salle}`;

  // 🔽 Nouvelle requête pour afficher l’énigme
  fetch(`/api/sortie/salle/${salle}/enigme`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("enigmeQuestion").textContent = data.question;
    });
  }


  // Fonction pour envoyer la réponse
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
        alert('Bonne réponse, vous avez la clé!');
        backButton.classList.add('hidden'); // Retour à la page des énigmes
        enigmesSection.classList.remove('hidden');
        enigmeContent.classList.add('hidden');
        afficherCles();
      } else {
        alert('Mauvaise réponse, essayez encore!');
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


  // Gestion des boutons pour les différentes énigmes
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


