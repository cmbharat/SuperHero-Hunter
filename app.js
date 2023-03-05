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

function getAll() {
  var url =
    "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=7c6d0ba7a6a8eba22f225d33d5adba3f&hash=1cb87892a3e91f8474f97b26817854c6&limit=100";
  xhrRequest.open("get", url, true);
  xhrRequest.send();
  xhrRequest.onload = function () {
    var data = JSON.parse(xhrRequest.responseText);
    addHeros(data.data.results);
  };
}

function getByInput() {
  var name = document.getElementById("user-input").value;
  var url = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=7c6d0ba7a6a8eba22f225d33d5adba3f&hash=1cb87892a3e91f8474f97b26817854c6&limit=100&nameStartsWith=${name}`;
  xhrRequest.open("get", url, true);
  xhrRequest.send();
  xhrRequest.onload = function () {
    var data = JSON.parse(xhrRequest.responseText);
    // console.log(data);
    addHeros(data.data.results);
  };
}

function addHeros(heroes) {
  // console.log("inside heroes", heroes);

  let parentDiv = document.getElementsByClassName("superhero");

  let pdiv = parentDiv[0];

  heroes.forEach((hero) => {
    let childDiv = document.createElement("div");

    childDiv.innerHTML = `
  <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}">
    <div class="hero-name">
        <h1>${hero.name}</h1>
    </div>
    <div class="heart-icon">
        <i id="${hero.id}" onclick="addFavourite(${hero.id})" class="fas fa-heart heart-icon"></i>
    </div>
    <div class="more-info">
        <i id="${hero.id}" class="fas fa-info"  onclick="showDetailsInMoreInfoPage(${hero.id})" ></i>
    </div>
  `;

    childDiv.classList.add("row");
    pdiv.appendChild(childDiv);
  });
}

function removeHeroes() {
  let parentDiv = document.getElementsByClassName("superhero");

  let pdiv = parentDiv[0];

  pdiv.innerHTML = "";
  getByInput();
}

function showDetailsInMoreInfoPage(id) {
  localStorage.setItem("id", id);
  window.location.assign("./moreinfo.html");
}

function addFavourite(id) {
  // make a favourites key for storing all favourites hero's id in local storage if not available

  if (localStorage.getItem("favourites") == null) {
    localStorage.setItem("favourites", JSON.stringify([]));
  } else {
    var arr = JSON.parse(localStorage.getItem("favourites"));
  }

  if (!arr.includes(id) == true) {
    arr.push(id);
    localStorage.setItem("favourites", JSON.stringify(arr));
    alert("your hero added in favourites");
  } else {
    alert("your hero already added in favourites");
  }
}
