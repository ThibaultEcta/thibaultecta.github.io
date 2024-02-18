function gererAffichageChanteurs() {
  var pisteVoix = document.getElementById("pisteVoix").value;
  var ligneNombreChanteurs = document.getElementById("ligneNombreChanteurs");

  if (pisteVoix === "oui") {
    ligneNombreChanteurs.style.display = "block";
  } else {
    ligneNombreChanteurs.style.display = "none";
  }
}

function calculerDevis() {
  // Obtenez les valeurs sélectionnées par l'utilisateur
  var genre = document.getElementById("genre").value;
  var duree = parseFloat(document.getElementById("duree").value);
  var nombrePistes = parseInt(document.getElementById("nombrePistes").value);
  var qualiteMix = parseFloat(document.getElementById("qualiteMix").value);
  var pisteVoix = document.getElementById("pisteVoix").value;
  var nombreChanteurs = parseInt(
    document.getElementById("nombreChanteurs").value
  );

  // Effectuez le calcul du devis en fonction des paramètres
  var tarifGenre = 2; // Tarif par défaut
  if (genre === "pop" || genre === "hip-hop") {
    tarifGenre = 0.15;
  }

  var devis =
    duree * 2 + nombrePistes * 2 + qualiteMix * 5 * duree + tarifGenre * duree;

  if (pisteVoix === "oui") {
    document.getElementById("ligneNombreChanteurs").style.display = "block";
    // Vérifiez si le nombre de chanteurs est supérieur à 0
    if (nombreChanteurs > 0) {
      devis += nombreChanteurs * 4 * duree; // Supplément par chanteur par minute
    }
  } else {
    document.getElementById("ligneNombreChanteurs").style.display = "none";
  }

  // Affichez le devis en temps réel
  document.getElementById("devis").textContent = devis + " €";

  // Afficher le bouton "Envoyer mon devis à Thibault_Ecta"
  document.getElementById("boutonEnvoyerDevis").style.display = "block";
}

function envoyerDevis() {
  // Récupérez le devis calculé
  var devis = document.getElementById("devis").textContent;
  // Ouvrez un nouvel e-mail prérempli avec le destinataire et le sujet
  var emailLink =
    "mailto:thibaultgirard297@gmail.com?subject=Devis Musique&body=Devis%20calculé%3A%20" +
    devis;
  window.open(emailLink, "_blank"); // Ouvre un nouvel onglet
}
