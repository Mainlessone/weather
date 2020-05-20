const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeatherSchema = new Schema({
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        default: Date.now()
    }
})

module.exports = Weather = mongoose.model('weathers', WeatherSchema);