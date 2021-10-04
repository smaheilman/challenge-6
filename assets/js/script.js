var cityInput = document.querySelector("#search");
var cityFormEl = document.querySelector("#city-form")
var weatherDisplay = document.querySelector("#weather-display");
var weatherSearchTerm = document.querySelector("#weather-search-term");



var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInput.value.trim();

    if (cityInput) {
        getWeather(city);
        displayData (city);
        weatherDisplay.textContent = "";
        cityInput.value = "";
    }
    else {
        alert("Please enter a City")
    }
}
var post;

var getWeather = function (city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5892e2480d6960f5cd946e34ca7a09e1";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                //console.log(response);
                response.json().then(function (data) {
                    //console.log(data);
                   var long = (data.coord.lon);
                   var lat = (data.coord.lat);

                    return fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly&appid=5892e2480d6960f5cd946e34ca7a09e1");
                });
                .then(function(response) {
                    if(response.ok) {
                        return response.json();
                    }
                    else {
                        alert("Error: " + response.statusText);
                    }
                }).then(function(data) {
                    console.log(long,lat,data);
                })
            }
        .catch(function (error) {
            alert("Unable to connect to weather data")
        });
    console.log(city);
};


var displayWeather = function (data, searchTerm) {

    weatherSearchTerm.textContent = "Weather in " + searchTerm;

    //let stuff = ["Temperature: " + data.main.temp, "Wind Speed: " + data.wind.speed + "mph", "Humidity: " + data.main.humidity + "%"];
    //let list = document.getElementById("weather-display")
    //stuff.forEach((item)=>{
        //let li = document.createElement("li");
        //li.innerText = item;
        //list.appendChild(li);
   // });

    var lat = (data.coord.lat);
    var long = (data.coord.lon);

    var apUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly&appid=5892e2480d6960f5cd946e34ca7a09e1";
    
    fetch(apUrl)
        .then(function (response) {
            if (response.ok) {
                //console.log(response);
                response.json().then(function (data) {
                    displayData = (data)
                });
            }
            else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to weather data")
        });
    
  
}

var displayData = function (data) {
    console.log(data);
}


cityFormEl.addEventListener("submit", formSubmitHandler);