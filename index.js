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
  document.body.style.minHeight = "100vh";
  if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
    let w = window.innerWidth;
    let h = window.innerHeight;

    if (w > h) {
      /* if(document.body.fullscreenElement != null) {
        document.body.addEventListener("click", closeFullscreen);
        
      } */
      document.getElementById("style-sheet").href = "style-desktop.css";
    } else {
      //document.body.addEventListener("click", openFullscreen)
      document.getElementById("style-sheet").href = "style.css";
    }
  } else {
    let w = document.documentElement.clientWidth;
    let h = document.documentElement.clientHeight;
    console.log(w, h);
  }
}

//Stolen from w3 schools: https://www.w3schools.com/jsref/met_element_requestfullscreen.asp
/* function openFullscreen() {
  const body = document.body;
  if (body.requestFullscreen) {
    body.requestFullscreen();
  } else if (body.webkitRequestFullscreen) {
    
    body.webkitRequestFullscreen();
  } else if (body.msRequestFullscreen) {
    
    body.msRequestFullscreen();
  }
  body.removeEventListener("click", openFullscreen);
}

function closeFullscreen() {
  const body = document.body;
  if (body.exitFullscreen) {
    body.exitFullscreen();
  } else if (body.webkitExitFullscreen) {
    
    body.webkitExitFullscreen();
  } else if (body.mozCancelFullscreen) {
    
    body.mozCancelFullscreen();
  }
  body.removeEventListener("click", closeFullscreen);
} */

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
    setAlarmListFocus();
    scrollAnimation();
  });
}

function scrollAnimation() {
  const arrows = document.querySelectorAll(".arrow");

  arrows.forEach((arrow) => {
    arrow.style.marginBottom = "5vw";
    arrow.style.marginTop = "5vw";
    arrow.style.opacity = "100%";
    arrow.style.transform = "scale(1.8)";
  });
  setTimeout(() => {
    arrows.forEach((arrow) => {
      arrow.style.marginBottom = "1vw";
      arrow.style.marginTop = "1vw";
      arrow.style.opacity = "70%";
      arrow.style.transform = "scale(1)";
    });
  }, 500);
}

function setAlarmListFocus() {
  let listHours = document.querySelectorAll(".hour-option");
  let listMins = document.querySelectorAll(".min-option");
  const currentTime = new Date();

  listMins[currentTime.getMinutes() + 60].focus();
  listHours[currentTime.getHours() + 24].focus();
  //scrollAlarmList(currentTime.getHours() + 24, currentTime.getMinutes() + 60);
}

/* function scrollAlarmList(hourIndex, minIndex) {
  let listHours = document.querySelectorAll(".hour-option");
  let listMins = document.querySelectorAll(".min-option");
  let hourList = document.getElementById("hour-list");
  let minList = document.getElementById("min-list");

  minList.onscroll = () => {
    listMins[minIndex + 10].scrollIntoView();
  };
} */

function newAlarmButtonFocus() {
  newAlarmButton.style.transition = "0.5s";
  newAlarmButton.style.transform = "scale(1.2)";
  newAlarmButton.style.marginRight = "4vw";
  setTimeout(() => {
    newAlarmButton.style.transform = "scale(1)";
    newAlarmButton.style.transition = "0.3s";
    newAlarmButton.style.marginRight = "2vw";
    newAlarmButton.focus();
  }, 500);
}

function fillSelectHour() {
  let x = 0;

  while (x < 2) {
    for (let i = 0; i < 24; i++) {
      document.getElementById("hour-list").appendChild(createHourOption(i));
    }
    x++;
  }
}

function createHourOption(i) {
  let hourOption = document.createElement("li");
  const hourSelected = document.getElementById("alarm-hour");
  hourOption.className = "alarm-option hour-option";
  hourOption.tabIndex = "-1";

  if (i < 10) {
    hourOption.textContent = `0${i}`;
  } else {
    hourOption.textContent = i;
  }

  hourOption.addEventListener("click", (event) => {
    document.querySelector(".left").style.display = "none";
    event.target.scrollIntoView();
    hourSelected.textContent = event.target.textContent;

    document.getElementById("hour-list").style.display = "none";
    hourSelected.style.display = "inline-block";

    console.log(event.target.textContent.valueOf());

    initSelectedAlarmTime(hourSelected);
    checkAlarmSelected();
  });
  return hourOption;
}

function fillSelectMinute() {
  let x = 0;
  const minList = document.getElementById("min-list");

  while (x < 2) {
    for (let i = 0; i < 60; i++) {
      minList.appendChild(createMinOption(i));
    }
    x++;
  }
}

function createMinOption(i) {
  const minOption = document.createElement("li");
  const minSelected = document.getElementById("alarm-min");

  minOption.className = "alarm-option  min-option";
  minOption.tabIndex = "-1";

  if (i < 10) {
    minOption.textContent = `0${i}`;
  } else {
    minOption.textContent = i;
  }

  minOption.addEventListener("click", (event) => {
    event.target.scrollIntoView();

    document.querySelector(".right").style.display = "none";
    minSelected.textContent = event.target.textContent;

    document.getElementById("min-list").style.display = "none";
    minSelected.style.display = "inline-block";

    initSelectedAlarmTime(minSelected);
    checkAlarmSelected();

    console.log(event.target.textContent.valueOf());
  });
  return minOption;
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

function initSelectedAlarmTime(element) {
  element.addEventListener("click", () => {
    element.style.display = "none";
    resetAlarmInput();

    /* if (document.getElementById("min-list").style.display === "none") {
      document.getElementById("min-list").style.display = "block";
      document.querySelector(".right").style.display = "flex";
    } 
    else if (document.getElementById("hour-list").style.display === "none") {
      document.getElementById("hour-list").style.display = "block";
      document.querySelector(".left").style.display = "flex";
    } */
  });
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
  document.querySelector(".right").style.display = "flex";
  document.querySelector(".left").style.display = "flex";
  saveAlarmButton.style.display = "none";
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
    console.log("funkar");
    alarmContainer.style.backgroundColor = "#BB7777";
    setTimeout(() => {
      alarmContainer.style.backgroundColor = "#E4F1E4";
      setTimeout(() => {
        resetAlarmInput();
      }, 200);
    }, 200);

    return;
  } else {
    saveAlarmAnimation();
    setTimeout(() => {
      createAlarm(hour, min);
      resetAlarmInput();
    }, 300);
  }
}

function createAlarm(hour, min) {
  console.log(`${hour}:${min}`);
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
    document.querySelector(".alarm-list-header").textContent = "ALARMS";
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
    alarmList.prepend(createAlarmListItem(alarms[i]));
    alarmList.childNodes[0].style.transform = "scale(0.1)";
    setTimeout(() => {
      alarmList.childNodes.forEach((alarmItem) => {
        setTimeout(() => {
          alarmItem.style.transform = "scale(1)";

        }, 1)
        

      }) 
    }, 50);
  }
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
  alarmListItem.style.transform = "scale(1)";
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

  hoursSpan.textContent = `${hour}`;
  minutesSpan.textContent = `${minute}`;

  if (hour === "00" && minute === "00" && second === 0) {
    document.getElementById("date").textContent = getDate();
  }
  if (second === 0) {
    const alarmCheck = `${hour}:${minute}`;

    if (checkAlarm(alarmCheck)) {
      console.log("Alarm!");
      returnToDashboard();
      const alarmTimer = setInterval(hornAlarm, 1000);
      clockContainer.addEventListener("click", () => {
        clearInterval(alarmTimer);
        clockContainer.style.boxShadow = "initial";
      });
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
//last ten seconds every hour the
function hornAlarm() {
  const audio = new Audio("/media/mjauLarm4.mp3");
  audio.play();
  clockContainer.style.boxShadow = "rgba(0, 0, 0, 0.1) 0px 4px 12px";

  clockContainer.style.backgroundColor = "#f8cbc9";
  setTimeout(() => {
    clockContainer.style.backgroundColor = "#E2EBF3";
  }, 500);
}

window.addEventListener("DOMContentLoaded", () => {
  checkDevice();
  initApp();
  setInterval(setTime, 1000);
});
