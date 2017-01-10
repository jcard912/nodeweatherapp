"use strict"

const express = require('express'),
app = express(),
request = require('request'),
EventEmitter = require('events');

const apiKey = '93817efdcd30ed1b';
const url = 'http://api.wunderground.com/api/' + apiKey + '/conditions/q/CA/San_Francisco.json';
let weather = new EventEmitter();

request(url, function(error, response, body) {
   weather.body = JSON.parse(body);
   weather.emit('weather');
});

weather.on('weather', function() {
    console.log(`the current temperature in ${weather.body.current_observation.display_location.full} is ${weather.body.current_observation.temp_f} degrees farenheidt.`);
});



app.listen(process.env.PORT, process.env.IP, function() {
    console.log('Welcomme to the Weather App!');
});