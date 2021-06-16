const request = require('request');


const forecast = (lat, long, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(long) + '&units=metric&appid=c00082db488ae8cb9b823eff69c0b989';
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        }
        else if (body.cod == "400") {
            callback('Unable to find location. Try another search.', undefined);
        }
        else {
            callback(undefined,body.weather[0].description+". It is currently "+(body.main.temp).toFixed(2)+" degrees out, and feels like "+(body.main.feels_like).toFixed(2)+"degrees. There is a pressure of "+body.main.pressure +" hPa" )
        }
    })
}
module.exports = forecast;
