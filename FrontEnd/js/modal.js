// si on est connecté on affiche une div

if (localStorage.getItem("token")) {
    const div = document.getElementById("updates");
    div.style.display = "block";
} else {
    const div = document.getElementById("updates");
    div.style.display = "none";
}
const modal = document.getElementById("modal");
const update = document.getElementById("updates");
const close = document.getElementById("close");

// lorsqu'on click sur modifier on affiche une modal
update.addEventListener("click", function() {
    modal.style.display = "block";
});

// lorsqu'on click sur le bouton close on ferme la modal
close.addEventListener("click", function() {
    modal.style.display = "none";
});

// Quand l'utilisateur clique en dehors du modal, ferme le modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// affichage de produits avec fetch (work) dans la modal
function displayProject(work) { // fonction pour afficher les informations sur chaque projet dans le DOM 
    const card = `
      <figure id ="A${work?.id}">
      <img src="${work?.imageUrl} "crossOrigin="anonymous">
        <figcaption>${work?.title}</figcaption>
      </figure>
            `;

    document.getElementById("products").insertAdjacentHTML("beforeend", card);
}


function displayAllModal() {
    fetch("http://localhost:5678/api/works").then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                console.log(data);
                document.getElementById("products").innerHTML = ""; // Effacement de l'élément HTML avec la classe .gallery
                // Boucle pour afficher tous les projets
                for (let i = 0; i <= data.length - 1; i++) {
                    displayProject(data[i]); // Appel de la fonction info pour afficher les informations sur chaque projet
                }
            });
        }
    }).catch((err) => {
        console.error(err);
    });

}

update.addEventListener("click", displayAllModal);