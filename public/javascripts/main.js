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
                fetch('/', options)
                    .then(response => response.json())
                    .then(data => {
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
        // Change city name
        document.querySelector('h1').textContent = 'Current Weather in ' + data.name;

        // Modify weather icon
        document.querySelector('img').setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

        // Modify weather data
        const weatherData = document.querySelectorAll('p')
        weatherData[1].textContent = Math.round(data.main.temp) + '\u00B0';
        weatherData[2].textContent = ' Humidity: ' + data.main.humidity + '%';
        weatherData[2].insertAdjacentHTML('afterbegin','<i class="fab fa-cloudscale"></i>');
        weatherData[3].textContent = ' Wind Speed: ' + data.wind.speed + ' mph';
        weatherData[3].insertAdjacentHTML('afterbegin','<i class="fas fa-wind"></i>');
        weatherData[4].textContent = ' Cloudiness: ' + data.clouds.all + '%';
        weatherData[4].insertAdjacentHTML('afterbegin','<i class="fas fa-cloud"></i>');
        weatherData[5].textContent = ' Sunrise: ' + convertEpochTime(data.sys.sunrise);
        weatherData[5].insertAdjacentHTML('afterbegin','<i class="fas fa-sun"></i>');
        weatherData[6].textContent = ' Sunset: ' + convertEpochTime(data.sys.sunset);
        weatherData[6].insertAdjacentHTML('afterbegin','<i class="fas fa-moon"></i>');
    }

    function convertEpochTime(timestamp) {
        var convertedTimestamp = new Date(timestamp * 1000);
        var hour = convertedTimestamp.getHours();
        var minute = convertedTimestamp.getMinutes();
        return hour + ":" + minute;
    }

    document.getElementById('get-location').addEventListener('click', geoFindMe);
}