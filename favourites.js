var heroID = localStorage.getItem("id");
const xhrRequestForFavourites = new XMLHttpRequest();

getDetails(heroID);

// function addFavourite(id) {
//   getDetails(id);
// }
// function getDetails(id) {
//   console.log("inside addfavourites in favourites.js", id);
// }

function getDetails(heroID) {
  console.log("inside getdetails");
  console.log(heroID);
  var url = `https://gateway.marvel.com:443/v1/public/characters/${heroID}?ts=1&apikey=7c6d0ba7a6a8eba22f225d33d5adba3f&hash=1cb87892a3e91f8474f97b26817854c6`;
  console.log(url);
  xhrRequestForFavourites.open("get", url, true);
  xhrRequestForFavourites.send();
  xhrRequestForFavourites.onload = function () {
    var data = JSON.parse(xhrRequestForFavourites.responseText);
    console.log(data);
    showDetails(data.data.results);
    // showMoreDetails(data.data.results[0].urls[0].url);
  };
}

function showDetails(data) {
  console.log("showDetails", data);

  let parentDiv = document.getElementsByClassName("card");

  let pdiv = parentDiv[0];

  let childDiv = document.createElement("div");

  childDiv.innerHTML = `
  <img class="card-img-top" src="${data[0].thumbnail.path}.${data[0].thumbnail.extension}" style="width:100%">
    <div class="card-body">
         <h4 class="card-title"> ${data[0].name} </h4>
         <p class="card-text">${data[0].description} </p>
         <a href="index.html" class="card-link">Home</a>
    </div>
  `;

  childDiv.classList.add("row");
  pdiv.appendChild(childDiv);
}
