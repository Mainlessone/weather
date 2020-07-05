const sensorLib = require('node-dht-sensor');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.load();

let prevTemp, prevHumidity;

const sensor = {
    initialize: () => {
        return sensorLib.initialize(11, 4);
    },
    read: () => {
        const readout = sensorLib.read();
        
        const temperature = readout.temperature.toFixed(0);
        const humidity = readout.humidity.toFixed(0);

        if (temp != prevTemp || humidity != prevHumidity) {
            prevTemp = temperature;
            prevHumidity = humidity;

            const url = 'https://weather-hawk-api.herokuapp.com/weather';
            const id = '5ec4f436b8f4910ce40e1be5';

            const newData = {
            temperature: temperature,
            humidity: humidity,
            timestamp: Date.now()
            };

            async function sendsUpdatedWeather() {
                const response = await fetch(url + '?id=' + id, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(newData)
                    })

                if(response.ok) {
                    const result = await response.json();
                    console.log('Данные отправлены успешно' + result);
                }
                else {
                    console.log('Ошибка при отправлении данных');
                }

            }

            sendsUpdatedWeather();
        }

        setTimeout(() => {
            sensor.read();
        }, 2000);
    }
};

if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Ошибка при инициализации сенсора');
}