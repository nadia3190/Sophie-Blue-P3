//modal

// Récupère la modal et le bouton pour ouvrir la modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("btn1");

// Récupère le bouton pour ouvrir la deuxième modal
var modal2 = document.getElementById("myModal2");
var btn2 = document.getElementById("btn2");

//Récupere le butto, pout ouvrir la troisieme modal
var modal3 = document.getElementById("myModal3");
var btn3 = document.getElementById("btn3");


// Récupère le bouton pour fermer la modal
var span = document.getElementsByClassName("close")[0];

// Ouvre la modal lorsque l'utilisateur clique sur le bouton
btn.onclick = function() {
    modal.style.display = "block";
}

// Ouvre la deuxième modal lorsque l'utilisateur clique sur le bouton 2
btn2.onclick = function() {

    modal2.style.display = "block";
}

// Ouvre la troisieme modal lorsque l'utilisateur clique sur le bouton 3
btn3.onclick = function() {

    modal3.style.display = "block";
}

// Ferme la modal lorsque l'utilisateur clique sur la croix
span.onclick = function() {
    modal.style.display = "none";
}

// Ferme la modal lorsque l'utilisateur clique en dehors de la modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
    if (event.target == modal3) {
        modal3.style.display = "none";
    }
}

//fonction pour afficher via une api 

function getProducts() {
    fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => {
            displayProducts(data);
        });
}

function getproducts2() {
    fetch("http://localhost:5678/api/works")
        .then((res) => res.json())
        .then((data) => {
            displayProducts2(data);
        });
}


function displayProducts(products) {
    const productsContainer = document.querySelector(".products-container");
    products.forEach((product) => {
        productsContainer.innerHTML += `
            <div class="product">
                <img src="${product.imageUrl}" alt="" /></i>
              
               
            </div>
        `;
    });
}

//fonction pour afficher les produits dans une modal
function displayProducts2(products) {
    const productsContainer2 = document.querySelector(".products-container2");
    products.forEach((product) => {
        productsContainer2.innerHTML += `
            <div class="product" id="imageElement">
                <img src="${product.imageUrl}" alt="" id="imageId"/></i>
                <button class="delete-button" data-id="${product._id}" onclick="deleteImage(id)">Supprimer</button>

            </div>
        `;
    });
}


//appel de la fonction displayProducts lorsqu'on click sur le bouton

btn.addEventListener("click", () => {
    getProducts();
});



function deleteImage(id) {
    // Remplacez "API_ENDPOINT" par l'URL de l'API qui supprime l'image
    const apiUrl = "http://localhost:5678/api/works/" + id;

    // Créez une requête de suppression en utilisant la méthode fetch
    fetch(apiUrl, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then(response => {
            // Vérifiez si la suppression a réussi
            if (response.ok) {
                // Si c'est le cas, supprimez l'image du DOM
                const imageElement = document.getElementById(imageId);
                imageElement.parentNode.removeChild(imageElement);
            } else {
                // Sinon, affichez un message d'erreur
                console.error("Erreur lors de la suppression de l'image");
            }
        })
        .catch(error => {
            // Gérez les erreurs de réseau ou autres erreurs
            console.error("Erreur lors de la suppression de l'image", error);
        });
}

// Vérification de la présence d'un ID dans le local storage
if (localStorage.getItem("id")) {
    // Récupère l'ID stocké dans le local storage
    let getId = JSON.parse(localStorage.getItem("id"));
    // Boucle pour supprimer tous les projets correspondants à l'ID
    for (let id of getId) {
        // Appelle la fonction deleteProject pour chaque ID dans getId
        deleteImage(id);
        // Appelle la fonction tout
        displayProducts2();
        console.log("L'ID est : ", id);
    }
    // Suppression de l'ID dans le local storage
    localStorage.removeItem("id");
}









//lorsqu'on click sur le bouton supprimer, on affiche les produits dans une nouvelle modal puis on supprime le produit selectionné

btn3.addEventListener("click", () => {
    getproducts2();
    deleteImage();
});
//ajouter des button supprimer a chaque produit
const deleteButtons = document.querySelectorAll(".delete-button");
deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const Id = e.target.dataset.id;
        //on supprime le produit selectionné

        deleteImage(Id);

    });
});






//fonction pour ajouter une image  et saisir sa categorie via une api
function addProduct(imageUrl, category) {
    fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageUrl, category }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
}