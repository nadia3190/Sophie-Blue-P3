// si on est connecté on affiche une div

if (localStorage.getItem("token")) {
    const div = document.getElementById("updates");
    div.style.display = "block";
} else {
    const div = document.getElementById("updates");
    div.style.display = "none";
}
const modal = document.getElementById("modal");
// lorsqu'on click sur modifier on affiche une modal
const update = document.getElementById("updates");
const close = document.getElementById("close");
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