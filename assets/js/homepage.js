var dia=moment().format('l');
var userFormEl = document.querySelector("#user-form");
var cityButtonsEl = document.querySelector("#city-buttons");
var nameInputEl = document.querySelector("#cityname");
var repoSearchTerm = document.querySelector("#repo-search-term");
var cities= []; 

//load page first time
var loadCities=function(){
  cities = [];  //initialize array
  // read from local storage
  cities = JSON.parse(localStorage.getItem("cities"));
  if (cities) { //if a city has been saved on local storage then         
        //loop over array to recreate tasks on the webpage
          $.each(cities, function(index,cities){
            //recreate buttons for each city
            var button = document.createElement('button');
            button.type = 'button';
            button.textContent = cities.cname;
            button.className = 'btn';
            button.setAttribute("data-lat", cities.clat);
            button.setAttribute("data-lon", cities.clon);
            button.setAttribute("data-city", cities.cname);
            var container = document.getElementById('city-buttons');
            container.appendChild(button);
     });
  };
}

//if a new city is submitted
var formSubmitHandler = function(event) {
      // prevent page from refreshing
      event.preventDefault();
      // get value from input element
      var cityname = nameInputEl.value.trim();
      if (cityname) {
        getcity(cityname);
        nameInputEl.value = "";
      } else {
        alert("Please enter a city");
      }
};

//load city to get latitud and longitud to be able to display 5 days 
var getcity = function(city) {
  // format the weather api url by city
  var apiUrl=  "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&APPID=126a080714e51ffd3ce7f4eabeb126fc";
  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
          response.json().then(function(data) {
          //create buttons and save locations if city does not exist previously
          if (!cities){  //if it is first city that is going to be added 
            cities= [];
            createBtns(data.coord.lat, data.coord.lon, data.name);
          }
          else{
            //search on array if city already exist 
            var index = -1;
            for(let y=0; y < cities.length; y++){
                    if (cities[y].cname===data.name){
                        index=y;
                    };
            };
            if (index < 0){  //the task does not previously exist. adding new task
                createBtns(data.coord.lat, data.coord.lon, data.name);
            }; 
          }
          //retrieve weather based on lon and Lat
          getmoredetails(data.coord.lat, data.coord.lon, data.name);
        });
      } else { //api response returned errors
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to Weather Web site");
    });
};

//save array to local storage
var saveCities = function() {
  localStorage.setItem("cities", JSON.stringify(cities));
};


//using lat and lon, get all info for current day and next 5 days
var getmoredetails = function(citylat, citylon,cityname) {
  // format the github api url
  var apiUrl= "https://api.openweathermap.org/data/2.5/onecall?lat="+citylat+"&lon="+citylon+"&units=imperial&appid=126a080714e51ffd3ce7f4eabeb126fc";
  // make a get request to url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        //console.log(data);
        repoSearchTerm.textContent = cityname + " ( "+dia+")";
        //Current weather
        icon.src="https://openweathermap.org/img/wn/"+data.current.weather[0].icon+"@2x.png";
        temp.textContent = data.current.temp+" °F";
        wind.textContent = data.current.wind_speed+"MPH";
        humity.textContent = data.current.humidity+"%";
        if (data.current.uvi <= 5 ){
            $("#uvindex").css("background", "green");
        }
        if (data.current.uvi > 5 && data.current.uvi <=10  ){
          $("#uvindex").css("background", "orange");
        }
        if (data.current.uvi >= 11){
          $("#uvindex").css("background", "red");
        }
        uvindex.textContent= data.current.uvi;
        //Next five days-day 1
        day0.textContent= moment().add(1, 'days').format('l');
        icon0.src="https://openweathermap.org/img/wn/"+data.daily[0].weather[0].icon+"@2x.png";
        temp0.textContent = data.daily[0].temp.day+"°F";
        wind0.textContent = data.daily[0].wind_speed+"MPH";
        humity0.textContent = data.daily[0].humidity+"%";
        //day2
        day1.textContent= moment().add(2, 'days').format('l');
        icon1.src="https://openweathermap.org/img/wn/"+data.daily[1].weather[0].icon+"@2x.png";
        temp1.textContent = data.daily[1].temp.day+" °F";
        wind1.textContent = data.daily[1].wind_speed+"MPH";
        humity1.textContent = data.daily[1].humidity+"%";
        //day 3
        day2.textContent= moment().add(3, 'days').format('l');
        icon2.src="https://openweathermap.org/img/wn/"+data.daily[2].weather[0].icon+"@2x.png";
        temp2.textContent = data.daily[2].temp.day+" °F";
        wind2.textContent = data.daily[2].wind_speed+"MPH";
        humity2.textContent = data.daily[2].humidity+"%";
        //day 4
        day3.textContent= moment().add(4, 'days').format('l');
        icon3.src="https://openweathermap.org/img/wn/"+data.daily[3].weather[0].icon+"@2x.png";
        temp3.textContent = data.daily[3].temp.day+" °F";
        wind3.textContent = data.daily[3].wind_speed+"MPH";
        humity3.textContent = data.daily[3].humidity+"%";
        //day 5
        day4.textContent= moment().add(5, 'days').format('l');
        icon4.src="https://openweathermap.org/img/wn/"+data.daily[4].weather[0].icon+"@2x.png";
        temp4.textContent = data.daily[4].temp.day+" °F";
        wind4.textContent = data.daily[4].wind_speed+"MPH";
        humity4.textContent = data.daily[4].humidity+"%";
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

//create buttons and save new cities on array 
var createBtns=function(citylat, citylon,cityname){
      //diplay buttons
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = cityname;
      button.className = 'btn';
      button.setAttribute("data-lat", citylat);
      button.setAttribute("data-lon", citylon);
      button.setAttribute("data-city", cityname);
      var container = document.getElementById('city-buttons');
      container.appendChild(button);
      //prepare to save on local storage
      var cityDataObj = {
        cname: cityname,
        clon: citylon,
        clat: citylat
      };
      cities.push(cityDataObj);
      saveCities(); //go to save on local storage
 };


//load data from previously saved cities 
var buttonClickHandler = function(event) {
  // get the city attribute from the clicked element
  var city = event.target.getAttribute("data-city");
  if (city) {
     var clat=event.target.getAttribute("data-lat");
     var clon=event.target.getAttribute("data-lon");
     getmoredetails(clat, clon,city); //go to display info on screen
  }
};
// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);
cityButtonsEl.addEventListener("click", buttonClickHandler);

// load cities for the first time if any
loadCities();
