var isCardHidden = true;
var flipCnt = 0;
var firsCard = "";
var secCard = "";

function flipCard(id,name) {
    var Card = document.getElementById(id);
    if (id != temp) {
        Card.style.transform = "rotateY(180deg)";
        firsCard = name;
    } 
    var temp = id;
    console.log(firsCard);
}

function backFlip(id, name) {
    var Card = document.getElementById(id);

    console.log(secCard);
}
