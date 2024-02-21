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

  // Mise en forme pour un prix en EUR et pour le langage du navigateur
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  });

  document.getElementById("devis").style.display = "block";
  document.getElementById("prix").textContent = formatter.format(prix);
}

/**
 * Exemple: https://thibaultecta.github.io/?genre=pop&duree=3&nombrePistes=2&qualiteMix=2&pisteVoix=oui&nombreChanteurs=3
 */
function genererLienDevis() {
  const form = document.getElementById("devis-formulaire");
  const hasDisabledOptionSelected = [...form].some(
    (champ) => champ.selectedOptions?.[0].disabled,
  );

  if (hasDisabledOptionSelected) {
    return;
  }

  const params = new URLSearchParams(new FormData(form));

  return window.location.origin + "?" + params.toString();
}

function montrerMessage(message) {
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;

  // Afficher le snackbar
  snackbar.classList.add("show");

  // Après 3 seconds, supprimer la classe "show" pour cacher le snackbar
  setTimeout(() => snackbar.classList.remove("show"), 3000);
}

/**
 * Copié de https://stackoverflow.com/a/65996386/3970387
 */
async function copyToClipboard(textToCopy) {
  // Navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy);
  } else {
    // Use the 'out of viewport hidden text area' trick
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;

    // Move textarea out of the viewport so it's not visible
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";

    document.body.prepend(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
    } catch (error) {
      alert(error.message);
    } finally {
      textArea.remove();
    }
  }
}

function copierLienDevis() {
  const url = genererLienDevis();

  if (!url) {
    montrerMessage("Veuillez remplir tous les champs du devis.");
    return;
  }

  // Copie dans le presse-papier
  copyToClipboard(url);

  montrerMessage("Lien copié");
}

function envoyerDevis() {
  const prix = calculerPrix();
  const url = genererLienDevis();

  if (!url) {
    montrerMessage("Veuillez remplir tous les champs du devis.");
    return;
  }

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
  const champs = [
    "genre",
    "duree",
    "nombrePistes",
    "qualiteMix",
    "pisteVoix",
    "nombreChanteurs",
  ];

  champs.forEach((champ) => {
    if (params.has(champ)) {
      document.getElementById(champ).value = params.get(champ);
    }
  });

  gererAffichageChanteurs();
  calculerDevis();

  // Empêcher le navigateur de se souvenir de la position du scroll après un rechargement de la page.
  history.scrollRestoration = "manual";

  // Scroll vers le devis, car il est pré-rempli
  document.getElementById("section-devis").scrollIntoView({
    // Animation de scroll
    behavior: "smooth",
    block: "nearest",
  });
}
