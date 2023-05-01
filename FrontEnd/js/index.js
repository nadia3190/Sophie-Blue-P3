// coder la condition d'affichage du login/logout et les boutons modifier selon ton localStorage => dans une fonction 

//coder un fetch pour recuperer la liste des categories et les afficher dans le dom avant le bloc des projet 

// un fetch pour recuperer la liste des travaux la div gallery => fetch work => afficher les figure dans le dom avec la suppression de cequi est statique depuis le html file

// coder la fonction de deconnexion : supprimer le localstorage et reappeler la page home


const btnAll = document.getElementById("btns");
const gallery = document.querySelector(".gallery");
let token = localStorage.getItem("token");

function informations(work) {
    const card = `
      <figure id ="A${work?.id}" >
      <img src="${work?.imageUrl} "crossOrigin="anonymous">
        <figcaption>${work?.title}</figcaption>
      </figure>
            `;

    document.querySelector(".gallery").insertAdjacentHTML("beforeend", card);
}

function displayAll() {
    fetch("http://localhost:5678/api/works").then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                console.log(data);
                document.querySelector(".gallery").innerHTML = ""; // Effacement de l'élément HTML avec la classe .gallery
                // Boucle pour afficher tous les projets
                for (let i = 0; i <= data.length - 1; i++) {
                    informations(data[i]); // Appel de la fonction info pour afficher les informations sur chaque projet
                }
            });
        }
    });
}

btnAll.addEventListener("click", displayAll);



// creation des boutons//


fetch("http://localhost:5678/api/works").then((res) => {
    if (res.ok) {
        res.json().then((data) => {
            // Compter le nombre de photos
            const numS = data.length;
            // Récupération de la liste des catégories
            fetch("http://localhost:5678/api/categories").then((res) => {
                if (res.ok) {
                    res.json().then((category) => {
                        // Création d'un bouton pour chaque catégorie
                        for (let count = 0; count <= category.length - 1; count++) {
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
                            // supprimer les butons si l'utilisateur est connecté
                            if (localStorage.getItem("token")) {
                                console.log("OK");
                            } else {
                                const button = document.getElementById("btn");
                                button.appendChild(newButton);
                            }
                        }
                    });
                }
            });
        });
    }
    displayAll();
});

// changer login par logout si l'utilisateur est connecté
if (localStorage.getItem("token")) {
    document.getElementById("btnLogin").innerHTML = "logout";
} else {
    document.getElementById("btnLogin").innerHTML = "login";
}

// fonction deconnexion
function deconnexion() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}
// deconnexion lorsque on click sur logout
document.getElementById("btnLogin").addEventListener("click", deconnexion);