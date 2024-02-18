function gererAffichageChanteurs() {
  const pisteVoix = document.getElementById("pisteVoix").value;
  const ligneNombreChanteurs = document.getElementById("ligneNombreChanteurs");

  if (pisteVoix === "oui") {
    ligneNombreChanteurs.style.display = "block";
  } else {
    ligneNombreChanteurs.style.display = "none";
  }
}

function calculerPrix() {
  const genre = document.getElementById("genre").value;
  const duree = parseFloat(document.getElementById("duree").value);
  const nombrePistes = parseInt(document.getElementById("nombrePistes").value);
  const qualiteMix = parseFloat(document.getElementById("qualiteMix").value);
  const pisteVoix = document.getElementById("pisteVoix").value;
  const nombreChanteurs = parseInt(
    document.getElementById("nombreChanteurs").value,
  );

  // Calcul du devis en fonction des paramètres
  let tarifGenre = 2; // Tarif par défaut
  if (genre === "pop" || genre === "hip-hop") {
    tarifGenre = 0.15;
  }

  let devis =
    duree * 2 + nombrePistes * 2 + qualiteMix * 5 * duree + tarifGenre * duree;

  if (pisteVoix === "oui" && nombreChanteurs > 0) {
    devis += nombreChanteurs * 4 * duree; // Supplément par chanteur par minute
  }

  return devis;
}

function calculerDevis() {
  // Affichage du prix en temps réel
  const prix = calculerPrix();
  document.getElementById("devis").style.display = "block";
  document.getElementById("prix").textContent = prix + " €";
}

function envoyerDevis() {
  const prix = calculerPrix();

  const emailBody = `Prix du devis calculé: ${prix} €`;

  // E-mail prérempli avec le destinataire et le sujet.
  const emailLink = `mailto:thibaultgirard297@gmail.com?subject=Devis Musique&body=${encodeURIComponent(emailBody)}`;

  window.open(emailLink, "_blank"); // Ouvre un nouvel onglet
}
