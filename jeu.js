let bonneReponse = "";
let couleurs = ["jaune", "bleu", "rouge", "vert"];

// objet qui associe chaque couleur a son audio
let audios = {
    jaune: document.getElementById("son-jaune"),
    bleu:  document.getElementById("son-bleu"),
    rouge: document.getElementById("son-rouge"),
    vert:  document.getElementById("son-vert")
};

// quand la page charge on joue la bienvenue
window.onload = function() {
    document.getElementById("son-bienvenue").play();
};

function lancer() {

    // si tableau vide on remet tout
    if (couleurs.length === 0) {
        couleurs = ["jaune", "bleu", "rouge", "vert"];

        document.getElementById("jaune").style.display = "block";
        document.getElementById("bleu").style.display  = "block";
        document.getElementById("rouge").style.display = "block";
        document.getElementById("vert").style.display  = "block";
    }

    // choisir une couleur au hasard
    let index = Math.floor(Math.random() * couleurs.length);
    bonneReponse = couleurs[index];

    // afficher la question
    document.getElementById("question").textContent = "Clique sur le " + bonneReponse;
    document.getElementById("message").textContent = "";

    // jouer l audio de la couleur choisie
    audios[bonneReponse].play();
}

function verifier(couleurCliquee) {

    if (bonneReponse === "") return;

    // si la couleur cliquee nest pas dans le tableau on ignore
    if (couleurs.indexOf(couleurCliquee) === -1) return;

    if (couleurCliquee === bonneReponse) {

        document.getElementById(couleurCliquee).style.display = "none";

        // enlever la couleur du tableau
        let i = couleurs.indexOf(couleurCliquee);
        couleurs.splice(i, 1);

        // si tout est trouve on joue seulement son-gagne
        if (couleurs.length === 0) {
            document.getElementById("question").textContent = "Gagné ! Tu as tout trouvé !";
            document.getElementById("message").style.color = "green";
            document.getElementById("message").textContent = "Bravo !";
            document.getElementById("son-gagne").play();
            bonneReponse = "";
            return;
        }

        // sinon on joue son-bravo et on continue
        document.getElementById("message").style.color = "green";
        document.getElementById("message").textContent = "Bravo !";
        document.getElementById("son-bravo").play();

        setTimeout(function() {
            lancer();
        }, 1500);

    } else {

        document.getElementById("message").style.color = "red";
        document.getElementById("message").textContent = "Perdu ! Essaie encore.";
        document.getElementById("son-perdu").play();

        // on melange seulement les formes visibles
        melangerFormes();
    }
}

function melangerFormes() {

    let zone = document.getElementById("zone");

    // on prend seulement les formes encore visibles
    let liste = [];
    for (let i = 0; i < couleurs.length; i++) {
        liste.push(document.getElementById(couleurs[i]));
    }

    // on melange la liste
    for (let i = liste.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = liste[i];
        liste[i] = liste[j];
        liste[j] = temp;
    }

    // on remet les formes dans le nouvel ordre dans la zone
    for (let i = 0; i < liste.length; i++) {
        zone.appendChild(liste[i]);
    }
}