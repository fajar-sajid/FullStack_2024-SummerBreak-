function getWeather(){
    const apiKey='46f0c4b3d3ab19fd4aba6bf1176d4847';
    const city=document.getElementById('city').value;
    if (!city){
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response=>response.json())
        .then(data=>{
            displayWeather(data);
            return fetch(forecastUrl);
        })
        .then(response=>response.json())
        .then(data=>{
            displayHourlyForecast(data.list);
        })
        .catch(error=>{
            console.error(error);
            alert('Error fetching data. Please try again.');
        });
}

function displayWeather(data){
    const tempDivInfo=document.getElementById('temp-div');
    const weatherInfoDiv=document.getElementById('weatherinfo');
    const weatherIcon=document.getElementById('weather-icon');

    if (data.cod===404){
        weatherInfoDiv.innerHTML=`<p>${data.message}</p>`;
        return;
    }

    const cityName=data.name;
    const temperature=Math.round(data.main.temp - 273.15);
    const description=data.weather[0].description;
    const iconCode=data.weather[0].icon;
    const iconUrl=`https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    tempDivInfo.innerHTML=`<p>${temperature}°C</p>`;
    weatherInfoDiv.innerHTML=`<p>${cityName}</p><p>${description}</p>`;
    weatherIcon.src=iconUrl;
    weatherIcon.alt=description;
    weatherIcon.style.display = 'block';
}

function displayHourlyForecast(hourlyData){
    const hourlyForecastDiv=document.getElementById('hourlyforcast');
    hourlyForecastDiv.innerHTML='';
    const next24Hours=hourlyData.slice(0,8);

    next24Hours.forEach(item=>{
        const hour=new Date(item.dt*1000).getHours();
        const temperature=Math.round(item.main.temp-273.15);
        const iconCode=item.weather[0].icon;
        const iconUrl=`https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const hourlyItemHTML=`
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML +=hourlyItemHTML;
    });
}
