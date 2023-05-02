// si on est connecté on affiche une div

if (localStorage.getItem("token")) {
    const div = document.getElementById("updates");
    div.style.display = "block";
} else {
    const div = document.getElementById("updates");
    div.style.display = "none";
}