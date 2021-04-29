var numberOfQuestions = 0;
var aktuálisKérdésSzáma = 1;
var aktuálisKérdés;

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}
function kérdésekSzáma() {
    fetch(`/questions/count`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.text()
            }
        })
        .then(data => { numberOfQuestions = parseInt(data) });
}
function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    aktuálisKérdés = kérdés;
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    if (kérdés.image == "") {
        document.getElementById("kép1").style.display = "none";
    }
    else {
        document.getElementById("kép1").style.display = "inline";
    }
    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
}

window.onload = function () {
    kérdésekSzáma();
    kérdésBetöltés(aktuálisKérdésSzáma);
    document.getElementById("vissza").onclick = function visszaLéptetés() {
        document.getElementById("válasz1").classList.remove("jó")
        document.getElementById("válasz1").classList.remove("rossz")
        document.getElementById("válasz2").classList.remove("jó")
        document.getElementById("válasz2").classList.remove("rossz")
        document.getElementById("válasz3").classList.remove("jó")
        document.getElementById("válasz3").classList.remove("rossz")
        if (aktuálisKérdésSzáma == 1) {
            aktuálisKérdésSzáma = numberOfQuestions;
            kérdésBetöltés(aktuálisKérdésSzáma);
        }
        else {
            aktuálisKérdésSzáma--;
            kérdésBetöltés(aktuálisKérdésSzáma);
        }
    };

    document.getElementById("előre").onclick = function előreLéptetés() {
        document.getElementById("válasz1").classList.remove("jó")
        document.getElementById("válasz1").classList.remove("rossz")
        document.getElementById("válasz2").classList.remove("jó")
        document.getElementById("válasz2").classList.remove("rossz")
        document.getElementById("válasz3").classList.remove("jó")
        document.getElementById("válasz3").classList.remove("rossz")
        if (aktuálisKérdésSzáma == numberOfQuestions) {
            aktuálisKérdésSzáma = 1;
            kérdésBetöltés(aktuálisKérdésSzáma);
        }
        else {
            aktuálisKérdésSzáma++;
            kérdésBetöltés(aktuálisKérdésSzáma);
        }
    };

    document.getElementById("válasz1").onclick = function helyese() {

        if (aktuálisKérdés.correctAnswer == 1) {
            this.classList.add("jó")
        }
        else {
            this.classList.add("rossz")
        }
    };

    document.getElementById("válasz2").onclick = function helyese() {

        if (aktuálisKérdés.correctAnswer == 2) {
            this.classList.add("jó")
        }
        else {
            this.classList.add("rossz")
        }
    };

    document.getElementById("válasz3").onclick = function helyese() {

        if (aktuálisKérdés.correctAnswer == 3) {
            this.classList.add("jó")
        }
        else {
            this.classList.add("rossz")
        }
    };

};