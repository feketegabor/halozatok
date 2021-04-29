var aktuálisKérdésSzáma = 1;
var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában
var timeoutHandler;

function kérdésBetöltés(id, destination) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${id}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }

            }
        );
}
function init() {

    let l = window.localStorage.getItem("lista")
    if (l) {
        console.log("Volt már listánk")
        hotList = JSON.parse(l);
        displayedQuestion = 0;
        nextQuestion = parseInt(window.localStorage.getItem("nextQ"))
        kérdésMegjelenítés();
    }
    else {
        console.log("Még nem volt")
        for (var i = 0; i < questionsInHotList; i++) {
            let q = {
                question: {},
                goodAnswers: 0
            }
            hotList[i] = q;
        }

        //Első kérdések letöltése
        for (var i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    }
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
function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    console.log(kérdés);
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



function előreLéptetés() {
    clearTimeout(timeoutHandler);
    document.getElementById(`válasz1`).style.pointerEvents = "auto";
    document.getElementById(`válasz2`).style.pointerEvents = "auto";
    document.getElementById(`válasz3`).style.pointerEvents = "auto";
    document.getElementById("válasz1").classList.remove("jó");
    document.getElementById("válasz1").classList.remove("rossz");
    document.getElementById("válasz2").classList.remove("jó");
    document.getElementById("válasz2").classList.remove("rossz");
    document.getElementById("válasz3").classList.remove("jó");
    document.getElementById("válasz3").classList.remove("rossz");
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
};

window.onload = () => {
    init();
    kérdésekSzáma()
    document.getElementById("vissza").onclick = function visszaLéptetés() {
        document.getElementById(`válasz1`).style.pointerEvents = "auto";
        document.getElementById(`válasz2`).style.pointerEvents = "auto";
        document.getElementById(`válasz3`).style.pointerEvents = "auto";
        document.getElementById("válasz1").classList.remove("jó")
        document.getElementById("válasz1").classList.remove("rossz")
        document.getElementById("válasz2").classList.remove("jó")
        document.getElementById("válasz2").classList.remove("rossz")
        document.getElementById("válasz3").classList.remove("jó")
        document.getElementById("válasz3").classList.remove("rossz")
        clearTimeout(timeoutHandler);
        if (displayedQuestion == 0) displayedQuestion = questionsInHotList;
        displayedQuestion--;
        kérdésMegjelenítés()
    };

    document.getElementById("előre").onclick = előreLéptetés;

    document.getElementById("válasz1").onclick = function () {
        timeoutHandler = setTimeout(előreLéptetés, 3000);
        document.getElementById(`válasz1`).style.pointerEvents = "none";
        if (hotList[displayedQuestion].question.correctAnswer == 1) {
            this.classList.add("jó");
            hotList[displayedQuestion].goodAnswers++;
            if (hotList[displayedQuestion].goodAnswers == 3) {
                kérdésBetöltés(nextQuestion, displayedQuestion);
                nextQuestion++;
                if (nextQuestion == numberOfQuestions+1) {
                    nextQuestion = 1;
                }
            }
        }
        else {
            this.classList.add("rossz");
            hotList[displayedQuestion].goodAnswers = 0;
        }
        window.localStorage.setItem("lista", JSON.stringify(hotList))
        window.localStorage.setItem("nextQ", nextQuestion)
    };

    document.getElementById("válasz2").onclick = function helyese() {
        timeoutHandler = setTimeout(előreLéptetés, 3000);
        document.getElementById(`válasz2`).style.pointerEvents = "none";
        if (hotList[displayedQuestion].question.correctAnswer == 2) {
            this.classList.add("jó")
            hotList[displayedQuestion].goodAnswers++;
            if (hotList[displayedQuestion].goodAnswers == 3) {
                kérdésBetöltés(nextQuestion, displayedQuestion);
                nextQuestion++;
                if (nextQuestion == numberOfQuestions + 1) {
                    nextQuestion = 1;
                }
            }
        }
        else {
            this.classList.add("rossz")
            hotList[displayedQuestion].goodAnswers = 0;
        }
        window.localStorage.setItem("lista", JSON.stringify(hotList))
        window.localStorage.setItem("nextQ", nextQuestion)
    };

    document.getElementById("válasz3").onclick = function helyese() {
        timeoutHandler = setTimeout(előreLéptetés, 3000);
        document.getElementById(`válasz3`).style.pointerEvents = "none";
        if (hotList[displayedQuestion].question.correctAnswer == 3) {
            this.classList.add("jó")
            hotList[displayedQuestion].goodAnswers++;
            if (hotList[displayedQuestion].goodAnswers == 3) {
                kérdésBetöltés(nextQuestion, displayedQuestion);
                nextQuestion++;
                if (nextQuestion == numberOfQuestions + 1) {
                    nextQuestion = 1;
                }
            }
        }
        else {
            this.classList.add("rossz")
            hotList[displayedQuestion].goodAnswers = 0;
        }
        window.localStorage.setItem("lista", JSON.stringify(hotList))
        window.localStorage.setItem("nextQ", nextQuestion)
    };

};