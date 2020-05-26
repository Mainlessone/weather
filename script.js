const tempTag = document.querySelector('#temperature');
const humidityTag = document.querySelector('#humidity');
const timestampTag = document.querySelector('footer span');

const url = 'https://weather-hawk-api.herokuapp.com/weather';

async function getWeather() {

  const response = await fetch(url, {method: 'GET'});

  if(response.ok) {
    const weather = await response.json();

    const temp = weather[0].temperature;
    const humidity = weather[0].humidity;
    const timestamp = weather[0].timestamp;
  
    tempTag.innerHTML = 'ТЕМПЕРАТУРА: ' + temp + ' °C';
    humidityTag.innerHTML = 'ВОЛОГІСТЬ: ' + humidity + ' %';
    timestampTag.innerHTML = moment(timestamp).fromNow();
  }
  else {
    alert('Ошибка' + response.status);
  }

}

getWeather();

setInterval(getWeather, 10000);