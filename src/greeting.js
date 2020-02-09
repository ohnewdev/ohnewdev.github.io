const greetingForm = document.querySelector(".js-form");
const greetingInput = greetingForm.querySelector("input");
const greetings = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleGreetingSubmit(event) {
  event.preventDefault();
  const currentValue = greetingInput.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  greetingForm.classList.add(SHOWING_CN);
}

function paintGreeting(text) {
  greetingForm.classList.remove(SHOWING_CN);
  greetings.classList.add(SHOWING_CN);
  greetings.innerHTML = `Hello, ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // not
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function init() {
  loadName();
  greetingForm.addEventListener("submit", handleGreetingSubmit);
}

init();
