"use strict";

// selectors
const roundEl = document.getElementById("round");
const highscoreEl = document.getElementById("highscore");
const scoreEl = document.getElementById("score");
const allBoxes = document.querySelectorAll(".box");
const box1 = document.querySelector(".box-0");
const box2 = document.querySelector(".box-1");
const box3 = document.querySelector(".box-2");
const box4 = document.querySelector(".box-3");
const startBTN = document.getElementById("start");
const resetBTN = document.getElementById("reset");
const bodyEl = document.getElementById("body");
const countdownEl = document.getElementById("countdown");

// dynamic variables --------------------------------

const dimOpacity = "0.7";

// game state ---------------------------------------

let gameInPlay = false;
// set to round 1 after testing
let round = 1;
let highscore = 0;
let score = 0;
// reset user sequence after each round
let userSequence = [];
let computerSequenceGlobal = [];

setRoundText();
setScore();
setHighscore();

// functions ----------------------------------------
// sequencing -------------------------
function userSequenceChecker(curRound, computerSequence) {
  setTimeout(() => {
    if (JSON.stringify(userSequence) == JSON.stringify(computerSequence)) {
      switch (curRound) {
        case 1:
          score += 20;
          round++;
          round2();
          break;
        case 2:
          round++;
          score += 40;
          round3();
          break;
        case 3:
          round++;
          score += 80;
          round4();
          break;
        case 4:
          round++;
          score += 160;

          round5();
          break;
        case 5:
          round++;
          score += 320;
          round6();
          break;
        case 6:
          round++;
          score += 640;
          round7();
          break;
        case 7:
          round++;
          score += 1280;
          round8();
          break;
        case 8:
          round++;
          score += 2560;
          round9();
          break;
        case 9:
          round++;
          score += 5020;
          round10();
          break;
        case 10:
          score += 10040;
          winDisplay();
      }
    } else {
      setHighscore();
      losingDisplay();
      gameInPlay = false;
    }
  }, countdownTimer(round));
}
function userSequenceRecorder() {
  allBoxes.forEach((box) => {
    box.addEventListener("click", function () {
      const currBox = box.classList[1];
      currBox == "box-0" && userSequence.push(0);
      currBox == "box-1" && userSequence.push(1);
      currBox == "box-2" && userSequence.push(2);
      currBox == "box-3" && userSequence.push(3);
      box.style.opacity = "1";
      setTimeout(() => {
        box.style.opacity = dimOpacity;
      }, 230);
    });
  });
}

// UI  ---------------------------------------------------------
function setRoundText() {
  roundEl.textContent = round;
}
function setScore() {
  scoreEl.textContent = score;
}
function setHighscore() {
  if (score > highscore) {
    highscore = score;
  }
  highscoreEl.textContent = highscore;
}
function winDisplay() {
  bodyEl.style.background = "linear-gradient(90deg, #27ae60, #2ecc71)";
  countdownEl.textContent = "You Win!";
  allBoxes.forEach((box) => {
    box.style.backgroundColor = "#fff";
    box.style.opacity = 1;
  });
}
function losingDisplay() {
  bodyEl.style.background = "linear-gradient(90deg, #c0392b, #e74c3c)";
  countdownEl.textContent = "You Lose";
}
function resetGame() {
  gameInPlay = true;

  userSequence = [];
  computerSequenceGlobal = [];

  roundEl.textContent = "1";
  round = 1;

  scoreEl.textContent = "0";
  score = 0;

  bodyEl.style.background = "linear-gradient(90deg, #e67e22, #f1c40f)";
  countdownEl.textContent = "?";
  box1.style.backgroundColor = "yellow";
  box2.style.backgroundColor = "red";
  box3.style.backgroundColor = "blue";
  box4.style.backgroundColor = "green";
  allBoxes.forEach((box) => {
    box.style.opacity = dimOpacity;
  });
}
// lighting up boxes -------------------------
function countdownTimer(round) {
  if (round <= 2) {
    let timeLeft = 5;
    const contdown = setInterval(() => {
      if (timeLeft < 0) {
        clearInterval(countdown);
      } else {
        countdownEl.textContent = timeLeft;
        timeLeft -= 1;
      }
    }, 1000);
    return 6000;
  }
  if (round <= 5 && round > 2) {
    let timeLeft = 8;
    const contdown = setInterval(() => {
      if (timeLeft < 0) {
        clearInterval(countdown);
      } else {
        countdownEl.textContent = timeLeft;
        timeLeft -= 1;
      }
    }, 1000);
    return 9000;
  }
  if (round <= 7 && round > 5) {
    let timeLeft = 8;
    const contdown = setInterval(() => {
      if (timeLeft < 0) {
        clearInterval(countdown);
      } else {
        countdownEl.textContent = timeLeft;
        timeLeft -= 1;
      }
    }, 1000);
    return 9000;
  }
  if (round <= 10 && round > 7) {
    let timeLeft = 10;
    const contdown = setInterval(() => {
      if (timeLeft < 0) {
        clearInterval(countdown);
      } else {
        countdownEl.textContent = timeLeft;
        timeLeft -= 1;
      }
    }, 1000);
    return 11000;
  }
}

function sequenceGenerator(q) {
  // create an array with q length with numbers between 0-3
  const sequence = Array.from({ length: q }, (_) =>
    Math.floor(Math.random() * 4)
  );
  return sequence;
}
function loopThroughArray(arr, callback, interval) {
  let newLoopTimer = new LoopTimer(function (time) {
    if (arr.length !== 0) {
      let element = arr.shift();
      callback(element, time - start);
      computerSequenceGlobal.push(element);
      // arr.push(element);
    }
  }, interval);

  if (arr.length !== 0) {
    let start = newLoopTimer.start();
  }
}
// timer
function LoopTimer(render, interval) {
  let timeout;
  let lastTime;

  this.start = startLoop;
  this.stop = stopLoop;

  //   start loop
  function startLoop() {
    timeout = setTimeout(createLoop, 0);
    lastTime = Date.now();
    return lastTime;
  }
  //   stop loop
  function stopLoop() {
    clearTimeout(timeout);
    return lastTime;
  }

  //   loop
  function createLoop() {
    let thisTime = Date.now();
    let loopTime = thisTime - lastTime;
    let delay = Math.max(interval - loopTime, 0);
    timeout = setTimeout(createLoop, delay);
    lastTime = thisTime + delay;
    render(thisTime);
  }
}

// rounds ------------------------------------
function round1() {
  const computerSequence = sequenceGenerator(3);

  setTimeout(() => {
    loopThroughArray(
      computerSequence,
      function (arrayElement) {
        allBoxes[arrayElement].style.opacity = "1";
        setTimeout(
          () => (allBoxes[arrayElement].style.opacity = dimOpacity),
          500
        );
      },
      1000
    );
  }, 1500);
  setTimeout(() => {
    // userSequenceRecorder();
    userSequenceChecker(1, computerSequenceGlobal);
  }, 3300);
  setTimeout(() => {
    setRoundText();
    setScore();
    setHighscore();
  }, 10500);
}

function round2() {
  userSequence = [];
  computerSequenceGlobal = [];
  const computerSequence = sequenceGenerator(4);

  setTimeout(() => {
    loopThroughArray(
      computerSequence,
      function (arrayElement) {
        allBoxes[arrayElement].style.opacity = "1";
        setTimeout(
          () => (allBoxes[arrayElement].style.opacity = dimOpacity),
          500
        );
      },
      1000
    );
  }, 2500);

  setTimeout(() => {
    // userSequenceRecorder();
    userSequenceChecker(2, computerSequenceGlobal);
  }, 5250);

  setTimeout(() => {
    setRoundText();
    setScore();
    setHighscore();
  }, 12190);
}

function round3() {
  userSequence = [];
  computerSequenceGlobal = [];
  const computerSequence = sequenceGenerator(5);

  setTimeout(() => {
    loopThroughArray(
      computerSequence,
      function (arrayElement) {
        allBoxes[arrayElement].style.opacity = "1";
        setTimeout(
          () => (allBoxes[arrayElement].style.opacity = dimOpacity),
          500
        );
      },
      1000
    );
  }, 2500);

  setTimeout(() => {
    userSequenceChecker(3, computerSequenceGlobal);
  }, 6000);

  setTimeout(() => {
    setRoundText();
    setScore();
    setHighscore();
  }, 16000);
}

function round4() {
  userSequence = [];
  computerSequenceGlobal = [];
  const computerSequence = sequenceGenerator(6);

  setTimeout(() => {
    loopThroughArray(
      computerSequence,
      function (arrayElement) {
        allBoxes[arrayElement].style.opacity = "1";
        setTimeout(
          () => (allBoxes[arrayElement].style.opacity = dimOpacity),
          500
        );
      },
      1000
    );
  }, 2500);

  setTimeout(() => {
    userSequenceChecker(4, computerSequenceGlobal);
  }, 7500);

  setTimeout(() => {
    setRoundText();
    setScore();
    setHighscore();
  }, 17500);
}

function round5() {
  userSequence = [];
  computerSequenceGlobal = [];
  const computerSequence = sequenceGenerator(7);

  setTimeout(() => {
    loopThroughArray(
      computerSequence,
      function (arrayElement) {
        allBoxes[arrayElement].style.opacity = "1";
        setTimeout(
          () => (allBoxes[arrayElement].style.opacity = dimOpacity),
          500
        );
      },
      1000
    );
  }, 2500);

  setTimeout(() => {
    userSequenceChecker(5, computerSequenceGlobal);
  }, 9000);

  setTimeout(() => {
    setRoundText();
    setScore();
    setHighscore();
  }, 19000);
}

function round6() {
  userSequence = [];
  computerSequenceGlobal = [];
  const computerSequence = sequenceGenerator(8);

  setTimeout(() => {
    loopThroughArray(
      computerSequence,
      function (arrayElement) {
        allBoxes[arrayElement].style.opacity = "1";
        setTimeout(
          () => (allBoxes[arrayElement].style.opacity = dimOpacity),
          500
        );
      },
      1000
    );
  }, 2500);

  setTimeout(() => {
    userSequenceChecker(6, computerSequenceGlobal);
  }, 10500);

  setTimeout(() => {
    setRoundText();
    setScore();
    setHighscore();
  }, 20500);
}

function round7() {
  userSequence = [];
  computerSequenceGlobal = [];
  const computerSequence = sequenceGenerator(9);

  setTimeout(() => {
    loopThroughArray(
      computerSequence,
      function (arrayElement) {
        allBoxes[arrayElement].style.opacity = "1";
        setTimeout(
          () => (allBoxes[arrayElement].style.opacity = dimOpacity),
          500
        );
      },
      1000
    );
  }, 2500);

  setTimeout(() => {
    userSequenceChecker(7, computerSequenceGlobal);
  }, 12000);

  setTimeout(() => {
    setRoundText();
    setScore();
    setHighscore();
  }, 23000);
}

function round8() {
  userSequence = [];
  computerSequenceGlobal = [];
  const computerSequence = sequenceGenerator(9);

  setTimeout(() => {
    loopThroughArray(
      computerSequence,
      function (arrayElement) {
        allBoxes[arrayElement].style.opacity = "1";
        setTimeout(
          () => (allBoxes[arrayElement].style.opacity = dimOpacity),
          500
        );
      },
      1000
    );
  }, 2500);

  setTimeout(() => {
    userSequenceChecker(8, computerSequenceGlobal);
  }, 13500);

  setTimeout(() => {
    setRoundText();
    setScore();
    setHighscore();
  }, 24500);
}

function round9() {
  userSequence = [];
  computerSequenceGlobal = [];
  const computerSequence = sequenceGenerator(10);

  setTimeout(() => {
    loopThroughArray(
      computerSequence,
      function (arrayElement) {
        allBoxes[arrayElement].style.opacity = "1";
        setTimeout(
          () => (allBoxes[arrayElement].style.opacity = dimOpacity),
          500
        );
      },
      1000
    );
  }, 2500);

  setTimeout(() => {
    userSequenceChecker(9, computerSequenceGlobal);
  }, 15000);

  setTimeout(() => {
    setRoundText();
    setScore();
    setHighscore();
  }, 26000);
}

function round10() {
  userSequence = [];
  computerSequenceGlobal = [];
  const computerSequence = sequenceGenerator(11);

  setTimeout(() => {
    loopThroughArray(
      computerSequence,
      function (arrayElement) {
        allBoxes[arrayElement].style.opacity = "1";
        setTimeout(
          () => (allBoxes[arrayElement].style.opacity = dimOpacity),
          500
        );
      },
      1000
    );
  }, 2500);

  setTimeout(() => {
    userSequenceChecker(10, computerSequenceGlobal);
  }, 16500);

  setTimeout(() => {
    setRoundText();
    setScore();
    setHighscore();
  }, 27500);
}

// add a sound everytime the current box is highlighted (when opacity is set to one)
// event listeners --------------------------------------
startBTN.addEventListener("click", function () {
  resetGame();
  gameInPlay = true;
  if (gameInPlay === true) {
    // set to round one after testing
    round1();
  }
});
userSequenceRecorder();

document.addEventListener("keyup", function (event) {
  if (gameInPlay === false && event.key === "s") {
    resetGame();
    gameInPlay = true;
    if (gameInPlay === true) {
      round1();
    }
  }
});

resetBTN.addEventListener("click", resetGame);
