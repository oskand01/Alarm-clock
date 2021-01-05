"use strict";

window.addEventListener("resize", checkDevice);
const hoursSpan = document.getElementById("hour");
const minutesSpan = document.getElementById("minute");
//const secondsSpan = document.getElementById("second");

const alarmContainer = document.getElementById("alarm-container");
const clockContainer = document.querySelector(".clock-container");
const newAlarmButton = document.getElementById("menu");
const saveAlarmButton = document.getElementById("save-alarm-button");
const exitAlarmButton = document.getElementById("exit-alarm-button");
let alarmList = document.getElementById("alarm-list");
let alarms = [];

function Alarm(hour, minute) {
  this.hour = hour;
  this.minute = minute;
  this.alarmTime = `${this.hour}:${this.minute}`;
  this.active = true;
  this.delete = false;
}

function initApp() {
  document.getElementById("date").textContent = getDate();
  setTime();
  uppdateAlarmList();
  initiateNewAlarmButton();
  initiateExitAlarmButton();
  initiateSaveAlarmButton();
  newAlarmButtonFocus();
}

function checkDevice() {
  if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
    let w = window.innerWidth;
    let h = window.innerHeight;
    document.body.style.height = h;

    if (w > h * 1.5) {
      if(document.body.fullscreenElement != null) {
        document.body.addEventListener("click", closeFullscreen);
        
      }
      document.querySelector(".alarm-container").style.height = "45vw;";
      document.body.style.transform = "scale(0.6)";
      document.body.style.height = "100vh";
      document.body.style.position = "relative";
      document.body.style.bottom = "9.5vw";
      document.getElementsByTagName("footer")[0].style.position = "static";
      document.querySelector(".alarm-container").style.minHeight = "18.35vw";
      document.querySelector(".alarm-container").style.minWidth = "100%";
      document.querySelector(".alarm-container").style.marginTop = "0";
    } else {
      document.body.addEventListener("click", openFullscreen)
      document.body.style.transform = "scale(1)";
      document.body.style.height = "100vh";
      document.body.style.position = "static";
      document.getElementsByTagName("footer")[0].style.position = "fixed";
      document.querySelector(".alarm-container").style.minHeight = "75vw";
      document.querySelector(".alarm-container").style.height = "48vw;";
    }
  } else {
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;
    console.log(w, h);
  }
}


//Stolen from w3 schools: https://www.w3schools.com/jsref/met_element_requestfullscreen.asp
function openFullscreen() {
  const body = document.body;
  if (body.requestFullscreen) {
    body.requestFullscreen();
  } else if (body.webkitRequestFullscreen) { /* Safari */
    body.webkitRequestFullscreen();
  } else if (body.msRequestFullscreen) { /* IE11 */
    body.msRequestFullscreen();
  }
  body.removeEventListener("click", openFullscreen);


}

function closeFullscreen() {
  const body = document.body;
  if (body.exitFullscreen) {
    body.exitFullscreen();
  } else if (body.webkitExitFullscreen) { /* Safari */
    body.webkitExitFullscreen();
  } else if (body.mozCancelFullscreen) { /* IE11 */
    body.mozCancelFullscreen();
  }
  body.removeEventListener("click", closeFullscreen);

}

function getDate() {
  const date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${date.getFullYear()}-${month}-${day}`;
}

function initiateNewAlarmButton() {
  newAlarmButton.addEventListener("click", () => {
    alarmContainer.style.display = "block";
    clockContainer.style.display = "none";
    newAlarmButton.style.display = "none";
    exitAlarmButton.style.display = "inline-block";
    fillSelectHour();
    fillSelectMinute();

  });
}

function newAlarmButtonFocus() {
  
  newAlarmButton.style.transition = "0.5s";
  newAlarmButton.style.transform = "scale(1.2)";
  newAlarmButton.style.marginRight = "4vw"
  setTimeout(() => {
    newAlarmButton.style.transform = "scale(1)";
    newAlarmButton.style.transition = "0.3s";
    newAlarmButton.style.marginRight = "3vw"
    newAlarmButton.focus();
  }, 500);
  
}

function fillSelectHour() {
  for (let i = 0; i < 24; i++) {
    document.getElementById("hour-list").appendChild(createHourOption(i));
  }
}

function createHourOption(i) {
  let hourOption = document.createElement("li");
  const hourSelected = document.getElementById("alarm-hour");
  hourOption.className = "alarm-option";

  if (i < 10) {
    hourOption.textContent = `0${i}`;
  } else {
    hourOption.textContent = i;
  }

  hourOption.addEventListener("click", (event) => {
    hourSelected.textContent = event.target.textContent;
    document.getElementById("hour-list").style.display = "none";
    hourSelected.style.display = "inline-block";
  });
  return hourOption;
}

function fillSelectMinute() {
  for (let i = 0; i < 60; i++) {
    document.getElementById("min-list").appendChild(createMinOption(i));
  }
}

function createMinOption(i) {
  const minOption = document.createElement("li");
  const minSelected = document.getElementById("alarm-min");

  minOption.className = "alarm-option";

  if (i < 10) {
    minOption.textContent = `0${i}`;
  } else {
    minOption.textContent = i;
  }

  minOption.addEventListener("click", (event) => {
    minSelected.textContent = event.target.textContent;
    document.getElementById("min-list").style.display = "none";
    minSelected.style.display = "inline-block";
  });
  return minOption;
}

function initiateExitAlarmButton() {
  exitAlarmButton.addEventListener("click", () => {
    returnToDashboard();
  });
}

function returnToDashboard() {
  clockContainer.style.display = "block";
  alarmContainer.style.display = "none";
  alarmContainer.style.backgroundColor = "#F8F1F1";
  alarmContainer.style.opacity = "100%";
  exitAlarmButton.style.display = "none";
  newAlarmButton.style.display = "inline-block";
  resetAlarmInput();
  resetAlarmList();
}

function initiateSaveAlarmButton() {
  saveAlarmButton.addEventListener("click", () => {
    checkAlarmInput();
  });
}

function initSelectedAlarmBtn() {
  document.getElementById("alarm-min");
  document.getElementById("alarm-hour");
}

function resetAlarmList() {
  document.querySelectorAll(".alarm-option").forEach((e) => e.remove());
}

function resetAlarmInput() {
  document.getElementById("min-list").style.display = "block";
  document.getElementById("alarm-min").style.display = "none";
  document.getElementById("hour-list").style.display = "block";
  document.getElementById("alarm-hour").style.display = "none";
  document.getElementById("alarm-hour").textContent = "";
  document.getElementById("alarm-min").textContent = "";
  document.getElementById("alarm-container").style.backgroundColor = "#E4F1E4";
  document.getElementById("alarm-min").style.color = "#3D3D3D"
  document.getElementById("alarm-hour").style.color = "#3D3D3D"
}

function saveAlarmAnimation() {
  alarmContainer.style.backgroundColor = "#8DC087";
  alarmContainer.style.opacity = "0%";
  document.getElementById("alarm-min").style.color = "white";
  document.getElementById("alarm-hour").style.color = "white";
}

function checkAlarmInput() {
  let hour = document.getElementById("alarm-hour").textContent;
  let min = document.getElementById("alarm-min").textContent;

  if (hour === "" || min === "") {
    console.log("funkar")
    alarmContainer.style.backgroundColor = "#BB7777";
    setTimeout(() => {
      alarmContainer.style.backgroundColor = "#E4F1E4";
      setTimeout(() => {
        resetAlarmInput();

      },200);
    }, 200);
    
    

    return;
  } else {
    saveAlarmAnimation();
    createAlarm(hour, min);
    setTimeout(() => {
      resetAlarmInput();
    },500);
    
    
  }
}

function createAlarm(hour, min) {
  console.log(`${hour}:${min}`);
  alarms.push(new Alarm(hour, min));
  setTimeout(() => {
    clearAlarmList();
    returnToDashboard();
  }, 400);
}

function clearAlarmList() {
  document.querySelectorAll(".alarm-list-item").forEach((e) => e.remove());
  uppdateAlarmList();
}

function uppdateAlarmList() {
  if (alarms.length < 1) {
    document.querySelector(".alarm-container").style.display = "none";
  } else {
    document.querySelector(".alarm-container").style.display = "block";
    for (let i = 0; i < alarms.length; i++) {
      if (alarms[i].delete === true) {
        alarms.splice(i, 1);
        clearAlarmList();
      } else if (alarms[i].delete === false) {
        createAlarmElements(alarms[i]);
      }
    }
  }
}

function createAlarmElements(obj) {
  alarmList.prepend(createAlarmListItem(obj));
}

function createAlarmListItem(obj) {
  const alarmListItem = document.createElement("li");
  if (obj.active) {
    alarmListItem.className = "alarm-list-item";
  } else {
    alarmListItem.className = "alarm-list-item alarm-list-item-inactive";
  }

  alarmListItem.appendChild(createActiveButton(obj));
  alarmListItem.appendChild(createAlarmHeader(obj));
  alarmListItem.appendChild(createDeleteAlarmButton(obj));
  return alarmListItem;
}

function createAlarmHeader(obj) {
  const alarmHeader = document.createElement("h5");
  alarmHeader.textContent = obj.alarmTime;
  return alarmHeader;
}

function createActiveButton(obj) {
  const activeButton = document.createElement("button");
  activeButton.className = "alarm-button";
  activeButton.appendChild(createActiveButtonImg(obj));
  initActiveButton(activeButton, obj);
  return activeButton;
}

function initActiveButton(activeButton, obj) {
  activeButton.addEventListener("click", () => {
    if (obj.active) {
      obj.active = false;
      activeButton.childNodes[0].src = "/media/alarm.svg";
      activeButton.parentNode.className =
        "alarm-list-item alarm-list-item-inactive";
    } else {
      obj.active = true;
      activeButton.childNodes[0].src = "/media/alarm-fill.svg";
      activeButton.parentNode.className = "alarm-list-item";
    }
  });
}

function createActiveButtonImg(obj) {
  const activeImg = document.createElement("img");
  if (obj.active === true) {
    activeImg.src = "/media/alarm-fill.svg";
  } else {
    activeImg.src = "/media/alarm.svg";
  }
  return activeImg;
}

function createDeleteAlarmButton(obj) {
  let deleteButton = document.createElement("button");
  deleteButton.className = "alarm-button";
  deleteButton.appendChild(createDeleteAlarmButtonImg());
  initDeleteAlarmButton(deleteButton, obj);
  return deleteButton;
}

function initDeleteAlarmButton(deleteButton, obj) {
  deleteButton.addEventListener("click", () => {
    obj.delete = true;
    clearAlarmList();
  });
}

function createDeleteAlarmButtonImg() {
  const deleteImg = document.createElement("img");
  deleteImg.src = "/media/x.svg";
  return deleteImg;
}

function setTime() {
  const time = new Date();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let second = time.getSeconds();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minute < 10) {
    minute = `0${minute}`;
  }

  if (second < 10) {
    second = `0${second}`;
  }

  hoursSpan.textContent = `${hour}:`;
  minutesSpan.textContent = `${minute}`;
  //secondsSpan.textContent = `${second}`;

  if (hour === "00" && minute === "00" && second === "00") {
    document.getElementById("date").textContent = getDate();
  }
  if (second === "00") {
    const alarmCheck = `${hour}:${minute}`;

    if (checkAlarm(alarmCheck)) {
      console.log(alarmCheck);
      transform();
    }
  }
}

function checkAlarm(alarmCheck) {
  for (let i = 0; i < alarms.length; i++) {
    if (alarms[i].alarmTime === alarmCheck) {
      return true;
    }
  }
  return false;
}
//last ten seconds every hour the
function transform() {
  let element = document.getElementById("container");
  element.style.backgroundColor = "#f8cbc9";

  setTimeout(() => {
    element.style.backgroundColor = "#F1F5F9";
  }, 500);
}

window.addEventListener("DOMContentLoaded", () => {
  checkDevice();
  initApp();
  setInterval(setTime, 1000);
});
