const langSwitcher = document.querySelector(".lang-switcher");
const html2 = document.querySelector("html");
const i18n = document.querySelectorAll(".i18n");
let tous = "";
let h21 = "";
let h22 = "";
let h23 = "";
let h23b = "";
let h24 = "";
let h25 = "";
let plus = "";

// traductions
let fr = [
  { switch: "English" },
  { title: "Journal de Hossam Al&#x2011;Madhoun" },
  { subtitle: "Relayé par l'<a href=' / '>AFPS Dinan" },
  { homeLink: "Accueil" },
  { actionsLink: "Nos actions" },
  { comprendreLink: "S'informer" },
  { linksLink: "Liens" },
  { livresLink: "Livres" },
  { contactLink: "Contact / Adhésion" },
  {
    advert:
      "Hossam est gazaoui, comédien, metteur en scène, directeur et fondateur du \"Theater for Everybody\", ami de Jonathan (de l'AFPS Dinan), il envoie à ses proches des lettres régulières depuis début octobre 2023, un livre contenant ses premiers récits a été publié fin 2023,  <a target='_blank' href='https://www.librairielegrenier.com/livre/23508413-je-vous-ecris-de-gaza-sous-les-bombes-journal-octobre-decembre-2023-al-madhoun-hossam-cerisier'>cliquez ici pour le trouver</a>.  Voici la suite des lettres de Hossam:",
  },

  { oldest: "Voir les plus anciens en premier" },
  { newest: "Voir les plus récents en premier" },
  {
    footer:
      "<a target='_blank'  href='/assets/Voix du théâtre Al-Madhoun.pdf'><span class='no-display'>Cliquez pour </span><span class='maj-display'>l</span>ire l'article de Jonathan Daitch sur Hossam dans VOIX DU THÉÂTRE EN PALESTINE</a>",
  },
  { back: "Retour" },
];

let en = [
  { switch: "Français" },
  { title: "Hossam Al&#x2011;Madhoun's Gaza Journals" },
  { subtitle: "By <a href=' / ''>AFPS Dinan" },
  { homeLink: "Home" },
  { actionsLink: "Our actions" },
  { comprendreLink: "Get info" },
  { linksLink: "Links" },
  { livresLink: "Books" },
  { contactLink: "Contact us/ Join us" },
  {
    advert:
      'Hossam is a Gazan, actor, director, director and founder of "Theater for Everybody", a friend of Jonathan (of AFPS Dinan), he has been sending regular letters to his family and friends since the beginning of October 2023, a book containing his first stories was published at the end of 2023, click here to find it. Here is a continuation of Hossam\'s letters:',
  },

  { oldest: "See old first" },
  { newest: "See new first" },
  {
    footer:
      "<a target='_blank'  href='../assets/documents/Acting Out Al-Madhoun.pdf'><span class='no-display'>Click here to </span><span class='maj-display'>r</span>ead about Hossam in Jonathan Daitch's book &quot;VOIX DU THÉÂTRE EN PALESTINE&quot;</a>",
  },
  { back: "Back" },
];

// choix de la langue dans localStorage
if (!localStorage.getItem("lang")) {
  localStorage.setItem("lang", "fr");
}
const chosenLang = localStorage.getItem("lang");

//event pour chargement ou changement de la langue
window.addEventListener("load", setLang, true);
langSwitcher.addEventListener("click", switchLang);

//au load
function setLang() {
  html2.setAttribute("lang", chosenLang);
  if (html2.getAttribute("lang") === "fr") {
    tous = "Voir tous";
    h21 = "Tous les";
    h22 =
      "Une petite erreur s'est produite. Vous pouvez effectuer une autre sélection ou visualiser l'ensemble des oeuvres grâce au menu déroulant ci-dessus.";
    h23 = "les";
    h23b = "l'";
    h24 = "de";
    h25 = "";
    plus = "Lire&#xA0;plus";

    writeInFrench();
  } else if (html2.getAttribute("lang") === "en") {
    tous = "See all";
    h21 = "The";
    h22 = "Sorry it seems there is a problem, please try again.";
    h23 = "";
    h23b = "one";
    h24 = "written in";
    h25 = "written";
    plus = "Read&#xA0;more";

    writeInEnglish();
  }
}

//au switch
function switchLang() {
  if (html2.getAttribute("lang") === "fr") {
    html.setAttribute("lang", "en");
    document.title = "Hossam Al-Madhoun's Gaza Journals";
    localStorage.setItem("lang", "en");

    tous = "See all";
    h21 = "The";
    h22 = "Sorry it seems there is a problem, please try again.";
    h23 = "";
    h23b = "one";
    h24 = "written in";
    h25 = "written:";
    plus = "Read&#xA0;more";

    writeInEnglish();
  } else {
    html2.setAttribute("lang", "fr");
    document.title = "Journal de Hossam Al-Madhoun";
    localStorage.setItem("lang", "fr");
    tous = "Voir tous";
    h21 = "Tous les";
    h22 = "Une petite erreur s'est produite. Essayez à nouveau.";
    h23 = "les";
    h23b = "l'";
    h24 = "de";
    h25 = "lettre du";
    plus = "Lire&#xA0;plus";

    localStorage.setItem("lang", "fr");
    writeInFrench();
  }
}
function writeInFrench() {
  i18n.forEach((element) => {
    let attribut = element.getAttribute("data-i18n");
    let objetCorrespondant = fr.find(
      (item) => Object.keys(item)[0] === attribut
    );
    if (objetCorrespondant) {
      let valeur = Object.values(objetCorrespondant)[0];
      element.innerHTML = valeur;
    }
  });

  initBlog();
}

function writeInEnglish() {
  i18n.forEach((element) => {
    let attribut = element.getAttribute("data-i18n");
    let objetCorrespondant = en.find(
      (item) => Object.keys(item)[0] === attribut
    );
    if (objetCorrespondant) {
      let valeur = Object.values(objetCorrespondant)[0];
      element.innerHTML = valeur;
    }
  });

  initBlog();
}
