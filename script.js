var deckCard = document.querySelectorAll('.game-card');
deckCard.forEach(i => i.addEventListener('click', Flipper));

//---shuffles the cards on load----//
var cardPosition;
deckCard.forEach(j => {
    cardPosition = Math.floor(Math.random() * 16);
    j.style.order = cardPosition;
});


//---CARDS NAMES FUNCTION----//
var isCardFlip = false;
var card1, card2;
var name1, name2;

function GetCardName(name) {
    if (isCardFlip) {
        name1 = name;
    } else {
        name2 = name;
    }
}

//---FLIP 2 CARDS FUNCTION----//
var isBoardLocked = false;

function Flipper() {
    //dening the more card to flip
    if (isBoardLocked) {
        return;
    }
    //dening double click the same card
    if (this == card1) {
        return;
    }

    if (isTimeGood) {
        this.classList.add('flip');

        if (!isCardFlip) {
            isCardFlip = true;
            card1 = this;
            return;
        }
        card2 = this;
        isCardFlip = false;
    }

    //only if both got names then check match
    if (name1 != null && name2 != null) {
        CheckMatchCards();
        name1 = null;
        name2 = null;
    }
    TimerFun;
}

//---CHECK FOR MATCH CARDS FUNCTION---//
var isCardsMatch = false;

function CheckMatchCards() {
    isBoardLocked = true;
    TurnDetect();

    if (name1 == name2) {
        GotMatch();
    } else {
        setTimeout(WorngCards, 1000);
    }

    GameScore();
}

//---IF CARDS IS MATCH FUNCTION---//
var corrctPairsCnt = 0;
function GotMatch() {
    card1.removeEventListener('click', Flipper);
    card2.removeEventListener('click', Flipper);
    isCardsMatch = true;
    isBoardLocked = false;
    corrctPairsCnt++;
    tempPoints++;
    PlayersPoints();
    tempPoints = 0;
}

//---IF CARDS DON'T MATCH FUNCTION---//
function WorngCards() {
    card1.classList.remove('flip');
    card2.classList.remove('flip');
    isBoardLocked = false;
    isCardsMatch = false;

    !leftPlayerTurn ? RightPlayerTurn() : LeftPlayerTurn();
}


/////*****---BONUS: TWO PLAYERS---******/////

//---PLAYERS TURNS FUNCTION---//
var leftPlayerTurn = false;
var turnsCnt = 0;
var leftplayerDiv = document.querySelector('.leftSide');
var rightplayerDiv = document.querySelector('.rightSide');

function TurnDetect() {
    if (!isCardsMatch) turnsCnt++;

    if (turnsCnt % 2 == 0) {
        leftPlayerTurn = false;
        console.log(rightplayerDiv);
    } else {
        leftPlayerTurn = true;
        console.log(leftplayerDiv);
    }
}

//---TURNS STYLE FUNCTION---//
var turnNoticeRight = document.getElementById('right-turn');
turnNoticeRight.innerHTML = 'Your Turn';
var turnNoticeLeft = document.getElementById('left-turn');

function RightPlayerTurn() {
    rightplayerDiv.classList.add('turn');
    leftplayerDiv.classList.remove('turn');
    turnNoticeRight.innerHTML = 'Your Turn'
    turnNoticeLeft.innerHTML = ''
    }

function LeftPlayerTurn() {
    leftplayerDiv.classList.add('turn');
    rightplayerDiv.classList.remove('turn');
    turnNoticeLeft.innerHTML = 'Your Turn'
    turnNoticeRight.innerHTML = '';
}


//---POINTS FUNCTION---//
var rightPointsDiv = document.getElementById('right-player-score');
var leftPointsDiv = document.getElementById('left-player-score');
var rightPlayerPoints = 0;
var leftPlayerPoints = 0;
var tempPoints = 0;
rightPointsDiv.innerHTML = rightPlayerPoints;
leftPointsDiv.innerHTML = leftPlayerPoints;

function PlayersPoints() {
    //if 'true' on purpose: it's still on right turn
    if (leftPlayerTurn) {
        rightPlayerPoints += tempPoints;
        rightPointsDiv.innerHTML = rightPlayerPoints;
    } else {
        leftPlayerPoints += tempPoints;
        leftPointsDiv.innerHTML = leftPlayerPoints;
    }
}


//----TIMER FUNCTION-----//
setInterval(TimerFun, 1000);
var isTimeGood = true;
var maxTime = 1;
var timeRemain = maxTime * 60;

function TimerFun() {
    var countDown = document.getElementById('timer');
    var minutes = Math.floor(timeRemain / 60);
    var seconds = timeRemain % 60;

    if (seconds < 10) seconds = '0' + seconds;

    if (corrctPairsCnt < 8) {
        countDown.innerHTML = '0' + minutes + ' : ' + seconds;
        timeRemain--;
    }

    if (timeRemain <= -2) {
        isTimeGood = false;
        countDown.innerHTML = '';
        countDown.innerHTML = "TIME IS OVER";
        //countDown.style.fontSize = "2vh"
        countDown.style.letterSpacing = "0.2vw";
    }
    GameScore();
} 

function GameScore() {
    if (corrctPairsCnt == 8 || timeRemain < -1) {
        var winnerIs = document.getElementById('winner');
        winnerIs.innerHTML = '<div id="winner-div"></div>';
        var container = document.getElementById('winner-div');

        var h = document.createElement("h1");
        h.innerHTML = "The Winner Is:";
        container.appendChild(h);

        var h1 = document.createElement("h1");
        if (rightPlayerPoints > leftPlayerPoints) {
            h1.innerHTML = "PLAYER 1!!";
            container.style.color = "#ffd800";
            container.style.boxShadow = "0 0 10px 3px #ffd800";
        } else if (rightPlayerPoints < leftPlayerPoints) {
            h1.innerHTML = "PLAYER 2!!";
            container.style.color = "#125ce3";
            container.style.boxShadow = "0 0 10px 3px blue";
        } else {
            h.innerHTML = "";
            container.style.color = "red";
            h1.innerHTML = "IT'S A DRAW";
            container.style.boxShadow = "0 0 10px 3px red";
        }
        container.style.zIndex = '1';
        container.appendChild(h1);
        winnerIs.appendChild(container);
    } 
}