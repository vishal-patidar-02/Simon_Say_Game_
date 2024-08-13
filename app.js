let gameSeq = [];
let userSeq = [];

let btns = ["one", "two", "three", "four"];

let started = false;
let level = 0;
let heigth_score = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", () => {
  if (started == false) {
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("gameFlash");
  setTimeout(function () {
    btn.classList.remove("gameFlash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  if(level > heigth_score){
    heigth_score = level;
    saveData();
  }
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randNumber = btns[randIdx];
  let randBtn = document.querySelector(`.${randNumber}`);
  gameSeq.push(randNumber);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your Score was : <b>${level}</b><br>The Heighest Score of Game is : <b>${heigth_score}<b> <br> <u>Press any key to Restart<u> `;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "#f9f9f9";
    }, 150);
    reset();
  }
}

function btnpress() {
  let btn = this;
  userFlash(btn);

  userNumber = btn.getAttribute("id");
  userSeq.push(userNumber);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnpress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

function saveData() {
  localStorage.setItem("GameData", heigth_score);
}

function showData() {
  heigth_score = localStorage.getItem("GameData");
}

showData();