//// DOM ELEMENTS

// Ins is for inside/clickable part of button
// Out is for outer/illuminable part of button
const btnStartIns = document.getElementById("button--start--ins");
const btnStartOut = document.getElementById("button--start--out");
const btnPaperIns = document.getElementById("button--paper--ins");
const btnPaperOut = document.getElementById("button--paper--out");
const btnRockIns = document.getElementById("button--rock--ins");
const btnRockOut = document.getElementById("button--rock--out");
const btnScissorsIns = document.getElementById("button--scissors--ins");
const btnScissorsOut = document.getElementById("button--scissors--out");
const btnQuestion = document.getElementById("button--question");  // click it to open modalBox/show game rules
const btnSound = document.getElementById("button--sound"); // click it to unmute/mute sounds
const btnSoundOn = document.getElementById("sound--on");  // visible when sounds are unmuted
const btnSoundOff = document.getElementById("sound--off"); // visible when sounds are muted
const modalBox = document.getElementById("modalBox");  // to show game rules after click on btnQuestion
const btnCloseModal = document.getElementById("modalBoxClose");

// illuminated indicators show your's and computer's choice
const indicatorPaperCpu = document.getElementById("indicator--paper--cpu");
const indicatorPaperYou = document.getElementById("indicator--paper--you");
const indicatorRockYou = document.getElementById("indicator--rock--you");
const indicatorRockCpu = document.getElementById("indicator--rock--cpu");
const indicatorScissorsYou = document.getElementById("indicator--scissors--you");
const indicatorScissorsCpu = document.getElementById("indicator--scissors--cpu");

// illuminable elements to indicate results
const signalWinYou = document.getElementById("whoWins--you");
const signalWinCpu = document.getElementById("whoWins--cpu");
const signalPointYou = document.getElementById("pointFor--you");
const signalPointCpu = document.getElementById("pointFor--cpu");
const signalDrawYou = document.getElementById("draw--you");
const signalDrawCpu = document.getElementById("draw--cpu");
const signalScoreBoxYou = document.getElementById("scoreBox--you");
const signalScoreBoxCpu = document.getElementById("scoreBox--cpu");

const soundStart = document.getElementById("sound__start");  // plays after clicking btnStartIns/'new game'
const soundWinYou = document.getElementById("sound__win--you");  // plays after you win/score 5 points 
const soundWinCpu = document.getElementById("sound__win--cpu");  // plays after computer wins/score 5 points

// score counts, used i.a. to move scoreBox__display
let scoreYou = 0;
let scoreCpu = 0;


//// GAME FUNCTIONS

// start() executed on page load
start();

function start() {
  btnStartOut.classList.add("illuminate--bg");
  muteSounds();
  btnStartIns.addEventListener("click", play);
}

function play() {
  playAudio(soundStart);
  trunOffStart();
  buttonsReady();
}

// When want to cancel current and start new game
function startNewGame() {
  clean();
  playAudio(soundStart);
  setTimeout (buttonsReady, 1200);
}

// Computer draws it's choice
function drawCpu() {
  const choices = ["paper", "rock", "scissors"];
  let draw = Math.floor(Math.random() * 3);
  return choices[draw];
}

// Turn off start button
function trunOffStart() {
  btnStartOut.classList.remove("illuminate--bg");
}

// Cleaning functions to switch off all illuminations
function illuminationsOff() {
  let illuminated = document.getElementsByClassName("illuminate");
  while (illuminated.length)
      illuminated[0].classList.remove("illuminate");
  let illuminatedBg = document.getElementsByClassName("illuminate--bg");
  while (illuminatedBg.length)
      illuminatedBg[0].classList.remove("illuminate--bg");
}

// Zero scores and so display "0" on scoreBox__display
function zeroScores() {
  scoreYou = 0;
  scoreCpu = 0;
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
  btnPaperIns.onclick = null;
  btnRockIns.onclick = null;
  btnScissorsIns.onclick = null;
  btnPaperOut.classList.remove("illuminate--bg");
  btnRockOut.classList.remove("illuminate--bg");
  btnScissorsOut.classList.remove("illuminate--bg");
}

function playAudio(sound) {
  sound.play();
}

// Unmute audio
function playSounds() {
  soundStart.muted = false;
  soundWinYou.muted = false;
  soundWinCpu.muted = false;
}

btnSoundOff.addEventListener("click", () => {
  playSounds();
  btnSoundOn.classList.toggle("displayNone");
  btnSoundOff.classList.toggle("displayNone");
})

// Mute audio
function muteSounds() {
  soundStart.muted = true;
  soundWinYou.muted = true;
  soundWinCpu.muted = true;
}

btnSoundOn.addEventListener("click", () => {
  muteSounds();
  btnSoundOn.classList.toggle("displayNone");
  btnSoundOff.classList.toggle("displayNone");
})

// Show game rules / open modalBox
function modalBoxVisibility() {
  modalBox.classList.toggle("displayNone");
}

btnQuestion.onclick = () => {
  modalBoxVisibility();
}

modalBox.addEventListener("click", modalBoxVisibility);

// Buttons ready - prepares buttons for game round and handles player's choice
// Chcecks if somebody already has 5 points and wins the game
function buttonsReady() {
  if (scoreYou === 5) {
    disableButtons();
    btnStartIns.removeEventListener("click", play);
    pulsate(signalWinYou);
    playAudio(soundWinYou);
    illuminateScoreBox(signalScoreBoxYou);
    pointTheWinner(signalWinYou, signalScoreBoxYou);
    btnStartOut.classList.add("illuminate--bg");
  } else if (scoreCpu === 5) {
    disableButtons();
    btnStartIns.removeEventListener("click", play);
    pulsate(signalWinCpu);
    playAudio(soundWinCpu);
    illuminateScoreBox(signalScoreBoxCpu);
    pointTheWinner(signalWinCpu, signalScoreBoxCpu);
    btnStartOut.classList.add("illuminate--bg");
  } else {
    btnStartIns.addEventListener("click", startNewGame);
    btnPaperOut.classList.add("illuminate--bg");
    btnRockOut.classList.add("illuminate--bg");
    btnScissorsOut.classList.add("illuminate--bg");
  
    btnPaperIns.onclick = () => {  
      disableButtons();
      round("paper");
    }
    btnRockIns.onclick = () => {
      disableButtons();
      round("rock");
    }
    btnScissorsIns.onclick = () => {
      disableButtons();
      round("scissors");
    }
  }
}

// Game round - decides who gets a point
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

// Actions after getting a point or in case of a draw
function pointForYou() {
  disableButtons();
  pulsate(signalPointYou);
  illuminateScoreBox(signalScoreBoxYou);
  ++scoreYou;
  document.getElementById(`score--you--${scoreYou}`).scrollIntoView();
  setTimeout ( () => {illuminationsOff()}, 1500);
  setTimeout ( () => {buttonsReady()}, 1500);
}

function pointForCpu() {
  disableButtons();
  pulsate(signalPointCpu);
  illuminateScoreBox(signalScoreBoxCpu);
  ++scoreCpu;  
  document.getElementById(`score--cpu--${scoreCpu}`).scrollIntoView();
  setTimeout ( () => {illuminationsOff()}, 1500);
  setTimeout ( () => {buttonsReady()}, 1500);
}

function noPoints() {
  disableButtons();
  pulsate(signalDrawYou);
  pulsate(signalDrawCpu);
  setTimeout ( () => {illuminationsOff()}, 1500);
  setTimeout ( () => {buttonsReady()}, 1500);
}



