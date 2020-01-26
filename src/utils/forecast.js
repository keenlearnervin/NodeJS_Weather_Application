const request = require('request');
const chalk = require('chalk');

const forecast = (latitude, longitude, callback) => {
    const weatherUrl = 'https://api.darksky.net/forecast/edfe7831ab95861c69a49ec897c5dca0/' + latitude + ',' + longitude + '?units=si';
    request({ url: weatherUrl, json: true }, (error, { body }) => {

        if (error) {
            callback(error);
        } else if (body.error) {
            callback('Wrong Coordinates');
        } else {
            const temp = body.currently.temperature;
            const rainChance = body.currently.precipProbability;
            const dailySummary = body.daily.data[0].summary;

            callback(undefined, "Summary for the day: " + dailySummary + " " + "The current temperature is " + temp + " degrees" + " with " + rainChance + "%" + " chance of rain.");
        }

    });
};

module.exports = forecast;