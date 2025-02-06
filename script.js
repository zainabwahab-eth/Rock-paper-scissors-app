const rockBtn = document.querySelector(".rock-btn");
const paperBtn = document.querySelector(".paper-btn");
const scissorsBtn = document.querySelector(".scissors-btn");
const closeBtn = document.querySelector(".close-btn");
const rulesBtn = document.querySelector(".rules-btn");
const playAgainBtn = document.querySelector(".play-again-btn");

const gameNotPicked = document.querySelector(".game-notpicked");
const gamePicked = document.querySelector(".game-picked");
const userPickCntn = document.querySelector(".user-pick");
const userImage = document.querySelector(".user-img");
const housePickCntn = document.querySelector(".house-pick");
const houseImage = document.querySelector(".house-img");
const resultCntn = document.querySelector(".result-cntn");
const resultText = document.querySelector(".result-text");
const scoreUser = document.querySelector(".user-score");
const scoreHouse = document.querySelector(".house-score");
const rulesModal = document.querySelector(".rules-modal");
const overlay = document.querySelector(".overlay");
const roundResultCntn = document.querySelector(".round-result");
const roundResult = document.querySelector(".round-result-text");
const roundNumber = document.querySelector(".round-number");

let userScore = 0;
let houseScore = 0;
let userPick = "";
let round = 0;

const resetGame = function () {
  userScore = 0;
  houseScore = 0;
  userPick = "";
  house = "";
  round = 0;
  scoreHouse.textContent = 0;
  scoreUser.textContent = 0;
  userPickCntn.style.opacity = 0;
  housePickCntn.style.opacity = 0;
  roundNumber.textContent = round + 1;
  gamePicked.classList.add("hidden");
  roundResultCntn.classList.add("hidden");
  gameNotPicked.classList.remove("hidden");
};

// Open rules modal
const openModal = function () {
  rulesModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

// Close rules modal
const closeModal = function () {
  rulesModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Get random pick for house
const getHousePick = function () {
  const options = ["rock", "paper", "scissors"];
  const index = Math.floor(Math.random() * options.length);
  return options[index];
};

// Display house pick choice to the screen
const displayHousePicks = function () {
  house = getHousePick();
  setTimeout(function () {
    housePickCntn.style.opacity = 100;
    housePickCntn.classList.add(`${house}`);
    houseImage.src = `images/icon-${house}.svg`;
  }, 1000);

  return house;
};

//Check if user won
const hasuserWon = function(user, house) {
  return (
    (user === "rock" && house === "scissors") ||
    (user === "scissors" && house === "paper") ||
    (user === "paper" && house === "rock")
  );
}

// Display the round result
const displayResult = function (user, house) {
  if (hasuserWon(user, house)) {
    resultCntn.classList.remove("hidden");
    resultText.textContent = "You Win";
    userScore++;
    scoreUser.textContent = userScore;
  } else if (user === house) {
    resultCntn.classList.remove("hidden");
    resultText.textContent = "It's a tie";
  } else {
    resultCntn.classList.remove("hidden");
    resultText.textContent = "House Wins";
    houseScore++;
    scoreHouse.textContent = houseScore;
  }
};

// Display UI
const displayUserPicks = function () {
  gameNotPicked.classList.add("hidden");
  gamePicked.classList.remove("hidden");
  userPickCntn.style.opacity = 100;
  userImage.src = `images/icon-${userPick}.svg`;
  userPickCntn.classList.add(`${userPick}`);
  round++;

  const house = displayHousePicks();
  setTimeout(function () {
    displayResult(userPick, house);
  }, 2000);

  if (round < 5) {
    setTimeout(function () {
      roundNumber.textContent = round + 1;
      gameNotPicked.classList.remove("hidden");
      gamePicked.classList.add("hidden");
      userPickCntn.classList.remove(`${userPick}`);
      housePickCntn.classList.remove(`${house}`);
      housePickCntn.style.opacity = 0;
      houseImage.src = "";
      resultText.textContent = "";
    }, 4000);
  }
  if (round === 5) {
    setTimeout(function () {
      resultText.textContent = "";
      roundResultCntn.classList.remove("hidden");
      housePickCntn.style.opacity = 0;
      userPickCntn.style.opacity = 0;
      if (userScore > houseScore) {
        roundResult.textContent = "You win the game";
      } else if (userScore < houseScore) {
        roundResult.textContent = "House wins the game";
      } else {
        roundResult.textContent = "The game Ended with a tie";
      }
    }, 4000);
  }
};

// Event Listeners
rockBtn.addEventListener("click", function () {
  userPick = "rock";
  displayUserPicks();
});

paperBtn.addEventListener("click", function () {
  userPick = "paper";
  displayUserPicks();
});

scissorsBtn.addEventListener("click", function () {
  userPick = "scissors";
  displayUserPicks();
});

playAgainBtn.addEventListener("click", resetGame);

rulesBtn.addEventListener("click", openModal);

closeBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);
