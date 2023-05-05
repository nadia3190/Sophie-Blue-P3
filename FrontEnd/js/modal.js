// si on est connecté on affiche une div
const modal = document.getElementById("modal");
const update = document.getElementById("updates");
const close = document.getElementById("close");
//quand on est connecté on affiche le bouton modifier
if (localStorage.getItem("token")) {
    update.style.display = "block";
} else {
    update.style.display = "none";
}

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
function displayProject(works) { // fonction pour afficher les informations sur chaque projet dans le DOM 
    const cards = `
      <figure id ="A${works?.id}">
      <img src="${works?.imageUrl} "crossOrigin="anonymous">
       
        <i id ="${works.id}" class="fa-regular fa-trash-can "></i>
        </div>
             <figcaption>éditer</figcaption>
 </figure>
       `;


    document.getElementById("products").insertAdjacentHTML("beforeend", cards);
}


function displayAllModal() {
    fetch("http://localhost:5678/api/works").then((result) => {
        if (result.ok) {
            result.json().then((dt) => {
                console.log(dt);
                document.querySelector(".galleryModal").innerHTML = ""; // Effacement de l'élément HTML avec la classe .gallery
                // Boucle pour afficher tous les projets
                for (let j = 0; j <= dt.length - 1; j++) {
                    displayProject(dt[j]); // Appel de la fonction info pour afficher les informations sur chaque projet
                }
            });
        }
    }).catch((err) => {
        console.error(err);
    });

}

update.addEventListener("click", displayAllModal);