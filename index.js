function Time() {
  this.date = new Date();
  this.hour = this.date.getHours();
  this.minute = this.date.getMinutes();
  this.second = this.date.getSeconds();
}

let time = new Time();

let hours = document.getElementById("hour");
let minutes = document.getElementById("minute");
let seconds = document.getElementById("second")

hours.textContent = time.hour;
minutes.textContent = time.minute;
seconds.textContent = time.second;

function setHour () {

}
