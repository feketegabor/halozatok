//Első feladat
function feladat1() {
    var ujDiv = document.createElement("div");
    ujDiv.style.display = "flex";
    ujDiv.style.flexDirection = "row";
    document.getElementsByTagName("BODY")[0].appendChild(ujDiv);
    for (var i = 0; i < 10; i++) {
        ujDiv.appendChild(document.createElement("div"));
    }
    for (var i = ujDiv.children.length; i > 0; i--) {
        ujDiv.children[ujDiv.children.length - i].innerText = (ujDiv.children.length-i).toString();
        ujDiv.children[ujDiv.children.length-i].style.backgroundColor = `rgb(${255 / 10 * i},${255 / 10 * i},${255 / 10 * i})`
    }

}

//Második feladat1
var faktoriális = function (n) {
    let er = 1;
    for (let i = 2; i <= n; i++) {
        er = er * i;
    }
    return er;
}

function feladat2() {
    for (var sor = 0; sor < 10; sor++) {
        sordiv = document.createElement("div"); //új div létrehozása az új sornak
        sordiv.classList.add("sor"); //új div osztálylistájához add hozzá a "sor"-t
        pascal.appendChild(sordiv); //új div-et add hozzá a "pascal" gyermekeihez
        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            elemdiv = document.createElement("div") //új div létrehozása az új elemnek
            elemdiv.classList.add("elem")//új elem div osztálylistájához add hozzá az "elem"-et
            elemdiv.innerText = faktoriális(sor) / (faktoriális(oszlop) * faktoriális(sor - oszlop));
            sordiv.appendChild(elemdiv)//új elem div-et vedd fel a sor elemei közé
        }
    }
}

window.onload = function () {
    console.log("Oldal betöltve...");
    feladat2();
}