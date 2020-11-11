window.onload = function () {
    function geoFindMe() {
        if ('geolocation' in navigator) {
            console.log('geolocation available');
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const data = { latitude, longitude };
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
                fetch('/geolocationweather', options)
                    .then(response => response.json())
                    .then(data => {
                        //console.log('Success:', data);
                        renderWeather(data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            });
        } else {
            console.log('geolocation not available');
        }
    }

    function renderWeather(data) {
        // Replacing the current weather with the user's geolocation current weather
        var currentWeather = '';
        currentWeather += '<h1 class="card-title">' + data.city.name +' Weather';
        currentWeather += '<p class="card-text">' + data.list[0].weather[0].description + '</p>';
        currentWeather += '<p>Current Temperature: ' + data.list[0].main.temp + '</p>';
        currentWeather += '<p>Low: ' + data.list[0].main.temp_min + '</p>';
        currentWeather += '<p>High: ' + data.list[0].main.temp_max + '</p></h1>';
        document.getElementById('current-weather').innerHTML = currentWeather;

        // Replacing the rest of the five day forecast with the user's geolocation five day forecast
        var fiveDayForecast = '';
        for (var i = 1; i < data.list.length; i++) {
            fiveDayForecast += '<li class="list-group-item flex-fill">Day ' + i;
            fiveDayForecast += '<p>Temperature: ' + data.list[i].main.temp + '</p>';
            fiveDayForecast += '<p>Low: ' + data.list[i].main.temp_min + ' / ' + 'High: ' + data.list[i].main.temp_max + '</p>';
            fiveDayForecast += '</li>';
        }
        document.getElementById('five-day-forecast').innerHTML = fiveDayForecast;
    }

    document.getElementById('get-location').addEventListener('click', geoFindMe);
}