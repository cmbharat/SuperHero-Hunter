const header = document.querySelector("header");

const xhrRequest = new XMLHttpRequest();

window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", this.window.scrollY > 0);
});

// var MD5 = require("crypto-js/md5");
// console.log(
//   MD5(
//     "1ac995ccba02ac9a762e63b84ac9dc8a66038251a7c6d0ba7a6a8eba22f225d33d5adba3f"
//   ).toString()
// );

function fetch() {
  var url = getUrl();
  console.log(url);
  xhrRequest.open("get", url, true);
  xhrRequest.send();
  xhrRequest.onload = function () {
    var data = JSON.parse(xhrRequest.responseText);
    console.log(data);
    // display(data);
  };
}

function getAll() {
  var url =
    "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=7c6d0ba7a6a8eba22f225d33d5adba3f&hash=1cb87892a3e91f8474f97b26817854c6";
  xhrRequest.open("get", url, true);
  xhrRequest.send();
  xhrRequest.onload = function () {
    var data = JSON.parse(xhrRequest.responseText);
    console.log(data);
    addHeros(data.data.results);
  };
}

function addHeros(heroes) {
  console.log("inside heroes", heroes);

  let parentDiv = document.querySelector("superhero");

  for (var i = 0; i < heroes.length; i++) {
    console.log(i);
  }
  let childDiv = document.createElement("div");

  childDiv.innerHTML = `
  <span class="todo-item"></span>
  <button name="checkButton"><i class="fas fa-check-square"></i></button>
  <button name="deleteButton"><i class="fas fa-trash"></i></button>
  `;

  childDiv.classList.add("row");
  parentDiv.appendChild(li);
  // todoCount();
}
