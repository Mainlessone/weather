const sensorLib = require('node-dht-sensor');
const dotenv = require('dotenv');

dotenv.load();

const lastTemp, lastHumidity;

const sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 4);
    },
    read: function () {
        const readout = sensorLib.read();
        
        const temp = readout.temperature.toFixed(0);
        const humidity = readout.humidity.toFixed(0);

        if (temp != lastTemp || humidity != lastHumidity) {
            lastTemp = temp;
            lastHumidity = humidity;

            const url = 'https://weather-hawk-api.herokuapp.com/weather';
            const id = '5ec4f436b8f4910ce40e1be5';

            const newData = {
            temperature: temp,
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
                    console.log('Ошибка при отправке данных');
                }

            }

            sendsUpdatedWeather();
        }

        setTimeout(function () {
            sensor.read();
        }, 2000);
    }
};

if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Ошибка при инициализации сенсора');
}