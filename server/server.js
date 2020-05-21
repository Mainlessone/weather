const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const db = 'mongodb+srv://mainless:12345678milk@cluster0-gddgz.mongodb.net/test?retryWrites=true&w=majority';

const app = express();
const port = process.env.PORT || 3000;

const Weather = require('./model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(db, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true }, err=>{
    if(err) {
        console.error('Ошибка ' + err);
    }
    else {
        console.log('Подключен к mongoDB');
    }
})

app.get('/', (req,res)=>{
    res.status(201).send('Api работает');
})

app.get('/weather', (req, res)=>{
    Weather.find((err, data)=>{
        res.status(200).json(data);
    })
})

app.put('/weather', (req, res)=>{
    const weatherId = req.query.id;
    const updatedWeather = req.body;
    
    Weather.updateOne({_id: weatherId}, updatedWeather, (err, done)=>{
        if(err) console.log(err);
        res.status(200).send(done);
    })
})

app.listen(port, ()=>{
    console.log('Сервер работает на: ' + port);
})