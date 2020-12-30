"use strict";

const hoursSpan = document.getElementById("hour");
const minutesSpan = document.getElementById("minute");
const secondsSpan = document.getElementById("second");
const dateParagraf = document.getElementById("date");

function setDate() {
  const date = new Date();

  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }

  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  dateParagraf.textContent = `${date.getFullYear()}-${month}-${day}`;
}

function setTime() {
  const time = new Date();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  hoursSpan.textContent = `${hour}:`;
  if (hour < 10) {
    hoursSpan.textContent = `0${hour}:`;
  }

  minutesSpan.textContent = `${minute}:`;
  if (minute < 10) {
    minutesSpan.textContent = `0${minute}:`;
  }

  secondsSpan.textContent = `${second}`;
  if (second < 10) {
    secondsSpan.textContent = `0${second}`;
  }

  if (hour === 0 && minute === 0 && second === 0) {
    setDate();
  } else if (minute === 59 && second > 49) {
    transform();
  }
}

//last ten seconds every hour the
function transform() {
  let element = document.getElementById("container");
  element.style.transition = "all 0.1s linear";
  element.style.transform = "scale(1.0025)";
  element.style.backgroundColor = "#f8cbc9";
  element.style.top = "6.1vw";

  setTimeout(() => {
    element.style.transform = "scale(1)";
    element.style.backgroundColor = "#f4afab";
    element.style.top = "6vw";
  }, 500);

  element.style.backgroundColor = "#DAEAD7";
}

setDate();
setTime();

setInterval(setTime, 1000);
