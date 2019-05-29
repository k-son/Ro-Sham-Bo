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
const btnSoundOn = document.getElementById("sound--on");
const btnSoundOff = document.getElementById("sound--off");
const modalBox = document.getElementById("modalBox");
const btnCloseModal = document.getElementById("modalBoxClose");

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

const soundStart = document.getElementById("sound__start");
const soundWinYou = document.getElementById("sound__win--you");
const soundWinCpu = document.getElementById("sound__win--cpu");

let scoreYou = 0;
let scoreCpu = 0;


///// Game play
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


///// Functions
/// Option for new game
function startNewGame() {
  clean();
  playAudio(soundStart);
  setTimeout (buttonsReady, 1200);
}

/// Computer draw
function drawCpu() {
  const choices = ["paper", "rock", "scissors"];
  let draw = Math.floor(Math.random() * 3);
  return choices[draw];
}

/// Turn off start button
function trunOffStart() {
  btnStartOut.classList.remove("illuminate--bg");
}

/// Cleaning functions
function illuminationsOff() {
  let illuminated = document.getElementsByClassName("illuminate");
  while (illuminated.length)
      illuminated[0].classList.remove("illuminate");
  let illuminatedBg = document.getElementsByClassName("illuminate--bg");
  while (illuminatedBg.length)
      illuminatedBg[0].classList.remove("illuminate--bg");
}

function zeroScores() {
  scoreYou = 0;
  scoreCpu = 0;
  setTimeout (function() {document.getElementById("score--you--0").scrollIntoView()}, 10);
  setTimeout (function() {document.getElementById("score--cpu--0").scrollIntoView()}, 600);
}

/// Switch off all illuminations and zero score board
function clean() {
  zeroScores();
  illuminationsOff();
}

/// Pulsat signal
function pulsate(el) {
  el.classList.add("illuminate");
  setTimeout (function() {el.classList.remove("illuminate")}, 300);
  setTimeout (function() {el.classList.add("illuminate")}, 600);
  setTimeout (function() {el.classList.remove("illuminate")}, 900);
  setTimeout (function() {el.classList.add("illuminate")}, 1200);
  setTimeout (function() {el.classList.remove("illuminate")}, 1500);
}

/// Illuminate scoreBox
function illuminateScoreBox(el) {
  el.classList.add("illuminate--bg");
  setTimeout (function() {el.classList.remove("illuminate--bg")}, 1500);
}

/// Keep illuminated signalWin and scoreBox
function pointTheWinner(signal, box) {
  setTimeout (function() {signal.classList.add("illuminate")}, 1500);
  setTimeout (function() {box.classList.add("illuminate--bg")}, 1500);
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

/// Audio
function playAudio(sound) {
  sound.play();
}

/// Mute and unmute audio

function playSounds() {
  soundStart.muted = false;
  soundWinYou.muted = false;
  soundWinCpu.muted = false;
}

function muteSounds() {
  soundStart.muted = true;
  soundWinYou.muted = true;
  soundWinCpu.muted = true;
}

btnSoundOn.addEventListener("click", function() {
  muteSounds();
  btnSoundOn.classList.toggle("displayNone");
  btnSoundOff.classList.toggle("displayNone");
})

btnSoundOff.addEventListener("click", function() {
  playSounds();
  btnSoundOn.classList.toggle("displayNone");
  btnSoundOff.classList.toggle("displayNone");
})



/// Buttons ready - prepare and handle player's choice
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
  
    btnPaperIns.onclick = function() {  
      disableButtons();
      round("paper");
    }
    btnRockIns.onclick = function() {
      disableButtons();
      round("rock");
    }
    btnScissorsIns.onclick = function() {
      disableButtons();
      round("scissors");
    }
  }
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


/// Point for
function pointForYou() {
  disableButtons();
  pulsate(signalPointYou);
  illuminateScoreBox(signalScoreBoxYou);
  ++scoreYou;
  document.getElementById(`score--you--${scoreYou}`).scrollIntoView();
  setTimeout (function() {illuminationsOff()}, 1500);
  setTimeout (function() {buttonsReady()}, 1500);
}

function pointForCpu() {
  disableButtons();
  pulsate(signalPointCpu);
  illuminateScoreBox(signalScoreBoxCpu);
  ++scoreCpu;  
  document.getElementById(`score--cpu--${scoreCpu}`).scrollIntoView();
  setTimeout (function() {illuminationsOff()}, 1500);
  setTimeout (function() {buttonsReady()}, 1500);
}

function noPoints() {
  disableButtons();
  pulsate(signalDrawYou);
  pulsate(signalDrawCpu);
  setTimeout (function() {illuminationsOff()}, 1500);
  setTimeout (function() {buttonsReady()}, 1500);
}


/// Show game rules
function modalBoxVisibility() {
  modalBox.classList.toggle("displayNone");
}

btnQuestion.onclick = function() {
  modalBoxVisibility();
}

modalBox.addEventListener("click", modalBoxVisibility);


