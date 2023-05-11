// si on est connecté on affiche une div
const modal = document.getElementById("modal");
const update = document.getElementById("updates");
const close = document.getElementById("close");
const deleteBtn = document.getElementById("deleteBtn");
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
      <figure id ="M${works?.id}">
      <img src="${works?.imageUrl} "crossOrigin="anonymous">
       
        <i id ="${works.id}" class="fa-regular fa-trash-can "></i>
        </div>
             <figcaption>éditer</figcaption>
      </figure>
       `;
    document.getElementById("products").insertAdjacentHTML("beforeend", cards);
}

function displayAllModal() {

    document.querySelector(".galleryModal").innerHTML = ""; // Effacement de l'élément HTML avec la classe .galleryModall
    // Boucle pour afficher tous les projets
    for (let j = 0; j <= AllProjects.length - 1; j++) {
        displayProject(AllProjects[j]); // Appel de la fonction displayProject pour afficher les informations sur chaque projet
    }

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
        })
        .then((result) => {
            if (result.status === 204) {

                console.log(result);
                AllProjects = AllProjects.filter(element => element.id != id);
                console.log(AllProjects);
                document.getElementById("M" + id).remove(); //supprime le projet dans la modal
                document.getElementById("A" + id).remove(); //supprime le projet dans la page index
            }
        })
        .catch((err) => {
            console.error(err);
        });
}


// Suppression d'un projet
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("fa-trash-can")) {
        deleteProject(e.target.id);
    }
});

//suppression de tous les projets
deleteBtn.addEventListener("click", function() {
    for (let i = 0; i < AllProjects.length; i++) {
        deleteProject(AllProjects[i].id); // supprime tous les projets dans la modal et dans la page index 
    }
});


// Ajout d'un projet
const form = document.getElementById("form");
const title = document.getElementById("title");
const category = document.getElementById("category");
const imageUrl = document.getElementById("imageUrl");
const button = document.getElementById("submit");

button.addEventListener("click", function(e) {
    e.preventDefault();
    const data = {
        title: title.value,
        category: category.value,
        imageUrl: imageUrl.value,
    };
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
    }).then((result) => {
        if (result.ok) {
            result.json().then((dt) => {
                console.log(dt);
                displayProject(dt);
                content.style.display = "block";
                content2.style.display = "none";
            });
        }
    }).catch((err) => {
        console.error(err);
    });
});



// fonction pour enregister une image 
function uploadImage() {
    const file = document.getElementById("imageUrl").files[0];
    const formData = new FormData();
    formData.append("file", file);
    fetch("http://localhost:5678/api/upload", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
    }).then((result) => {
        if (result.ok) {
            result.json().then((dt) => {
                console.log(dt);
                imageUrl.value = dt.imageUrl;
            });
        }
    }).catch((err) => {
        console.error(err);
    });
}
// addEventListener pour enregistrer une image
document.getElementById("submit").addEventListener("change", uploadImage);


//fonction telecharger 





function telecharger() {
    const input = document.getElementById("imageUrl"); //recupere l'input de l'image
    var telecharger_image = "";
    const reader = new FileReader(); //créer un objet FileReader

    // Ajoute un écouteur d'événements pour charger l'image
    reader.addEventListener("load", () => { //quand l'image est chargée on l'affiche dans le background de l'input
        telecharger_image = reader.result; //recupere l'image chargée dans le reader et la stocke dans une variable 
        const photo = document.getElementById("image_telecharger");
        document.getElementById("image_telecharger_images").style.display = "block";

        photo.style.backgroundImage = `url(${telecharger_image} )`; //affiche l'image dans le background de l'input
        document.getElementById("ajout_container").style.display = "none";
    });

    reader.readAsDataURL(this.files[0]); //charge l'image dans le reader
}

// Ajoute un écouteur d'événements pour télécharger les photos
document.getElementById("imageUrl").addEventListener("change", telecharger);

///////////////////Envoi des fichiers a API///////////////////

document.getElementById("submit").addEventListener("click", () => {


    // Récupération des éléments du formulaire
    const photo = document.getElementById("imageUrl");
    const category = document.getElementById("category");
    const title = document.getElementById("title");

    // Vérification que le formulaire est rempli
    if (photo.value === "" || title.value === "" || category.value === "") {
        document.getElementById("Error").innerHTML =
            "Il faut remplir le formulaire.";
    } else {
        document.getElementById("Error").innerHTML = "";

        // Récupération des catégories depuis l'API
        fetch("http://localhost:5678/api/categories").then((res) => {
            console.log(res);
            if (res.ok) {
                res.json().then((categorydata) => {
                    // Parcours de la liste des catégories pour récupérer l'id correspondant à la catégorie sélectionnée
                    for (let i = 0; i <= categorydata.length - 1; i++) {
                        if (category.value === categorydata[i].name) {
                            categorydata[i].name = categorydata[i].id;
                            console.log(categorydata[i].id);
                            console.log(category.value);

                            // Récupération de l'image et du token de l'utilisateur
                            const image = document.getElementById("imageUrl").files[0];
                            let token = localStorage.getItem("token");
                            console.log(`Bearer  ${token}`);
                            const title = document.getElementById("title").value;

                            // Vérification de la taille de l'image
                            if (image.size < 4 * 1048576) {
                                // Création du formulaire pour l'envoi des données
                                const formData = new FormData(); //creation d'un objet de type formdata
                                formData.append("image", image); //ajout de l'image dans le formdata
                                formData.append("title", title); //ajout du titre dans le formdata
                                formData.append("category", categorydata[i].id); //ajout de la categorie dans le formdata

                                // Envoi des données à l'API via une requête POST
                                const setNewProject = async(data) => { //fonction asynchrone pour envoyer les données
                                    try { //essaye d'envoyer les données
                                        const requete = await fetch( //envoie les données a l'api
                                            "http://localhost:5678/api/works", {
                                                method: "POST",
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                    accept: "application/json",
                                                },
                                                body: data,
                                            }
                                        );
                                        if (requete.status === 201) {
                                            document.getElementById("gallery").innerHTML = "";
                                            document.querySelector(".galleryModal").innerHTML = "";
                                            displayAll();
                                            displayAllModal();
                                        } else {
                                            throw "Un problème est survenu.";
                                        }
                                    } catch (e) {
                                        console.error(e);
                                    }
                                };
                                setNewProject(formData);
                            } else {
                                // Affichage d'un message d'erreur si la taille de l'image est trop grande
                                document.getElementById("Error").innerHTML =
                                    "La taille de la photo est supérieure à 4 Mo.";

                                photo.value = null;
                                document.getElementById("model_ajout_container").style.display = null;
                                document.getElementById("image_telecharger_images").style.display = "none";
                            }
                            supprime();
                        }
                    }
                });
            }
        });
    }
});


function supprime() {
    // Suppression de l'affichage des données quand on ferme la boîte de dialogue d'ajout
    document.getElementById("ajout_container").style.display = null;
    document.getElementById("image_telecharger_images").style.display = "none";

    // Suppression des données de titre
    const input_titre_ajout = document.getElementById("title");
    input_titre_ajout.value = null;

    // Suppression de l'URL de la photo
    const input_photo_url = document.getElementById("imageUrl");
    input_photo_url.value = null;

    // Suppression des données de catégorie
    const category = document.getElementById("category");
    category.value = null;
}