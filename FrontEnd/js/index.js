const btnAll = document.getElementById("btns");
const gallery = document.querySelector(".gallery");
let token = localStorage.getItem("token");

function informations(work) { // fonction pour afficher les informations sur chaque projet dans le DOM 
    const card = `
      <figure id ="A${work?.id}">
      <img src="${work?.imageUrl} "crossOrigin="anonymous">
        <figcaption>${work?.title}</figcaption>
      </figure>
            `;

    document.querySelector(".gallery").insertAdjacentHTML("beforeend", card);
}


let AllProjects = [];
//fonction displau All avec catch 
function displayAll() {
    fetch("http://localhost:5678/api/works").then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                console.log(data);
                AllProjects = data;
                document.querySelector(".gallery").innerHTML = ""; // Effacement de l'élément HTML avec la classe .gallery
                // Boucle pour afficher tous les projets
                for (let i = 0; i <= data.length - 1; i++) {
                    informations(data[i]); // Appel de la fonction info pour afficher les informations sur chaque projet
                }
            });
        }
    }).catch((err) => {
        console.error(err);
    });

}

btnAll.addEventListener("click", displayAll);

//cacher le boutton all si l'utilisateur est connecté
if (localStorage.getItem("token")) {
    btnAll.style.display = "none";
} else {
    btnAll.style.display = "block";
}


fetch("http://localhost:5678/api/works").then((res) => {

    if (res.ok) {
        res.json().then((data) => {
            // Compter le nombre de photos
            AllProjects = data;

            const numS = data.length;
            // Récupération de la liste des catégories
            fetch("http://localhost:5678/api/categories").then((res) => {
                if (res.ok) {
                    res.json().then((category) => {
                            // Création d'un bouton pour chaque catégorie
                            for (let count = 0; count <= category.length - 1; count++) { // Boucle pour afficher toutes les catégories
                                //length - 1 pour ne pas afficher la catégorie "all"
                                const newButton = document.createElement("button");
                                newButton.type = "button"; // Ajout d'un type "button" pour chaque bouton
                                newButton.innerHTML = category[count].name; // Ajout d'un nom pour chaque bouton (nom de la catégorie)
                                newButton.className = "btnOpt"; // Ajout d'une classe pour chaque bouton    
                                newButton.onclick = function() {
                                    document.querySelector(".gallery").innerHTML = "";
                                    for (let i = 0; i <= numS; i++) {
                                        if (data[i].category.name === category[count].name) {
                                            informations(data[i]);
                                        }
                                    }

                                };
                                // supprimer les buttons si l'utilisateur est connecté
                                if (localStorage.getItem("token")) {
                                    console.log("OK");
                                } else {
                                    const button = document.getElementById("btn");
                                    button.appendChild(newButton);
                                }
                            }
                        })
                        .catch((err) => {
                            console.error(err);

                        });
                }
            });
        });
    }
    displayAll(); // afficher tous les projets au chargement de la page 
});

// changer login par logout si l'utilisateur est connecté
if (localStorage.getItem("token")) {
    document.getElementById("btnLogin").innerHTML = "logout";
} else {
    document.getElementById("btnLogin").innerHTML = "login";

}

// fonction deconnexion et redirection vers la page home
function deconnexion() {

    localStorage.removeItem("token");
    window.location.href = "./index.html";
}
document.getElementById("btnLogin").addEventListener("click", deconnexion);