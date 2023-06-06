const form = document.getElementById("film-form");
const tittleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

//eventleri yükleme 
EventListeners();

function EventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function() {
        let film = Storage.getFilmsStorage();
        UI.loadAllFilms(film);
    });
}
cardbody.addEventListener("click", deleteFilm);
clear.addEventListener("click", clearAllFilms);

function addFilm(e) {

    const title = tittleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;



    if (title === "" || director === "" || url === "") {
        //Hata
        UI.displayMessages("Tüm alanları doldurun...", "danger");
    } else {
        //Yeni Film
        const newFilm = new Film(title, director, url);
        UI.addFilmToUI(newFilm); //Arayüze Film Ekleme
        Storage.addFilmToStorage(newFilm); //Storage'ye film ekleme
        UI.displayMessages("hepsi Başarıyla ekendi...", "success");


    }
    UI.clearInputs(tittleElement, directorElement, urlElement);
    e.preventDefault();
}

function deleteFilm(e) {
    if (e.target.id === "delete-film") {
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages("silme işlemi başarılı...", "success");
    }
}

function clearAllFilms() {
    if (confirm("Emin misiniz ?")) {
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }

}