const tempTag = document.querySelector('#temperature');
const humidityTag = document.querySelector('#humidity');
const timestampTag = document.querySelector('footer span');

const url = 'http://localhost:3000/weather';

async function getWeather() {

  let response = await fetch(url, {method: 'GET'});

  if(response.ok) {
    let weather = await response.json();

    const temp = weather[0].temperature;
    const humidity = weather[0].humidity;
    const timestamp = weather[0].timestamp;
  
    tempTag.innerHTML = 'ТЕМПЕРАТУРА: ' + temp + ' °C';
    humidityTag.innerHTML = 'ВЛАЖНОСТЬ: ' + humidity + ' %';
    timestampTag.innerHTML = moment(timestamp).fromNow();
  }
  else {
    alert('Error' + response.status);
  }

}

getWeather();

setInterval(getWeather, 10000);