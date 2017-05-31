var API_KEY = "212a1c343d830a85d8a592a1c730f8d9";
var cel = false;
var weatherData;

function tempDisplay(Ftemp, c) {
    if (c) return Math.round((Ftemp - 32) * (5 / 9)) + " Degree C";
    return Math.round(Ftemp) + " Degree F";
}

function reusable(weatherData, cel) {
    var currentLocation = weatherData.name;
    var currentWeather = weatherData.weather[0].description;
    var currentTemperature = tempDisplay(weatherData.main.temp, cel);
    var highestTemperature = tempDisplay(weatherData.main.temp_max, cel);
    var lowestTemperature = tempDisplay(weatherData.main.temp_min, cel);
    var icons = weatherData.weather[0].icon;

    $('#currentLocation').html(currentLocation);
    $('#currentWeather').html(currentWeather);
    $('#currentTemperature').html(currentTemperature);
    $('#lowestTemperature-highestTemperature').html(lowestTemperature + " | " + highestTemperature);

    var iconSrc = "https://openweathermap.org/img/w/" + icons + ".png";
    $('#currentTemperature').prepend('<img src="' + iconSrc + '">');
}


$(function () {
    var loc;
    $.getJSON('http://ipinfo.io/json', function (f) {
        console.log("where the data begins to assgin!");
        loc = f.loc.split(",");
        console.log(loc);

        $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=' + loc[0] + '&lon=' + loc[1] + '&APPID=' + API_KEY, function (apiData) {
            weatherData = apiData;

            reusable(apiData, cel);
            $('#toggle').click(function () {
                cel = !cel;
                reusable(weatherData, cel);
            })
        })
    })
});