// si on est connecté on affiche une div
const modal = document.getElementById("modal");
const update = document.getElementById("updates");
const close = document.getElementById("close");
const deleteBtn = document.getElementById("button-delete");
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
                document.querySelector(".galleryModal").innerHTML = ""; // Effacement de l'élément HTML avec la classe .galleryModall
                // Boucle pour afficher tous les projets
                for (let j = 0; j <= dt.length - 1; j++) {
                    displayProject(dt[j]); // Appel de la fonction displayProject pour afficher les informations sur chaque projet
                }
            });
        }
    }).catch((err) => {
        console.error(err);
    });

}

update.addEventListener("click", displayAllModal);




//quand on clique sur ajouter une photo on passe au content suivant modal
const add = document.getElementById("button-add");
const content = document.getElementById("modal-content");
const content2 = document.getElementById("next-modal-container");
const close2 = document.getElementById("close2");

add.addEventListener("click", function() {
    content.style.display = "none";
    content2.style.display = "block";
});

//quand on clique sur retour on passe au content précédent modal
const back = document.getElementById("back");
back.addEventListener("click", function() {
    content.style.display = "block";
    content2.style.display = "none";
});

//quand on clique sur fermer on ferme la modal
close2.addEventListener("click", function() {
    modal.style.display = "none";
});

window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        modal.style.display = "none";
    }
});



// Fonction pour supprimer un projet
function deleteProject(id) {
    fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    }).then((result) => {
        if (result.ok) {
            result.json().then((dt) => {
                console.log(dt);
                document.getElementById("A" + id).remove();
            });
        }
    }).catch((err) => {
        console.error(err);
    });
}

// Suppression d'un projet
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("fa-trash-can")) {
        deleteProject(e.target.id);
    }
});

// Fonction pour ajouter un projet
function addProject() {
    const form = document.getElementById("form");
    const formData = new FormData(form);
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    }).then((result) => {
        if (result.ok) {
            result.json().then((dt) => {
                console.log(dt);
                modal.style.display = "none";
                displayAllModal();
            });
        }
    }).catch((err) => {
        console.error(err);
    });
}

// Ajout d'un projet avec click
document.getElementById("button-add").addEventListener("click", function(e) {
    e.preventDefault();
    addProject();
});