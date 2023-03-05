var arr = JSON.parse(localStorage.getItem("favourites"));
const xhrRequestForFavourites = new XMLHttpRequest();

favouritesDetails(arr);

function favouritesDetails(favourites) {
  if (favourites.length == 0) {
    let parentDiv = document.getElementsByClassName("superhero");

    let pdiv = parentDiv[0];

    let childDiv = document.createElement("div");

    childDiv.innerHTML = `<h1 style="text-align: center">No Superheros to Display Please Add Some</h1>`;

    // childDiv.classList.add("row");
    pdiv.appendChild(childDiv);
  }

  favourites.forEach((heroID) => {
    let parentDiv = document.getElementsByClassName("superhero");

    let pdiv = parentDiv[0];

    console.log("inside getFavouriteDetails method", heroID);
    var url = `https://gateway.marvel.com:443/v1/public/characters/${heroID}?ts=1&apikey=7c6d0ba7a6a8eba22f225d33d5adba3f&hash=1cb87892a3e91f8474f97b26817854c6`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("inside fetch data", data);
        var heroData = data.data.results;
        console.log("herodata", heroData);
        let childDiv = document.createElement("div");

        childDiv.innerHTML = `
        <img src="${heroData[0].thumbnail.path}.${heroData[0].thumbnail.extension}">
          <div class="hero-name">
              <h1>${heroData[0].name}</h1>
          </div>
          <div class="heart-icon">
              <i id="${heroData[0].id}" onclick="removeFavourite(${heroData[0].id})" class="fas fa-solid fa-trash-can"></i>
          </div>
          <div class="more-info">
              <i id="${heroData[0].id}" class="fas fa-info"  onclick="showDetailsInMoreInfoPage(${heroData[0].id})" ></i>
          </div>
        `;

        childDiv.classList.add("row");
        pdiv.appendChild(childDiv);
      });
  });
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

function removeFavourite(id) {
  var index = arr.indexOf(id);
  arr.splice(index, 1);
  localStorage.setItem("favourites", JSON.stringify(arr));
  alert("You Have Removed Superhero From your Favourites");
  location.reload();
}
