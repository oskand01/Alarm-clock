"use strict";

const alarmContainer = document.getElementById("alarm-container");
const clockContainer = document.querySelector(".clock-container");
const newAlarmButton = document.getElementById("menu");
const saveAlarmButton = document.getElementById("save-alarm-button");
const exitAlarmButton = document.getElementById("exit-alarm-button");
let alarms = [];

function Alarm(hour, minute) {
  this.hour = hour;
  this.minute = minute;
  this.alarmTime = `${this.hour}:${this.minute}`;
  this.color = undefined;
  this.isNew = true;
  this.active = true;
  this.delete = false;
}

function initApp() {
  document.getElementById("date").textContent = getDate();
  setTime();
  uppdateAlarmList();
  initiateNewAlarmButton();
  /*  fillSelectHour();
  fillSelectMinute(); */

  initiateExitAlarmButton();
  initiateSaveAlarmButton();
  newAlarmButtonFocus();
}

function checkDevice() {
  let w;
  let h;

  if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
    w = window.innerWidth;
    h = window.innerHeight;
  } else {
    w = document.documentElement.clientWidth;
    h = document.documentElement.clientHeight;
  }

  document.body.style.minHeight = h;
  document.body.style.maxWidth = w;

  if (w > h * 1.2) {
    document.getElementById("style-sheet").href = "style-desktop.css";

    window.addEventListener("DOMContentLoaded", () => {
      if (document.querySelectorAll(".alarm-option")[0] !== undefined) {
        setListItemHeight();
      }
    });
  } else {
    document.getElementById("style-sheet").href = "style.css";

    window.addEventListener("DOMContentLoaded", () => {
      if (document.querySelectorAll(".alarm-option")[0] !== undefined) {
        setListItemHeight();
      }
    });
  }
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
  const mainContainer = document.getElementById("main-container");

  newAlarmButton.addEventListener("click", () => {
    alarmContainer.style.display = "flex";
    clockContainer.style.display = "none";
    newAlarmButton.style.display = "none";
    exitAlarmButton.style.display = "inline-block";
    mainContainer.style.position = "fixed";
    mainContainer.style.width = "100vw";
    mainContainer.style.top = "0";
    document.querySelector(".alarm-container").style.marginTop = "48vw";

    fillSelectHour();
    fillSelectMinute();
    setListItemHeight(getListScroll);
    setTimeout(scrollAnimation, 50);
    setAlarmListFocus();
  });
}

function scrollAnimation() {
  const arrows = document.querySelectorAll(".arrow");

  arrows.forEach((arrow) => {
    arrow.style.marginBottom = "7vw";
    arrow.style.marginTop = "7vw";
    arrow.style.opacity = "100%";
    arrow.style.transform = "scale(1.1)";
  });
  setTimeout(() => {
    arrows.forEach((arrow) => {
      arrow.style.marginBottom = "1vw";
      arrow.style.marginTop = "1vw";
      arrow.style.opacity = "70%";
      arrow.style.transform = "scale(1)";
    });
  }, 700);
}

function setAlarmListFocus() {
  let listHours = document.querySelectorAll(".hour-option");
  let listMins = document.querySelectorAll(".min-option");
  const currentTime = new Date();

  listMins[currentTime.getMinutes() + 60].focus();
  listHours[currentTime.getHours() + 24].focus();

  //scrollAlarmList(currentTime.getHours() + 24, currentTime.getMinutes() + 60);
}

function newAlarmButtonFocus() {
  newAlarmButton.style.transition = "0.5s";
  newAlarmButton.style.transform = "scale(1.1)";
  newAlarmButton.style.marginRight = "3vw";

  setTimeout(() => {
    newAlarmButton.style.transform = "scale(1)";
    newAlarmButton.style.transition = "0.3s";
    newAlarmButton.style.marginRight = "2vw";
    newAlarmButton.focus();
  }, 500);
}

//

//Här börjar skapandet av listan
function fillSelectHour() {
  let x = 0;
  let hourList = document.getElementById("hour-list");

  for (let x = 0; x < 2; x++) {
    for (let i = 0; i < 24; i++) {
      hourList.appendChild(createHourOption(i));
    }
  }
}

function createHourOption(i) {
  const hourOption = document.createElement("li");

  hourOption.className = "alarm-option hour-option";
  hourOption.tabIndex = "-1";

  if (i < 10) {
    hourOption.textContent = `0${i}`;
  } else {
    hourOption.textContent = i;
  }

  initHourOption(hourOption);

  return hourOption;
}

function initHourOption(hourOption) {
  const hourSelected = document.getElementById("alarm-hour");

  hourOption.addEventListener("click", (event) => {
    document.querySelector(".left").style.visibility = "hidden";
    hourSelected.textContent = event.target.textContent;

    document.getElementById("hour-list").style.display = "none";
    hourSelected.style.display = "inline-block";

    initHourSelected(hourSelected, hourOption);
    checkAlarmSelected();
  });
}

function initHourSelected(hourSelected, hourOption) {
  hourSelected.addEventListener("click", () => {
    document.querySelector(".left").style.visibility = "initial";
    hourSelected.style.display = "none";
    document.getElementById("hour-list").style.display = "block";
    saveAlarmButton.style.display = "none";

    hourOption.focus();

    initHourOption(hourOption);
  });
}

function fillSelectMinute() {
  const minList = document.getElementById("min-list");

  for (let x = 0; x < 2; x++) {
    for (let i = 0; i < 60; i++) {
      minList.appendChild(createMinOption(i));
    }
  }
}

function createMinOption(i) {
  const minOption = document.createElement("li");

  minOption.className = "alarm-option  min-option";
  minOption.tabIndex = "-1";

  if (i < 10) {
    minOption.textContent = `0${i}`;
  } else {
    minOption.textContent = i;
  }

  initMinOption(minOption);

  return minOption;
}

function initMinOption(minOption) {
  const minSelected = document.getElementById("alarm-min");
  minOption.addEventListener("click", (event) => {
    document.getElementById("alarm-min").textContent = event.target.textContent;

    document.querySelector(".right").style.visibility = "hidden";
    document.getElementById("min-list").style.display = "none";
    minSelected.style.display = "inline-block";
    initMinSelected(minSelected, minOption);
    checkAlarmSelected();
  });
}

function initMinSelected(minSelected, minOption) {
  minSelected.addEventListener("click", () => {
    document.querySelector(".right").style.visibility = "initial";
    minSelected.style.display = "none";
    document.getElementById("min-list").style.display = "block";
    saveAlarmButton.style.display = "none";

    minOption.focus();

    initMinOption(minOption);
  });
}

function setListItemHeight(callBack) {
  let options = document.querySelectorAll(".alarm-option");
  let optionHeight = options[0].offsetHeight;
  options.forEach((option) => {
    option.style.height = `${optionHeight}px`;
    option.style.minHeight = `${optionHeight}px`;
    option.style.maxHeight = `${optionHeight}px`;
  });
  if (callBack !== undefined) {
    callBack();
  }
}

function getListScroll() {
  const hourHolder = document.getElementById("hour-list");
  const minHolder = document.getElementById("min-list");
  let options = document.querySelectorAll(".alarm-option");
  let optionHeight = options[0].clientHeight;
  let hourListHeight = optionHeight * 47;
  let minListHeight = optionHeight * 119;
  console.log(optionHeight, minListHeight);

  hourHolder.addEventListener("scroll", () => {
    scrollAnimation();
    if (hourListHeight < hourHolder.scrollTop) {
      hourHolder.scrollTop = hourListHeight / 2 - optionHeight / 2;
    } else if (hourHolder.scrollTop === 0) {
      hourHolder.scrollTop = hourListHeight / 2 + optionHeight / 2;
    }
  });

  minHolder.addEventListener("scroll", () => {
    scrollAnimation();
    if (minListHeight < minHolder.scrollTop) {
      minHolder.scrollTop = minListHeight / 2 - optionHeight / 2;
    } else if (minHolder.scrollTop === 0) {
      minHolder.scrollTop = minListHeight / 2 + optionHeight / 2;
    }
  });
}

function checkAlarmSelected() {
  if (
    document.getElementById("alarm-min").style.display === "inline-block" &&
    document.getElementById("alarm-hour").style.display === "inline-block"
  ) {
    saveAlarmButton.style.display = "inline-block";
  } else {
    saveAlarmButton.style.display = "none";
  }
}

function initiateExitAlarmButton() {
  exitAlarmButton.addEventListener("click", returnToDashboard);
}

function returnToDashboard() {
  clockContainer.style.display = "flex";
  alarmContainer.style.display = "none";
  alarmContainer.style.backgroundColor = "#F8F1F1";
  alarmContainer.style.opacity = "100%";
  exitAlarmButton.style.display = "none";
  newAlarmButton.style.display = "inline-block";
  saveAlarmButton.style.display = "none";
  resetAlarmInput();
  resetAlarmList();
}

function initiateSaveAlarmButton() {
  saveAlarmButton.addEventListener("click", checkAlarmInput);
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
  document.getElementById("alarm-min").style.color = "#3D3D3D";
  document.getElementById("alarm-hour").style.color = "#3D3D3D";
  document.querySelector(".right").style.visibility = "visible";
  document.querySelector(".left").style.visibility = "visible";
  saveAlarmButton.style.display = "none";
  document.getElementById("main-container").style.position = "static";
  document.getElementById("alarm-list-container").style.marginTop = "0";
  document.querySelector(".alarm-container").style.marginTop = "0";
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

  saveAlarmAnimation();
  setTimeout(() => {
    createAlarm(hour, min);
    resetAlarmInput();
  }, 300);
}

function createAlarm(hour, min) {
  alarms.push(new Alarm(hour, min));

  setTimeout(() => {
    clearAlarmList();
    returnToDashboard();
  }, 100);
}

function clearAlarmList() {
  document.querySelectorAll(".alarm-list-item").forEach((e) => e.remove());
  uppdateAlarmList();
}

function uppdateAlarmList() {
  if (alarms.length < 1) {
    document.querySelector(".alarm-list-header").textContent = "NO ALARMS";
  } else {
    document.querySelector(".alarm-list-header").textContent = "ALARMS:";
    for (let i = 0; i < alarms.length; i++) {
      if (alarms[i].delete === true) {
        alarms.splice(i, 1);
        uppdateAlarmList();
      }
    }
    document.querySelectorAll(".alarm-list-item").forEach((e) => e.remove());
    createAlarmElements();
  }
}

function createAlarmElements() {
  const alarmList = document.getElementById("alarm-list");

  for (let i = 0; i < alarms.length; i++) {
    alarmList.prepend(createAlarmListItem(alarms[i], i));
  }
}

function createAlarmListItem(obj, i) {
  let colors = ["#fadcdb", "#fff3d6", "#e4f1e4", "#e2ebf3"];
  const alarmListItem = document.createElement("li");
  if (obj.active) {
    alarmListItem.className = "alarm-list-item";
  } else {
    alarmListItem.className = "alarm-list-item alarm-list-item-inactive";
  }
  alarmListItem.style.backgroundColor = obj.color;
  alarmListItem.tabIndex = "-1";
  if (obj.isNew) {
    obj.color = colors[Math.floor(Math.random() * 4)];
    if (alarms[i - 1] !== undefined && obj.color === alarms[i - 1].color) {
      colors = colors.filter(function (color) {
        return color !== obj.color;
      });
      obj.color = colors[Math.floor(Math.random() * 3)];
    }
    alarmListItem.style.backgroundColor = obj.color;
    alarmListItem.style.transform = "scale(0.01)";

    setTimeout(() => {
      alarmListItem.focus();
      alarmListItem.style.transform = "scale(1)";
      obj.isNew = false;
      setTimeout(() => {
        newAlarmButtonFocus();
      }, 950);
    }, 150);
  }

  alarmListItem.appendChild(createActiveButton(obj));
  alarmListItem.appendChild(createAlarmHeader(obj));
  alarmListItem.appendChild(createDeleteAlarmButton(obj));
  setAlarmShadowColor(obj, alarmListItem);

  return alarmListItem;
}

function setAlarmShadowColor(obj, alarmListItem) {
  switch (obj.color) {
    case "#fadcdb":
      alarmListItem.style.boxShadow = "#f8cbc9 0vw 0.4vw 0.8vw 0vw inset";
      break;
    case "#fff3d6":
      alarmListItem.style.boxShadow = "#ffedc2 0vw 0.4vw 0.8vw 0vw inset";
      break;
    case "#e4f1e4":
      alarmListItem.style.boxShadow = "#d7ead7 0vw 0.4vw 0.8vw 0vw inset";
      break;
    case "#e2ebf3":
      alarmListItem.style.boxShadow = "#d4e2ed 0vw 0.4vw 0.8vw 0vw inset";
      break;
  }
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
    deleteButton.parentNode.style.transform = "scale(0.01)";
    setTimeout(() => {
      obj.delete = true;
      clearAlarmList();
    }, 400);
  });
}

function createDeleteAlarmButtonImg() {
  const deleteImg = document.createElement("img");
  deleteImg.src = "/media/x.svg";
  return deleteImg;
}

function setTime() {
  const hoursSpan = document.getElementById("hour");
  const minutesSpan = document.getElementById("minute");
  const time = new Date();
  let hour = time.getHours();
  let minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (minute < 10) {
    minute = `0${minute}`;
  }

  hoursSpan.textContent = `${hour}`;
  minutesSpan.textContent = `${minute}`;

  if (hour === "00" && minute === "00" && second === 0) {
    document.getElementById("date").textContent = getDate();
  }
  if (second === 0) {
    const alarmCheck = `${hour}:${minute}`;

    if (checkAlarm(alarmCheck)) {
      returnToDashboard();
      initAlarm();
    }
  }
}

function checkAlarm(alarmCheck) {
  for (let i = 0; i < alarms.length; i++) {
    if (alarms[i].alarmTime === alarmCheck && alarms[i].active === true) {
      return true;
    }
  }
  return false;
}

function initAlarm() {
  newAlarmButton.style.display = "none";
  document.getElementById("alarm-list-container").style.opacity = "25%";
  document.getElementsByTagName("header")[0].style.opacity = "25%";
  clockContainer.tabIndex = "-1";
  clockContainer.focus();
  const alarmTimer = setInterval(hornAlarm, 1000);

  clockContainer.addEventListener("click", () => {
    clearInterval(alarmTimer);
    clockContainer.tabIndex = "initial";
    clockContainer.style.boxShadow = "initial";
    newAlarmButton.style.display = "initial";
    document.getElementById("alarm-list-container").style.opacity = "initial";
    document.getElementsByTagName("header")[0].style.opacity = "initial";
  });
}

function hornAlarm() {
  const audio = new Audio("/media/mjauLarm4.mp3");
  audio.play();
  clockContainer.style.boxShadow = "rgba(0, 0, 0, 0.1) 0px 4px 12px";

  clockContainer.style.backgroundColor = "#f8cbc9";
  setTimeout(() => {
    clockContainer.style.backgroundColor = "#E2EBF3";
  }, 500);
}

window.addEventListener("resize", checkDevice);
window.addEventListener("DOMContentLoaded", () => {
  checkDevice();
  initApp();
  setInterval(setTime, 1000);
});
