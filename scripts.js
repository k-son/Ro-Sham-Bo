/// DOM Elements
const btnStartIns = document.getElementById("button--start--ins");
const btnStartOut = document.getElementById("button--start--out");
const btnPaperIns = document.getElementById("button--paper--ins");
const btnPaperOut = document.getElementById("button--paper--out");
const btnRockIns = document.getElementById("button--rock--ins");
const btnRockOut = document.getElementById("button--rock--out");
const btnScissorsIns = document.getElementById("button--scissors--ins");
const btnScissorsOut = document.getElementById("button--scissors--out");
const btnQuestion = document.getElementById("button--question");
const btnSound = document.getElementById("button--sound");

const indicatorPaperCpu = document.getElementById("indicator--paper--cpu");
const indicatorPaperYou = document.getElementById("indicator--paper--you");
const indicatorRockYou = document.getElementById("indicator--rock--you");
const indicatorRockCpu = document.getElementById("indicator--rock--cpu");
const indicatorScissorsYou = document.getElementById("indicator--scissors--you");
const indicatorScissorsCpu = document.getElementById("indicator--scissors--cpu");

const signalWinYou = document.getElementById("whoWins--you");
const signalWinCpu = document.getElementById("whoWins--cpu");
const signalPointYou = document.getElementById("pointFor--you");
const signalPointCpu = document.getElementById("pointFor--cpu");
const signalDrawYou = document.getElementById("draw--you");
const signalDrawCpu = document.getElementById("draw--cpu");
const signalScoreBoxYou = document.getElementById("scoreBox--you");
const signalScoreBoxCpu = document.getElementById("scoreBox--cpu");

let scoreYou = "";
let scoreCpu = "";


///// Functions

/// Disactivate start button
function disactivateStart() {
  btnStartOut.classList.remove("illuminate--bg");
  btnStartIns.removeEventListener("click", buttonsReady);
}

/// Option for new game
function startNewGame() {
  clean();
  setTimeout (buttonsReady, 1200);
}

/// Switch off all illuminations and zero score board
function clean() {
  let illuminated = document.getElementsByClassName("illuminate");
  while (illuminated.length)
      illuminated[0].classList.remove("illuminate");
  let illuminatedBg = document.getElementsByClassName("illuminate--bg");
  while (illuminatedBg.length)
      illuminatedBg[0].classList.remove("illuminate--bg");

  setTimeout (function() {document.getElementById("score--you--0").scrollIntoView()}, 1);
  setTimeout (function() {document.getElementById("score--cpu--0").scrollIntoView()}, 600);

  scoreYou = 0;
  scoreCpu = 0;
}

/// Prepare and handle player's choice
function buttonsReady() {
  disactivateStart();
  btnStartIns.addEventListener("click", startNewGame);

  btnPaperOut.classList.add("illuminate--bg");
  btnRockOut.classList.add("illuminate--bg");
  btnScissorsOut.classList.add("illuminate--bg");

  btnPaperIns.onclick = function() {
    round("paper");
    disableButtons();
  }
  btnRockIns.onclick = function() {
    round("rock");
    disableButtons();
  }
  btnScissorsIns.onclick = function() {
    round("scissors");
    disableButtons();
  }
}

/// Disable and switch off buttons
function disableButtons() {
  btnPaperIns.onclick = null;
  btnRockIns.onclick = null;
  btnScissorsIns.onclick = null;

  btnPaperOut.classList.remove("illuminate--bg");
  btnRockOut.classList.remove("illuminate--bg");
  btnScissorsOut.classList.remove("illuminate--bg");
}

/// Computer draw
function drawCpu() {
  const choices = ["paper", "rock", "scissors"];
  let draw = Math.floor(Math.random() * 3);
  return choices[draw];
}


/// Round 
function round(choice) {
  let choiceYou = choice;
  if (choiceYou == "paper") {
    indicatorPaperYou.classList.add("illuminate--bg");
  } else if (choiceYou == "rock") {
    indicatorRockYou.classList.add("illuminate--bg");
  } else {
    indicatorScissorsYou.classList.add("illuminate--bg");
  }

  let choiceCpu = drawCpu();
  if (choiceCpu == "paper") {
    indicatorPaperCpu.classList.add("illuminate--bg");
  } else if (choiceCpu == "rock") {
    indicatorRockCpu.classList.add("illuminate--bg");
  } else {
    indicatorScissorsCpu.classList.add("illuminate--bg");
  }

  
  switch (choiceYou) {

    case "paper":
      if (choiceCpu == "rock") {
        pointForYou();
      } else if (choiceCpu == "scissors") {
        pointForCpu();
      } else {
        noPoints();
      }
      break;

    case "rock":
      if (choiceCpu == "scissors") {
        pointForYou();
      } else if (choiceCpu == "paper") {
        pointForCpu();
      } else {
        noPoints();
      }
      break;

    case "scissors":
      if (choiceCpu == "paper") {
        pointForYou();
      } else if (choiceCpu == "rock") {
        pointForCpu();
      } else {
        noPoints();
      }
      break;
  }
  

}

/// Pulsat signal
function pulsate(el) {
  el.classList.add("illuminate");
  setTimeout (function() {el.classList.remove("illuminate")}, 400);
  setTimeout (function() {el.classList.add("illuminate")}, 800);
  setTimeout (function() {el.classList.remove("illuminate")}, 1200);
  setTimeout (function() {el.classList.add("illuminate")}, 1600);
  setTimeout (function() {el.classList.remove("illuminate")}, 2000);
}


/// Illuminate scoreBox
function illuminateScoreBox(el) {
  el.classList.add("illuminate--bg");
  setTimeout (function() {el.classList.remove("illuminate--bg")}, 2000);
}


/// Point for a player
function pointForYou() {
  ++scoreYou;
  pulsate(signalPointYou);
  illuminateScoreBox(signalScoreBoxYou);
  document.getElementById(`score--you--${scoreYou}`).scrollIntoView();
}

function pointForCpu() {
  ++scoreCpu;
  pulsate(signalPointCpu);
  illuminateScoreBox(signalScoreBoxCpu);
  document.getElementById(`score--cpu--${scoreCpu}`).scrollIntoView();
}

function noPoints() {
  pulsate(signalDrawYou);
  pulsate(signalDrawCpu);
}


/// Scenario

btnStartOut.classList.add("illuminate--bg");
btnStartIns.addEventListener("click", buttonsReady);



