"use strict";

//// DOM ELEMENTS

// Ins is for inside/clickable part of button
// Out is for outer/illuminable part of button
const newgameBtn = document.getElementById("button--start--ins");
const newgameBtnIllumination = document.getElementById("button--start--out");
const paperBtn = document.getElementById("button--paper--ins");
const paperBtnIllumination = document.getElementById("button--paper--out");
const rockBtn = document.getElementById("button--rock--ins");
const rockBtnIllumination = document.getElementById("button--rock--out");
const scissorsBtn = document.getElementById("button--scissors--ins");
const scissorsBtnIllumination = document.getElementById("button--scissors--out");
const soundOnBtn = document.getElementById("sound--on");  // visible when sounds are unmuted
const soundOffBtn = document.getElementById("sound--off"); // visible when sounds are muted
const aboutBtn = document.getElementById("button--question");  // click it to open modalBox/show game rules
const modalBox = document.getElementById("modalBox");  // to show game rules after click on aboutBtn

// illuminated indicators show your's and computer's choice
const playerSelectedPaperIndicator = document.getElementById("indicator--paper--you");
const computerDrewPaperIndicator = document.getElementById("indicator--paper--cpu");
const playerSelectedRockIndicator = document.getElementById("indicator--rock--you");
const computerDrewRockIndicator = document.getElementById("indicator--rock--cpu");
const playerSelectedScissorsIndicator = document.getElementById("indicator--scissors--you");
const computerDrewScissorsIndicator = document.getElementById("indicator--scissors--cpu");

// illuminable elements to indicate results
const playerWinsIllumination = document.getElementById("whoWins--you");
const computerWinsIllumination = document.getElementById("whoWins--cpu");
const playerGetsPointIllumination = document.getElementById("pointFor--you");
const computerGetsPointIllumination = document.getElementById("pointFor--cpu");
const playerDrawsIllumination = document.getElementById("draw--you");
const computerDrawsIllumination = document.getElementById("draw--cpu");
const playerScoreBoxIllumination = document.getElementById("scoreBox--you");
const computerScoreBoxIllumination = document.getElementById("scoreBox--cpu");

const newgameStartsMelody = document.getElementById("sound__start");  // plays after clicking newgameBtn
const playerWinsMelody = document.getElementById("sound__win--you");  // plays after you win/score 5 points 
const computerWinsMelody = document.getElementById("sound__win--cpu");  // plays after computer wins/scores 5 points

// score counts, used i.a. to move scoreBox__display
let playerActualScore = 0;
let computerActualScore = 0;


//// GAME FUNCTIONS
function afterPageLoad() {
  newgameBtnIllumination.classList.add("illuminate--bg");
  muteSounds();
  newgameBtn.addEventListener("click", letsPlayFirstGame);
}

afterPageLoad();

function letsPlayFirstGame() {
  playAudio(newgameStartsMelody);
  trunOffStartBtn();
  buttonsReady();
}

// When want to cancel current and start new game
function startNewGame() {
  clean();
  playAudio(newgameStartsMelody);
  setTimeout(buttonsReady, 1200);
}

// Computer draws it's choice
function drawCpu() {
  const choices = ["paper", "rock", "scissors"];
  const draw = Math.floor(Math.random() * 3);
  return choices[draw];
}

// Turn off start button
function trunOffStartBtn() {
  newgameBtnIllumination.classList.remove("illuminate--bg");
}

// Cleaning functions to switch off all illuminations
function illuminationsOff() {
  const illuminated = document.getElementsByClassName("illuminate");
  while (illuminated.length)
      illuminated[0].classList.remove("illuminate");
  const illuminatedBg = document.getElementsByClassName("illuminate--bg");
  while (illuminatedBg.length)
      illuminatedBg[0].classList.remove("illuminate--bg");
}

// Zero scores and so display "0" on scoreBox__display
function zeroScores() {
  playerActualScore = 0;
  computerActualScore = 0;
  setTimeout ( () => {document.getElementById("score--you--0").scrollIntoView()}, 10);
  setTimeout ( () => {document.getElementById("score--cpu--0").scrollIntoView()}, 600);
}

// Switch off all illuminations and zero scores
function clean() {
  zeroScores();
  illuminationsOff();
}

// To pulsate illuminable elements
function pulsate(el) {
  el.classList.add("illuminate");
  setTimeout ( () => {el.classList.remove("illuminate")}, 300);
  setTimeout ( () => {el.classList.add("illuminate")}, 600);
  setTimeout ( () => {el.classList.remove("illuminate")}, 900);
  setTimeout ( () => {el.classList.add("illuminate")}, 1200);
  setTimeout ( () => {el.classList.remove("illuminate")}, 1500);
}

// Illuminate scoreBox after getting a point
function illuminateScoreBox(el) {
  el.classList.add("illuminate--bg");
  setTimeout ( () => {el.classList.remove("illuminate--bg")}, 1500);
}

// Keep illuminated signalWin and scoreBox after pulsation ends - indicates a winner
function pointTheWinner(signal, box) {
  setTimeout ( () => {signal.classList.add("illuminate")}, 1500);
  setTimeout ( () => {box.classList.add("illuminate--bg")}, 1500);
}

// Disable and switch off buttons (paper, rock and scissors)
function disableButtons() {
  paperBtn.onclick = null;
  rockBtn.onclick = null;
  scissorsBtn.onclick = null;
  paperBtnIllumination.classList.remove("illuminate--bg");
  rockBtnIllumination.classList.remove("illuminate--bg");
  scissorsBtnIllumination.classList.remove("illuminate--bg");
}

function playAudio(sound) {
  sound.play();
}

// Unmute audio
function playSounds() {
  newgameStartsMelody.muted = false;
  playerWinsMelody.muted = false;
  computerWinsMelody.muted = false;
}

soundOffBtn.addEventListener("click", () => {
  playSounds();
  soundOnBtn.classList.toggle("displayNone");
  soundOffBtn.classList.toggle("displayNone");
})

// Mute audio
function muteSounds() {
  newgameStartsMelody.muted = true;
  playerWinsMelody.muted = true;
  computerWinsMelody.muted = true;
}

soundOnBtn.addEventListener("click", () => {
  muteSounds();
  soundOnBtn.classList.toggle("displayNone");
  soundOffBtn.classList.toggle("displayNone");
})

// Show game rules / open modalBox
function modalBoxVisibility() {
  modalBox.classList.toggle("displayNone");
}

aboutBtn.onclick = () => {
  modalBoxVisibility();
}

modalBox.addEventListener("click", modalBoxVisibility);

// Buttons ready - prepares buttons for game round and handles player's choice
// Chcecks if somebody already has 5 points and wins the game
function buttonsReady() {
  if (playerActualScore === 5) {
    disableButtons();
    newgameBtn.removeEventListener("click", play);
    pulsate(playerWinsIllumination);
    playAudio(playerWinsMelody);
    illuminateScoreBox(playerScoreBoxIllumination);
    pointTheWinner(playerWinsIllumination, playerScoreBoxIllumination);
    newgameBtnIllumination.classList.add("illuminate--bg");
  } else if (computerActualScore === 5) {
    disableButtons();
    newgameBtn.removeEventListener("click", play);
    pulsate(computerWinsIllumination);
    playAudio(computerWinsMelody);
    illuminateScoreBox(computerScoreBoxIllumination);
    pointTheWinner(computerWinsIllumination, computerScoreBoxIllumination);
    newgameBtnIllumination.classList.add("illuminate--bg");
  } else {
    newgameBtn.addEventListener("click", startNewGame);
    paperBtnIllumination.classList.add("illuminate--bg");
    rockBtnIllumination.classList.add("illuminate--bg");
    scissorsBtnIllumination.classList.add("illuminate--bg");
  
    paperBtn.onclick = () => {  
      disableButtons();
      round("paper");
    }
    rockBtn.onclick = () => {
      disableButtons();
      round("rock");
    }
    scissorsBtn.onclick = () => {
      disableButtons();
      round("scissors");
    }
  }
}

// Game round - decides who gets a point
function round(choice) {
  let choiceYou = choice;
  if (choiceYou == "paper") {
    playerSelectedPaperIndicator.classList.add("illuminate--bg");
  } else if (choiceYou == "rock") {
    playerSelectedRockIndicator.classList.add("illuminate--bg");
  } else {
    playerSelectedScissorsIndicator.classList.add("illuminate--bg");
  }

  let choiceCpu = drawCpu();
  if (choiceCpu == "paper") {
    computerDrewPaperIndicator.classList.add("illuminate--bg");
  } else if (choiceCpu == "rock") {
    computerDrewRockIndicator.classList.add("illuminate--bg");
  } else {
    computerDrewScissorsIndicator.classList.add("illuminate--bg");
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

// Actions after getting a point or in case of a draw
function pointForYou() {
  disableButtons();
  pulsate(playerGetsPointIllumination);
  illuminateScoreBox(playerScoreBoxIllumination);
  ++playerActualScore;
  document.getElementById(`score--you--${playerActualScore}`).scrollIntoView();
  setTimeout ( () => {illuminationsOff()}, 1500);
  setTimeout ( () => {buttonsReady()}, 1500);
}

function pointForCpu() {
  disableButtons();
  pulsate(computerGetsPointIllumination);
  illuminateScoreBox(computerScoreBoxIllumination);
  ++computerActualScore;  
  document.getElementById(`score--cpu--${computerActualScore}`).scrollIntoView();
  setTimeout ( () => {illuminationsOff()}, 1500);
  setTimeout ( () => {buttonsReady()}, 1500);
}

function noPoints() {
  disableButtons();
  pulsate(playerDrawsIllumination);
  pulsate(computerDrawsIllumination);
  setTimeout ( () => {illuminationsOff()}, 1500);
  setTimeout ( () => {buttonsReady()}, 1500);
}


