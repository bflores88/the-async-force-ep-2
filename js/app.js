'use strict';

//error function
function errorMessage(status, message) {
  let errorMessage = document.createElement('h2');
  errorMessage.innerHTML = `Error ${status} - ${JSON.parse(message).detail}`;
  contentContainer.appendChild(errorMessage);
}

//get informations
requestResourceButton.addEventListener('click', getInfo);

function getInfo() {
  contentContainer.innerHTML = '';
  let num = parseInt(resourceId.value);
  let type = resourceType.value;

  if (type === 'people') {
    function peopleReqListener() {
      if (this.status !== 200) {
        errorMessage(this.status, this.responseText);
        return;
      }

      let peopleObject = JSON.parse(this.responseText);

      let newPerson = document.createElement('h2');
      newPerson.innerHTML = peopleObject.name;
      contentContainer.appendChild(newPerson);

      let newGender = document.createElement('p');
      newGender.innerHTML = 'Gender: ' + peopleObject.gender;
      contentContainer.appendChild(newGender);

      let speciesFinder = peopleObject.species[0].toString();

      function speciesReqListener() {
        let speciesFound = JSON.parse(this.responseText).name;
        let newSpecies = document.createElement('p');
        newSpecies.innerHTML = 'Species: ' + speciesFound;
        contentContainer.appendChild(newSpecies);
      }

      let speciesReq = new XMLHttpRequest();
      speciesReq.addEventListener('load', speciesReqListener);
      speciesReq.open('GET', speciesFinder);
      speciesReq.send();
    }

    const peopleReq = new XMLHttpRequest();
    peopleReq.addEventListener('load', peopleReqListener);
    peopleReq.open('GET', `https://swapi.co/api/people/${num}`);
    peopleReq.send();
  }

  if (type === 'planets') {
    function planetReqListener() {
      if (this.status !== 200) {
        errorMessage(this.status, this.responseText);
        return;
      }

      let planetObject = JSON.parse(this.responseText);

      let newPlanet = document.createElement('h2');
      newPlanet.innerHTML = planetObject.name;
      contentContainer.appendChild(newPlanet);

      let newTerrain = document.createElement('p');
      newTerrain.innerHTML = 'Terrain: ' + planetObject.terrain;
      contentContainer.appendChild(newTerrain);

      let newPopulation = document.createElement('p');
      newPopulation.innerHTML = 'Population: ' + planetObject.population;
      contentContainer.appendChild(newPopulation);

      let filmUL = document.createElement('ul');
      filmUL.id = 'filmID';
      filmUL.style.marginLeft = '5px';
      filmUL.style.padding = '10px';
      filmUL.innerHTML = 'Appeared in:';
      contentContainer.appendChild(filmUL);

      //film finder
      let filmArr = planetObject.films;

      filmArr.forEach((elem) => {
        function filmReqListener() {
          let filmName = JSON.parse(this.responseText).title;

          let listFilm = document.createElement('li');
          listFilm.innerHTML = filmName;
          filmUL.appendChild(listFilm);
        }

        let filmReq = new XMLHttpRequest();
        filmReq.addEventListener('load', filmReqListener);
        filmReq.open('GET', elem);
        filmReq.send();
      });
    }

    let planetReq = new XMLHttpRequest();
    planetReq.addEventListener('load', planetReqListener);
    planetReq.open('GET', `https://swapi.co/api/planets/${num}/`);
    planetReq.send();
  }

  if (type === 'starships') {
    function starshipReqListener() {
      if (this.status !== 200) {
        errorMessage(this.status, this.responseText);
        return;
      }

      let starshipObject = JSON.parse(this.responseText);

      let newName = document.createElement('h2');
      newName.innerHTML = starshipObject.name;
      contentContainer.appendChild(newName);

      let newManufacturer = document.createElement('p');
      newManufacturer.innerHTML = 'Manufacturer: ' + starshipObject.manufacturer;
      contentContainer.appendChild(newManufacturer);

      let newClass = document.createElement('p');
      newClass.innerHTML = 'Starship Class: ' + starshipObject.starship_class;
      contentContainer.appendChild(newClass);

      let filmUL = document.createElement('ul');
      filmUL.id = 'filmID';
      filmUL.style.marginLeft = '5px';
      filmUL.style.padding = '10px';
      filmUL.innerHTML = 'Appeared in:';
      contentContainer.appendChild(filmUL);

      //film finder
      let filmArr = starshipObject.films;

      filmArr.forEach((elem) => {
        function filmReqListener() {
          let filmName = JSON.parse(this.responseText).title;

          let listFilm = document.createElement('li');
          listFilm.innerHTML = filmName;
          filmUL.appendChild(listFilm);
        }

        let filmReq = new XMLHttpRequest();
        filmReq.addEventListener('load', filmReqListener);
        filmReq.open('GET', elem);
        filmReq.send();
      });
    }

    let starshipReq = new XMLHttpRequest();
    starshipReq.addEventListener('load', starshipReqListener);
    starshipReq.open('GET', `https://swapi.co/api/starships/${num}/`);
    starshipReq.send();
  }
}
