"use strict";

function Time() {
  this.time = new Date();
  this.hour = this.time.getHours();
  this.minute = this.time.getMinutes();
  this.second = this.time.getSeconds();

  this.year = this.time.getFullYear();
  this.month = this.time.getMonth() + 1;
  this.day = this.time.getDate();
}

function setDate() {
  const date = new Time();
  const dateParagraf = document.getElementById("date");
  let month = date.month;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.day;
  if (day < 10) {
    day = `0${day}`;
  }
  dateParagraf.textContent = `${date.year}-${month}-${day}`;
}

function setTime() {
  const time = new Time();
  const hours = document.getElementById("hour");
  const minutes = document.getElementById("minute");
  const seconds = document.getElementById("second");

  hours.textContent = `${time.hour}:`;
  if (time.hour < 10) {
    hours.textContent = `0${time.hour}:`;
  }
  minutes.textContent = `${time.minute}:`;
  if (time.minute < 10) {
    minutes.textContent = `0${time.minute}:`;
  }

  seconds.textContent = `${time.second}`;
  if (time.second < 10) {
    seconds.textContent = `0${time.second}`;
  }

  if (time.hour === "0" && time.minute === "0" && time.second === "0") {
    setDate();
    
  }
 transform();
}

function transform (){
  let element = document.getElementById("container");
  console.log(element)
  element.style.transition = "all 0.25s ease";
  element.style.transform = "scale(1.005)";

  setTimeout(() => {
    element.style.transform = "scale(1)";
  }, 500);
  
}

setDate();
setTime();

setInterval(setTime, 1000);
