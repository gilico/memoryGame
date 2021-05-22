var cardName1;
var cardName2;

//----CARDS NAME FUNCTION-----//
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
}


//----FLIP CARDS FUNCTION-----//
var isCardFlipped = false;
var isCardFaceUp = false; //dening other cards to flip while 2 cards facing up
var isCardsMath = false;
var card1;
var card2;
var deckCard = document.querySelectorAll('.game-card');
deckCard.forEach(i => i.addEventListener('click', flip));

function flip() {
    turnDetect();
    if (isCardFaceUp) {
        return;
    }

    if (isTimeGood) {
        this.classList.add('flip');
 
        if (!isCardFlipped) {
            card1 = this;
            isCardFlipped = true;
        } else {
            card2 = this;
            isCardFlipped = false;
        }
        matchingCardsFun();
    }
}


//----CHECK FOR MATCH CARDS FUNCTION-----//
var cardCnt = 0;
var tempPoints = 0;
var corrctPairsCnt = 0;

function matchingCardsFun() {
    if (cardCnt == 2) {
        if (cardName1 == cardName2) {
            isCardsMath = true;
            tempPoints++;
            pointsPerPlayer();
            corrctPairsCnt++;
            card1.removeEventListener('click', flip);
            card2.removeEventListener('click', flip);
        } else {
            isCardFaceUp = true;
            isCardsMath = false;
            setTimeout(f, 1000);
            function f() {
                isCardFaceUp = false;
                card1.classList.remove('flip');
                card2.classList.remove('flip');
                turnsFun();
            }
        }
        cardCnt = 0;
        winner();
    }
}


//----PLAYERS TURNS FUNCTION-----//
var leftPlayerTurn = false
var turnsCnt = 0;

function turnDetect() {
    if (!isCardsMath) {
        turnsCnt += 0.5;
    }

    if (turnsCnt % 2 == 1) {
        leftPlayerTurn = true;
    } else {
        leftPlayerTurn = false;
    }
}

//----CARDS SHUFFLE FUNCTION-----//
var cardPosition;

(function shuffleCards() {
    deckCard.forEach(j => {
        cardPosition = Math.floor(Math.random() * 16);
        j.style.order = cardPosition;
    });
})();


//----TIMER FUNCTION-----//
setInterval(timerFunc, 1000);
var maxTime = 1;
var timeRemain = maxTime * 60;
var isTimeGood = true;

function timerFunc() {
    var countDown = document.getElementById('timer');
    var minutes = Math.floor(timeRemain / 60);
    var seconds = timeRemain % 60;

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    if (corrctPairsCnt < 8) {
        countDown.innerHTML = minutes + ' : ' + seconds;
        timeRemain--;
    }

    if (timeRemain <= -2) {
        isTimeGood = false;
        countDown.innerHTML = '';
        countDown.innerHTML = "TIME IS OVER";
        countDown.style.fontSize = "200%"
        countDown.style.letterSpacing = "0.2vw";
    }
    winner();
} 


//----TURNS STYLE FUNCTION-----//
var rightPlayer = document.getElementById('right-side');
var leftPlayer = document.getElementById('left-side');
var turnNoticeRight = document.getElementById('right-turn');
var turnNoticeLeft = document.getElementById('left-turn');
turnNoticeRight.innerHTML = "Your Turn";
rightPlayer.style.backgroundColor = "lightsteelblue";
rightPlayer.style.opacity = "0.8";
rightPlayer.style.boxShadow= "0 0 20px 10px #ffd800";

function turnsFun() {
    if (!leftPlayerTurn) {
        turnNoticeLeft.innerHTML = "";
        turnNoticeRight.innerHTML = "Your Turn";
        leftPlayer.style.backgroundColor = "";
        leftPlayer.style.boxShadow= "";
        rightPlayer.style.boxShadow= "0 0 20px 10px #ffd800";
        rightPlayer.style.backgroundColor = "lightsteelblue";
        rightPlayer.style.opacity = "0.8";
    } else {
        turnNoticeRight.innerHTML = "";
        turnNoticeLeft.innerHTML = "Your Turn";
        rightPlayer.style.backgroundColor = "";
        rightPlayer.style.boxShadow= "";
        leftPlayer.style.boxShadow= "0 0 20px 10px blue";
        leftPlayer.style.backgroundColor = "lightsteelblue";
        leftPlayer.style.opacity = "0.8";
    }
}


//----PLAYERS POINTS FUNCTION-----//
var rightPlayerPoints = document.getElementById('right-player-score');
var leftPlayerPoints = document.getElementById('left-player-score');
var player1Points = 0;
var player2Points = 0

function pointsPerPlayer() {
    if (!leftPlayerTurn) {
        player2Points += tempPoints;
        leftPlayerPoints.innerHTML = player2Points;
    } else {
        player1Points += tempPoints;
        rightPlayerPoints.innerHTML = player1Points;
    }
    tempPoints = 0

}


//----WINNER FUNCTION-----//
function winner() {
    console.log(player1Points, player2Points);
    if (corrctPairsCnt == 8 || timeRemain < 0) {
        var winnerIs = document.getElementById('middle');
        var div = document.createElement('div');
        var h = document.createElement("h1");
        var h1 = document.createElement("h1");
        var node = document.createTextNode("The Winner Is:");
        var node1 = document.createTextNode("PLAYER 1!!");
        var node2 = document.createTextNode("PLAYER 2!!");
        var node3 = document.createTextNode("IT'S A DRAW");
        h.appendChild(node);
        div.appendChild(h);
        //div.style.zIndex = '1';
        div.style.position = 'absolute';
        div.style.opacity = '0.2';
        div.style.top = '0';
        div.style.backgroundColor = 'black';
        div.style.color = 'white';
        div.style.fontSize = '180%';
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.textAlign = 'center';
        div.style.borderRadius = '5px';

        if (player1Points > player2Points) {
            h1.appendChild(node1);
        } else if (player1Points < player2Points) {
            h1.appendChild(node2);
        } else {
            h1.appendChild(node3);
        }
        div.appendChild(h1);        
        winnerIs.appendChild(div);
    } 
}

