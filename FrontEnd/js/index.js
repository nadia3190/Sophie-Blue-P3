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
let allCategories = [{
    "id": -1,
    "name": "Tous"
}];
//fonction displau All avec catch 
function displayAll() {
    fetch("http://localhost:5678/api/works").then((res) => {
        if (res.ok) {
            res.json().then((data) => {
                console.log(data);
                AllProjects = data;
                displayProjects(AllProjects);
            });
        }
    }).catch((err) => {
        console.error(err);
    });

}

function displayProjects(tableauProjects) {
    document.querySelector(".gallery").innerHTML = ""; // Effacement de l'élément HTML avec la classe .gallery

    for (let i = 0; i <= tableauProjects.length - 1; i++) {
        informations(tableauProjects[i]); // Appel de la fonction info pour afficher les informations sur chaque projet
    }
}



// Récupération de la liste des catégories
fetch("http://localhost:5678/api/categories")
    .then((res) => {
        if (res.ok)
            return res.json();
    }).then((categories) => {
        // Création d'un bouton pour chaque catégorie
        categories.forEach(element => {
            allCategories.push(element);
        });
        //cacher le boutton all si l'utilisateur est connecté
        if (!localStorage.getItem("token")) {
            displayFilter();
        }

    })
    .catch((err) => {
        console.error(err);

    });


displayAll();

function displayFilter() {
    const btn = document.getElementById("btn");
    allCategories.forEach(element => {
        const newButton = document.createElement("button");
        newButton.type = "button"; // Ajout d'un type "button" pour chaque bouton
        newButton.innerHTML = element.name; // Ajout d'un nom pour chaque bouton (nom de la catégorie)
        newButton.className = "btnOpt"; // Ajout d'une classe pour chaque bouton    
        newButton.setAttribute("id", element.id);
        newButton.onclick = function() {
            filterProject(element.id);
        };
        btn.appendChild(newButton);
    });
}

function filterProject(idCategory) {
    if (idCategory == -1) displayProjects(AllProjects);
    else {
        const newTable = AllProjects.filter(element => element.categoryId == idCategory);
        displayProjects(newTable);
    }
}
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

if (localStorage.getItem("token")) {
    document.getElementById("modify").style.backgroundColor = "black";

    //edition
    const edition = document.createElement("p"); //création d'un paragraphe 
    edition.type = "button"; //ajout d'un type bouton

    const modification = `
     <div>
        <i class="fa-regular fa-pen-to-square"></i>
        <p>Mode édition</p>  
    </div>
  `;
    edition.insertAdjacentHTML("afterbegin", modification); //ajout du bouton modifier dans la page 
    edition.className = "edition"; //ajout de la classe edition
    const container = document.getElementById("container");
    container.appendChild(edition);


    const changment = document.createElement("button");
    changment.type = "button";

    const modification_changment = `
     <p>publier les changements</p>  `;
    changment.insertAdjacentHTML("beforeend", modification_changment);
    changment.className = "publier";

    changment.onclick = function() {};
    const changements = document.getElementById("modify");
    changements.appendChild(changment);



}