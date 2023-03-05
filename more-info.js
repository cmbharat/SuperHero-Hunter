var heroID = localStorage.getItem("id");
const xhrRequestForMoreInfo = new XMLHttpRequest();

getDetails(heroID);

function getDetails(heroID) {
  var url = `https://gateway.marvel.com:443/v1/public/characters/${heroID}?ts=1&apikey=7c6d0ba7a6a8eba22f225d33d5adba3f&hash=1cb87892a3e91f8474f97b26817854c6`;
  xhrRequestForMoreInfo.open("get", url, true);
  xhrRequestForMoreInfo.send();
  xhrRequestForMoreInfo.onload = function () {
    var data = JSON.parse(xhrRequestForMoreInfo.responseText);
    showDetails(data.data.results);
  };
}

function showDetails(data) {
  let parentDiv = document.getElementsByClassName("card");

  let pdiv = parentDiv[0];

  let childDiv = document.createElement("div");

  childDiv.innerHTML = `
  <img class="card-img-top" src="${data[0].thumbnail.path}.${data[0].thumbnail.extension}" style="width:100%">
    <div class="card-body">
         <h4 class="card-title"> ${data[0].name} </h4>
         <p class="card-text">${data[0].description} </p>
         <a href="index.html" class="card-link">Home</a>
         <a href="favourites.html" class="card-link">Favourites</a>
    </div>
  `;

  childDiv.classList.add("row");
  pdiv.appendChild(childDiv);
}
