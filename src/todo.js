const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoListPending = document.querySelector(".js-toDoListPending");
const toDoListDone = document.querySelector(".js-toDoListDone");

const TODOS_LS_PENDING = "toDosPending";
const TODOS_LS_DONE = "toDosDone";

let aToDosPending = [];
let aToDosDone = [];

function initLoad() {
  const aLoadedToDosPending = localStorage.getItem(TODOS_LS_PENDING);
  const aLoadedToDosDone = localStorage.getItem(TODOS_LS_DONE);

  if (aLoadedToDosPending != null) {
    //console.log(aLoadedToDosPending);

    const aParsedToDosPending = JSON.parse(aLoadedToDosPending);
    if (aParsedToDosPending != null) {
      aParsedToDosPending.forEach(function(item) {
        paintToDo(TODOS_LS_PENDING, item.text);
      });
    }
    const aParsedToDosDone = JSON.parse(aLoadedToDosDone);
    if (aParsedToDosDone != null) {
      aParsedToDosDone.forEach(function(item) {
        paintToDo(TODOS_LS_DONE, item.text);
      });
    }
  }
}

function saveToDosPending() {
  localStorage.setItem(TODOS_LS_PENDING, JSON.stringify(aToDosPending));
}

function saveToDosDone() {
  localStorage.setItem(TODOS_LS_DONE, JSON.stringify(aToDosDone));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  // console.log(li.type);
  const type = li.type;
  if (type === TODOS_LS_PENDING) {
    toDoListPending.removeChild(li);
    const cleanToDos = aToDosPending.filter(function(toDo) {
      return toDo.id !== parseInt(li.id);
    });
    aToDosPending = cleanToDos;
    saveToDosPending();
  } else if (type === TODOS_LS_DONE) {
    toDoListDone.removeChild(li);
    const cleanToDos = aToDosDone.filter(function(toDo) {
      return toDo.id !== parseInt(li.id);
    });
    aToDosDone = cleanToDos;
    saveToDosDone();
  }
}

function moveToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const todoTxt = li.querySelector("span").textContent;
  const type = li.type;
  if (type === TODOS_LS_PENDING) {
    paintToDo(TODOS_LS_DONE, todoTxt);
  } else if (type === TODOS_LS_DONE) {
    paintToDo(TODOS_LS_PENDING, todoTxt);
  }
  deleteToDo(event);
}

function paintToDo(type, text) {
  const date = new Date();
  let newId = date.getTime();
  const li = document.createElement("li");
  li.type = type;
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  const moveBtn = document.createElement("button");
  delBtn.addEventListener("click", deleteToDo);
  moveBtn.addEventListener("click", moveToDo);

  if (type === TODOS_LS_PENDING) {
    moveBtn.innerText = "✅";
  } else if (type === TODOS_LS_DONE) {
    moveBtn.innerText = "⬆️";
  }

  const span = document.createElement("span");

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(moveBtn);
  li.id = newId;

  const oToDo = {
    text: text,
    id: newId,
    type: type
  };
  //console.log(oToDo);
  if (type === TODOS_LS_PENDING) {
    toDoListPending.appendChild(li);
    aToDosPending.push(oToDo);
  } else if (type === TODOS_LS_DONE) {
    toDoListDone.appendChild(li);
    aToDosDone.push(oToDo);
  }
  saveToDosPending();
  saveToDosDone();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(TODOS_LS_PENDING, currentValue);
  toDoInput.value = "";
}

function init() {
  initLoad();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
