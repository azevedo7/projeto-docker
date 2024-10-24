const words = ["apple", "grape", "peach", "melon", "berry"];
let currentGuess = "";
let attempts = 0;
const maxAttempts = 6;

let answer = '';
const gameBoard = document.getElementById("game-board");
const guessInput = document.getElementById("guess-input");
const submitGuessBtn = document.getElementById("submit-guess");

function fetchWord() {
    fetch("/random-word")
        .then(response => response.json())
        .then(data => {
            answer = data.word.trim().toLowerCase();
        })
        .catch(error => console.log(error));
};

fetchWord();

function checkGuess() {
  if (currentGuess.length !== 5) {
    alert("Please enter a 5-letter word.");
    return;
  }

  attempts++;
  const resultRow = document.createElement("div");

  for (let i = 0; i < 5; i++) {
    const letter = document.createElement("div");
    letter.innerText = currentGuess[i];

    if (currentGuess[i] === answer[i]) {
      letter.classList.add("correct");
    } else if (answer.includes(currentGuess[i])) {
      letter.classList.add("present");
    } else {
      letter.classList.add("absent");
    }

    resultRow.appendChild(letter);
  }

  gameBoard.appendChild(resultRow);

  if (currentGuess === answer) {
    alert("Congratulations! You've guessed the word!");
    submitGuessBtn.disabled = true;
  } else if (attempts >= maxAttempts) {
    alert(`Game Over! The word was: ${answer}`);
    submitGuessBtn.disabled = true;
  }

  guessInput.value = "";
  currentGuess = "";
}

submitGuessBtn.addEventListener("click", () => {
  currentGuess = guessInput.value.toLowerCase();
  checkGuess();
});
