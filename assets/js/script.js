var cityInput = document.querySelector("#search");
var cityFormEl = document.querySelector("#city-form")
var weatherDisplay = document.querySelector("#weather-display");
var weatherSearchTerm = document.querySelector("#weather-search-term");
var forecastEl = document.querySelector(".five-day");
var forecastE2 = document.querySelector("#dayTwo");
var forecastE3 = document.querySelector("#dayThree");
var forecastE4 = document.querySelector("#dayFour");
var forecastE5 = document.querySelector("#dayFive");
var cities = [];



var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInput.value.trim();


    if (cityInput) {
        getWeatherCity(city);
        weatherDisplay.textContent = "";
        cityInput.value = "";
        forecastEl.textContent="";
        forecastE2.textContent='';
        forecastE3.textContent='';
        forecastE4.textContent='';
        forecastE5.textContent='';
    }
    else {
        alert("Please enter a City")
    }
}

var getWeatherCity = function (city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5892e2480d6960f5cd946e34ca7a09e1";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                //console.log(response);
                response.json().then(function (data) {
                    //console.log(data);
                    displayWeather(data, city);
                });
            }
            else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to weather data")
        });
    console.log(city);
        
    cities.push(city);

    localStorage.setItem("searchcity", JSON.stringify(cities));

    var saved = JSON.parse(localStorage.getItem("searchcity"));
    console.log(saved);

};


var displayWeather = function (data, searchTerm) {
    var date= moment.unix(data.dt).format("MM/DD/YYYY");

    weatherSearchTerm.textContent = "Weather in " + searchTerm + " " + date;

    var getWeather = function (lat, long) {
        var lat = (data.coord.lat);
        var long = (data.coord.lon);

        var apUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&exclude=minutely,hourly&appid=5892e2480d6960f5cd946e34ca7a09e1";

        fetch(apUrl).then(function (response) {
            if (response.ok)
                response.json().then(function (data) {
                    displayData(data);
                    displayForecast1(data);
                    displayForecast2(data);
                    displayForecast3(data);
                    displayForecast4(data);
                    displayForecast5(data);
                });
        })
        console.log(apUrl);

    }
    var displayData = function (data) {
        let stuff = ["Temperature: " + data.current.temp + "F", "Wind Speed: " + data.current.wind_speed + "mph", "Humidity: " + data.current.humidity + "%", "UVI: " + data.current.uvi];
        let list = document.getElementById("weather-display")
        stuff.forEach((item) => {
            let li = document.createElement("li");
            li.innerText = item;
            list.appendChild(li);
        }) 

    }

    var displayForecast1 = function (data) {
        var date= moment.unix(data.daily[1].dt).format("MM/DD/YYYY");

        let forecast = [date, "Temp: " + data.daily[1].temp.day + "F", data.daily[1].weather[0].icon, "Wind Speed: " + data.daily[1].wind_speed + "mph", "Humidty: " + data.daily[1].humidity + "%"]
        let list = document.getElementById("dayOne")
        forecast.forEach((item) => {
            let li = document.createElement("li");
            li.innerText= item;
            list.appendChild(li);
        }) 
    }
    var displayForecast2 = function (data) {
        var date= moment.unix(data.daily[2].dt).format("MM/DD/YYYY");

        let forecast = [date, "Temp: " + data.daily[2].temp.day + "F", data.daily[2].weather[0].icon, "Wind Speed: " + data.daily[2].wind_speed + "mph", "Humidty: " + data.daily[2].humidity + "%"]
        let list = document.getElementById("dayTwo")
        forecast.forEach((item) => {
            let li = document.createElement("li");
            li.innerText= item;
            list.appendChild(li);
        }) 
    }
    var displayForecast3 = function (data) {
        var date= moment.unix(data.daily[3].dt).format("MM/DD/YYYY");

        let forecast = [date, "Temp: " + data.daily[3].temp.day + "F", data.daily[3].weather[0].icon, "Wind Speed: " + data.daily[3].wind_speed + "mph", "Humidty: " + data.daily[3].humidity + "%"]
        let list = document.getElementById("dayThree")
        forecast.forEach((item) => {
            let li = document.createElement("li");
            li.innerText= item;
            list.appendChild(li);
        }) 
    }
    var displayForecast4 = function (data) {
        var date= moment.unix(data.daily[4].dt).format("MM/DD/YYYY");

        let forecast = [date, "Temp: " + data.daily[4].temp.day + "F", data.daily[4].weather[0].icon, "Wind Speed: " + data.daily[4].wind_speed + "mph", "Humidty: " + data.daily[4].humidity + "%"]
        let list = document.getElementById("dayFour")
        forecast.forEach((item) => {
            let li = document.createElement("li");
            li.innerText= item;
            list.appendChild(li);
        }) 
    }
    var displayForecast5 = function (data) {
        var date= moment.unix(data.daily[5].dt).format("MM/DD/YYYY");

        let forecast = [date, "Temp: " + data.daily[5].temp.day + "F", data.daily[5].weather[0].icon, "Wind Speed: " + data.daily[5].wind_speed + "mph", "Humidty: " + data.daily[5].humidity + "%"]
        let list = document.getElementById("dayFive")
        forecast.forEach((item) => {
            let li = document.createElement("li");
            li.innerText= item;
            list.appendChild(li);
        }) 
    }
    getWeather();
}


cityFormEl.addEventListener("submit", formSubmitHandler);