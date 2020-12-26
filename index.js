function Time() {
  this.date = new Date();
  this.hour = this.date.getHours();
  this.minute = this.date.getMinutes();
  this.second = this.date.getSeconds();
}

setInterval(() => {
  let time = new Time();
  let hours = document.getElementById("hour");
  let minutes = document.getElementById("minute");
  let seconds = document.getElementById("second");

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
  
}, 100);
