const TARIF_DUREE = 2;
const TARIF_PISTE = 2;
const TARIF_QUALITE_PAR_MINUTE = 5;
const TARIF_CHANTEUR_PAR_MINUTE = 4;

const TARIF_GENRE = 2;
const TARIF_REDUIT_GENRE = 0.15;

const genres = [
  {
    id: "rock",
    label: "Rock",
    tarif: TARIF_GENRE,
  },
  {
    id: "pop",
    label: "Pop",
    tarif: TARIF_REDUIT_GENRE,
  },
  {
    id: "hip-hop",
    label: "Hip-hop",
    tarif: TARIF_REDUIT_GENRE,
  },
  {
    id: "acoustique",
    label: "Acoustique",
    tarif: TARIF_GENRE,
  },
  {
    id: "electro",
    label: "Electro",
    tarif: TARIF_GENRE,
  },
  {
    id: "autre",
    label: "Autre",
    tarif: TARIF_GENRE,
  },
];

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
  const qualiteMix = parseInt(document.getElementById("qualiteMix").value);
  const pisteVoix = document.getElementById("pisteVoix").value;
  const nombreChanteurs = parseInt(
    document.getElementById("nombreChanteurs").value,
  );

  // Calcul du devis en fonction des paramètres
  let tarifGenreParMinute =
    genres.find((g) => g.id === genre)?.tarif ?? TARIF_GENRE;

  let devis =
    duree * TARIF_DUREE +
    nombrePistes * TARIF_PISTE +
    qualiteMix * duree * TARIF_QUALITE_PAR_MINUTE +
    duree * tarifGenreParMinute;

  if (pisteVoix === "oui" && nombreChanteurs > 0) {
    // Supplément par chanteur par minute
    devis += nombreChanteurs * duree * TARIF_CHANTEUR_PAR_MINUTE;
  }

  return devis;
}

function calculerDevis() {
  // Affichage du prix en temps réel
  const prix = calculerPrix();
  document.getElementById("devis").style.display = "block";
  document.getElementById("prix").textContent = prix + " €";
}

function envoyerDevis(e) {
  e.preventDefault();

  const form = e.target;
  const params = new URLSearchParams(new FormData(form));
  const url = form.action + "?" + params.toString();

  const prix = calculerPrix();

  // prettier-ignore
  const emailBody =
`Prix du devis calculé: ${prix} €

Lien vers le devis: ${url}`;

  // E-mail prérempli avec le destinataire et le sujet.
  const emailLink = `mailto:thibaultgirard297@gmail.com?subject=Devis Musique&body=${encodeURIComponent(emailBody)}`;

  window.open(emailLink, "_blank"); // Ouvre un nouvel onglet
}

const genreSelect = document.getElementById("genre");
genres.forEach((genre) => {
  const option = document.createElement("option");
  option.value = genre.id;
  option.textContent = genre.label;
  genreSelect.appendChild(option);
});

const params = new URLSearchParams(window.location.search);

// Pré-remplissage des champs avec les paramètres de l'URL
if (params.size > 0) {
  document.getElementById("genre").value = params.get("genre");
  document.getElementById("duree").value = params.get("duree");
  document.getElementById("nombrePistes").value = params.get("nombrePistes");
  document.getElementById("qualiteMix").value = params.get("qualiteMix");
  document.getElementById("pisteVoix").value = params.get("pisteVoix");
  document.getElementById("nombreChanteurs").value =
    params.get("nombreChanteurs");
}
