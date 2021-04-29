var kérdések;
var numberOfQuestions = 0;

function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data))
};

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésMegjelenítés(numberOfQuestions);
};

function kérdésMegjelenítés(kérdés) {
    let kérdésSzöveg = kérdések[kérdés].questionText;
    let kérdésDiv = document.getElementById("kérdés_szöveg");
    kérdésDiv.innerHTML = kérdésSzöveg;
    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdés].image;
    let válasz1 = kérdések[kérdés].answer1;
    let válasz2 = kérdések[kérdés].answer2;
    let válasz3 = kérdések[kérdés].answer3;
    let válasz1Div = document.getElementById("válasz1")
    let válasz2Div = document.getElementById("válasz2")
    let válasz3Div = document.getElementById("válasz3")
    válasz1Div.innerHTML = válasz1;
    válasz2Div.innerHTML = válasz2;
    válasz3Div.innerHTML = válasz3;
};

window.onload = function () {
    letöltés();

    document.getElementById("vissza").onclick = function visszaLéptetés() {
        document.getElementById("válasz1").classList.remove("jó")
        document.getElementById("válasz1").classList.remove("rossz")
        document.getElementById("válasz2").classList.remove("jó")
        document.getElementById("válasz2").classList.remove("rossz")
        document.getElementById("válasz3").classList.remove("jó")
        document.getElementById("válasz3").classList.remove("rossz")
        if (numberOfQuestions == 0) {
            numberOfQuestions = kérdések.length-1; 
            kérdésMegjelenítés(numberOfQuestions);
        }
        else {
            numberOfQuestions--;
            kérdésMegjelenítés(numberOfQuestions);
        }
    };

    document.getElementById("előre").onclick = function előreLéptetés() {
        document.getElementById("válasz1").classList.remove("jó")
        document.getElementById("válasz1").classList.remove("rossz")
        document.getElementById("válasz2").classList.remove("jó")
        document.getElementById("válasz2").classList.remove("rossz")
        document.getElementById("válasz3").classList.remove("jó")
        document.getElementById("válasz3").classList.remove("rossz")
        if (numberOfQuestions == kérdések.length-1) {
            numberOfQuestions = 0;
            kérdésMegjelenítés(numberOfQuestions);
        }
        else {
            numberOfQuestions++;
            kérdésMegjelenítés(numberOfQuestions);
        }
    };

    document.getElementById("válasz1").onclick = function helyese() {
        
        if (kérdések[numberOfQuestions].correctAnswer == 1) {
            this.classList.add("jó")
        }
        else {
            this.classList.add("rossz")
        }
    };

    document.getElementById("válasz2").onclick = function helyese() {

        if (kérdések[numberOfQuestions].correctAnswer == 2) {
            this.classList.add("jó")
        }
        else {
            this.classList.add("rossz")
        }
    };

    document.getElementById("válasz3").onclick = function helyese() {

        if (kérdések[numberOfQuestions].correctAnswer == 3) {
            this.classList.add("jó")
        }
        else {
            this.classList.add("rossz")
        }
    };

};


