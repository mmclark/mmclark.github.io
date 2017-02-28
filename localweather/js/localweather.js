/**
 * Onclick event handler for the temperature scale. Flip between
 * Fahrenheit and Celsius on every click.
 */
document.getElementById('temp-scale-val').onclick = function(evt) {
    var tempVal;

    /** Conversion function: Fahrenheit to Celsius */
    function f2c(fVal) {
        return Math.round((parseInt(fVal) - 32) * 5/9);
    }

    /** Conversion function: Celsius to Fahrenheit */
    function c2f(cVal) {
        return Math.round(parseInt(cVal) * 9/5 + 32);
    }

    var tempVal = document.getElementById('tempval');
    if (evt.target.text === 'Fahrenheit') {
        evt.target.text = 'Celsius';
        tempVal.textContent = f2c(tempVal.textContent);
    } else {
        evt.target.text = 'Fahrenheit';
        tempVal.textContent = c2f(tempVal.textContent);
    }
}

// Retrieve the current geolocation and call out to the 
// OpenWeatherMap API.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(pos) {
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    var owmk = "16fd6af4df03c8dc21623d105c13a957";
    var api_url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + 
        "&lon=" + long +
        "&units=imperial" +
        "&appid=" + owmk;
    
    $.getJSON(api_url, function(json) {
        // docs on the returned json can be found here:
        // http://openweathermap.org/current
        document.getElementById('location-name').innerHTML = json['name'];
        document.getElementById('tempval').innerHTML = Math.round(json['main']['temp']);
        document.getElementById('deg').innerHTML = "&deg;";
        document.getElementById('weather-description').innerHTML = json['weather'][0]['main'];

        // Set weather icon based on owm code.  See
        // https://erikflowers.github.io/weather-icons/api-list.html
        document.getElementById('weather-icon').className = "wi wi-owm-" + json['weather'][0]['id'];

        // We default to Fahrenheit, but clicking the link
        // wil switch to Celsius.
        document.getElementById('temp-scale-val').textContent = 'Fahrenheit';
    }).fail(function() {
        console.log("getJSON failed");
    });
    /*
    */
  });

}