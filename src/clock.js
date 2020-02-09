const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function insertZero(num) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return `${num}`;
  }
}

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${insertZero(hours)}:${insertZero(
    minutes
  )}:${insertZero(seconds)}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
