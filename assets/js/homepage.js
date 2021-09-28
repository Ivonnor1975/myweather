var dia=moment().format('l')
var userFormEl = document.querySelector("#user-form");
var cityButtonsEl = document.querySelector("#city-buttons");
var nameInputEl = document.querySelector("#cityname");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var formSubmitHandler = function(event) {
  // prevent page from refreshing
  event.preventDefault();

  // get value from input element
  var cityname = nameInputEl.value.trim();

  if (cityname) {
    getcity(cityname);

    // clear old content
    repoContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a city");
  }
};

var getcity = function(city) {
  // format the weather api url by city
  var apiUrl=  "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&APPID=126a080714e51ffd3ce7f4eabeb126fc";
  // make a get request to url
  fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
          response.json().then(function(data) {
          //create buttons and save locations
          getmoredetails(data.coord.lat, data.coord.lon, data.name);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to Weather Web site");
    });
};

var getmoredetails = function(citylat, citylon,cityname) {
  // format the github api url
  var apiUrl= "https://api.openweathermap.org/data/2.5/onecall?lat="+citylat+"&lon="+citylon+"&units=imperial&appid=126a080714e51ffd3ce7f4eabeb126fc";
  // make a get request to url
  fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
        repoSearchTerm.textContent = cityname + " ( "+dia+")";
        temp.textContent = data.current.temp+"F";
        wind.textContent = data.current.wind_speed+"MPH";
        humity.textContent = data.current.humidity+"%";
        uvindex.textContent= data.current.uvi;
        //date0.textContent= 
        temp0.textContent = data.daily[0].temp.day+"F";
        wind0.textContent = data.daily[0].wind_speed+"MPH";
        humity0.textContent = data.daily[0].humidity+"%";
        //date1.textContent= 
        temp1.textContent = data.daily[1].temp.day+"F";
        wind1.textContent = data.daily[1].wind_speed+"MPH";
        humity1.textContent = data.daily[1].humidity+"%";
        //date2.textContent= 
        temp2.textContent = data.daily[2].temp.day+"F";
        wind2.textContent = data.daily[2].wind_speed+"MPH";
        humity2.textContent = data.daily[2].humidity+"%";
        //date3.textContent= 
        temp3.textContent = data.daily[3].temp.day+"F";
        wind3.textContent = data.daily[3].wind_speed+"MPH";
        humity3.textContent = data.daily[3].humidity+"%";
        //date4.textContent= 
        temp4.textContent = data.daily[4].temp.day+"F";
        wind4.textContent = data.daily[4].wind_speed+"MPH";
        humity4.textContent = data.daily[4].humidity+"%";
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};


var buttonClickHandler = function(event) {
  // get the city attribute from the clicked element
  var city = event.target.getAttribute("data-city");

  if (city) {
    getFeaturedRepos(city);

    // clear old content
    repoContainerEl.textContent = "";
  }
};
// add event listeners to form and button container
userFormEl.addEventListener("submit", formSubmitHandler);
cityButtonsEl.addEventListener("click", buttonClickHandler);
