function computerPlay() {
  const choices = ["paper", "rock", "scissors"];
  let random = Math.floor(Math.random()*3);
  return choices[random];
}

function playerPlay() {
  let playerChoice = prompt("Type: 'paper', 'rock' or 'scissors'.").toLocaleLowerCase();
  return playerChoice;
}

function round() {
  let playerSelection = playerPlay();
  let computerSelection = computerPlay();
  console.log(`You: ${playerSelection}`);
  console.log(`Computer: ${computerSelection}`);

  switch (playerSelection) {
    
    case 'paper':
      if (computerSelection == "rock") {
        console.log("You win!");
      } else if (computerSelection == "scissors") {
        console.log("You loose!");
      } else {
        console.log("It's a draw!");
      }
      break;

    case 'rock':
      if (computerSelection == "scissors") {
        console.log("You win!");
      } else if (computerSelection == "paper") {
        console.log("You loose!");
      } else {
        console.log("It's a draw!");
      }
      break;

    case 'scissors':
      if (computerSelection == "paper") {
        console.log("You win!");
      } else if (computerSelection == "rock") {
        console.log("You loose!");
      } else {
        console.log("It's a draw!");
      }
      break;

    default:
      console.log("You have to type: 'paper', 'rock' or 'scissors'.")
  }
}

