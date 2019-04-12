"use strict";

requestResourceButton.addEventListener('click', getInfo);

function getInfo () {
  contentContainer.innerHTML = '';

  if(typeof parseInt(resourceId.value) !== 'number'){
    return console.log('false');
  }

  let num = resourceId.value;

  if(resourceType.value === 'people'){

    function peopleReqListener () {
      let peopleObject = JSON.parse(this.responseText).results;
      console.log(peopleObject);

      let newPerson = document.createElement('h2');
      newPerson.innerHTML = peopleObject[num].name;
      contentContainer.appendChild(newPerson);

      let newGender = document.createElement('p');
      newGender.innerHTML = 'Gender: ' + peopleObject[num].gender;
      contentContainer.appendChild(newGender);

      let speciesFinder = peopleObject[num].species[0].toString();

      function speciesReqListener () {
        let speciesFound = JSON.parse(this.responseText).name;
        let newSpecies = document.createElement('p');
        newSpecies.innerHTML = 'Species: ' + speciesFound;
        contentContainer.appendChild(newSpecies);
      }

      let speciesReq = new XMLHttpRequest ();
      speciesReq.addEventListener('load', speciesReqListener);
      speciesReq.open('GET', speciesFinder);
      speciesReq.send();
    }
    
    const peopleReq = new XMLHttpRequest();
    peopleReq.addEventListener('load', peopleReqListener);
    peopleReq.open('GET', 'https://swapi.co/api/people/');
    peopleReq.send();
  }


  if(resourceType.value === 'planets'){

    function planetReqListener () {
      let planetObject = JSON.parse(this.responseText).results;

      let newPlanet = document.createElement('h2');
      newPlanet.innerHTML = planetObject[num].name;
      contentContainer.appendChild(newPlanet);

      let newTerrain = document.createElement('p');
      newTerrain.innerHTML = 'Terrain: ' + planetObject[num].terrain;
      contentContainer.appendChild(newTerrain);

      let newPopulation = document.createElement('p');
      newPopulation.innerHTML = 'Population: ' + planetObject[num].population;
      contentContainer.appendChild(newPopulation);

      let filmUL = document.createElement('ul');
      filmUL.id = 'filmID';
      filmUL.style.marginLeft = '5px';
      filmUL.style.padding = '10px';
      filmUL.innerHTML = 'Appeared in:'
      contentContainer.appendChild(filmUL);

      //film finder
      let filmArr = planetObject[num].films;
      
      filmArr.forEach(elem => {
        
        function filmReqListener () {
          let filmName = JSON.parse(this.responseText).title;
          console.log(filmName);

          let listFilm = document.createElement('li');
          listFilm.innerHTML = filmName;
          filmUL.appendChild(listFilm);
        }

        let filmReq = new XMLHttpRequest();
        filmReq.addEventListener('load', filmReqListener);
        filmReq.open('GET', elem);
        filmReq.send();
      })
    }

    let planetReq = new XMLHttpRequest ();
    planetReq.addEventListener('load', planetReqListener);
    planetReq.open('GET', 'https://swapi.co/api/planets/');
    planetReq.send();
  };


  if(resourceType.value === 'starships'){

    function starshipReqListener () {
      let starshipObject = JSON.parse(this.responseText).results;
      console.log(starshipObject);

      let newName = document.createElement('h2');
      newName.innerHTML = starshipObject[num].name;
      contentContainer.appendChild(newName);

      let newManufacturer = document.createElement('p');
      newManufacturer.innerHTML = 'Manufacturer: ' + starshipObject[num].manufacturer;
      contentContainer.appendChild(newManufacturer);

      let newClass = document.createElement('p');
      newClass.innerHTML = 'Starship Class: ' + starshipObject[num].starship_class;
      contentContainer.appendChild(newClass);
    }

    let starshipReq = new XMLHttpRequest();
    starshipReq.addEventListener('load', starshipReqListener);
    starshipReq.open('GET', 'https://swapi.co/api/starships/');
    starshipReq.send();
  }




}