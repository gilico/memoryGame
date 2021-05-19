var deckCard = document.querySelectorAll('.game-card');
var isCardFlipped = false;
var isCardFaceUp = false; //dening other cards to flip while 2 cards facing up
var card1;
var card2;
var cardName1;
var cardName2;
var cardCnt = 0;

function getCardName(name) {
    if (isCardFlipped) {
        cardName1 = name;
        isCardFlipped = true;
        cardCnt++;
    } else {
        cardName2 = name;
        isCardFlipped = false;
        cardCnt++;
    }
    //console.log(cardName1, cardName2, isCardFlipped);
}


function flip() {

    //console.log('clicked')
    //console.log(this)
    if (isCardFaceUp) {
        return;
    }

    this.classList.add('flip');

    if (!isCardFlipped) {
        card1 = this;
        isCardFlipped = true;
    } else {
        card2 = this;
        isCardFlipped = false;
    }
 
   //matching cards
    if (cardCnt == 2) {
        if (cardName1 == cardName2) {
            card1.removeEventListener('click', flip);
            card2.removeEventListener('click', flip);
            //console.log("GOOD");
        } else {
            isCardFaceUp = true;
            setTimeout(f, 2000)
            function f() {
            isCardFaceUp = false;
                card1.classList.remove('flip');
                card2.classList.remove('flip');
                //console.log("BAD");
            }
        }
        cardCnt = 0;
    }
}
deckCard.forEach(i => i.addEventListener('click', flip));


var cardPosition;
(function shuffleCards() {
    deckCard.forEach(j => {
        cardPosition = Math.floor(Math.random() * 16);
        j.style.order = cardPosition;
    });
})();


setInterval(timerFunc, 1000);
var maxTime = 3;
var timeRemain = maxTime * 60;

function timerFunc() {

    var countDown = document.getElementById('timer');
    var minutes = Math.floor(timeRemain / 60);
    var seconds = timeRemain % 60;

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    countDown.innerHTML = `${minutes} : ${seconds}`;
    timeRemain--;

    if (timeRemain <= -2) {
        countDown.innerHTML = '';
        countDown.innerHTML = "TIME IS OVER";
        countDown.style.fontSize = "200%"
        countDown.style.letterSpacing = "0.2vw";
    }
} 