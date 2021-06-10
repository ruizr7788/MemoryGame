"use strict";

// selectors
const roundEl = document.getElementById("round");
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

// console.log(round);
// console.log(score);
// console.log(allBoxes);
// console.log(box1);
// console.log(box2);
// console.log(box3);
// console.log(box4);

// game state ---------------------------------------

let gameInPlay = false;
let round = 1;
let score = 0;
// reset user sequence after each round
let userSequence = [];
let computerSequenceGlobal = [];

setRoundText();
setScore();

// functions ----------------------------------------
// sequencing -------------------------
function userSequenceChecker(curRound, computerSequence) {
  setTimeout(() => {
    if (JSON.stringify(userSequence) == JSON.stringify(computerSequence)) {
      switch (curRound) {
        case 1:
          round++;
          score += 20;
          round2();
          break;
        case 2:
          round++;
          score += 30;
          round3();
          break;
        case 3:
          round++;
          score += 40;
          round4();
          break;
        case 4:
          round++;
          score += 50;
          round5();
          break;
        case 5:
          round++;
          score += 55;
          round6();
          break;
        case 6:
          round++;
          score += 55;
          round7();
          break;
        case 7:
          round++;
          score += 60;
          round8();
          break;
        case 8:
          round++;
          score += 60;
          round9();
          break;
        case 9:
          round++;
          score += 100;
          round10();
          break;
      }
    } else {
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
        box.style.opacity = ".5";
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
function losingDisplay() {
  bodyEl.style.backgroundColor = "red";
  countdownEl.textContent = "You Lose";
  allBoxes.forEach((box) => {
    box.style.backgroundColor = "#fff";
    box.style.opacity = 1;
  });
}
function resetGame() {
  gameInPlay = true;

  userSequence = [];
  computerSequenceGlobal = [];

  scoreEl.textContent = "0";
  score = 0;

  roundEl.textContent = "1";
  round = 1;

  bodyEl.style.backgroundColor = "black";
  countdownEl.textContent = "?";
  box1.style.backgroundColor = "yellow";
  box2.style.backgroundColor = "red";
  box3.style.backgroundColor = "blue";
  box4.style.backgroundColor = "green";
  allBoxes.forEach((box) => {
    box.style.opacity = 0.5;
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
        setTimeout(() => (allBoxes[arrayElement].style.opacity = ".5"), 500);
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
        setTimeout(() => (allBoxes[arrayElement].style.opacity = ".5"), 500);
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
        setTimeout(() => (allBoxes[arrayElement].style.opacity = ".5"), 500);
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
        setTimeout(() => (allBoxes[arrayElement].style.opacity = ".5"), 500);
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
        setTimeout(() => (allBoxes[arrayElement].style.opacity = ".5"), 500);
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
  }, 19000);
}

// add a sound everytime the current box is highlighted (when opacity is set to one)
// event listeners --------------------------------------
startBTN.addEventListener("click", function () {
  resetGame();
  gameInPlay = true;
  if (gameInPlay === true) {
    round1();
  }
});
userSequenceRecorder();

resetBTN.addEventListener("click", resetGame);