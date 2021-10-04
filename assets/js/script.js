var cityInput = document.querySelector("#search");
var cityFormEl = document.querySelector("#city-form")
var weatherDisplay = document.querySelector("#weather-display");
var weatherSearchTerm = document.querySelector("#weather-search-term");



var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInput.value.trim();

    if(cityInput) {
        getWeather(city);
        weatherDisplay.textContent="";
        cityInput.value = "";
    }
    else{
        alert("Please enter a City")
    }
}

var getWeather = function(city) {
    var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5892e2480d6960f5cd946e34ca7a09e1";

    fetch(apiUrl)
        .then(function(response){
            if(response.ok) {
                console.log(response);
                response.json().then(function(data){
                    console.log(data);
                    displayWeather(data, city);
                });
            }
            else{
                alert("Error: " + response.statusText);
            }
    })
    .catch(function(error){
        alert("Unable to connect to weather data")
    });
    console.log(city);
};

cityFormEl.addEventListener("submit", formSubmitHandler);