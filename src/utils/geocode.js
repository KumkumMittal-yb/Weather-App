const request = require('request');

const geocode = (input, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(input) + '.json?access_token=pk.eyJ1Ijoia3Vta3VtLW1pdHRhbCIsImEiOiJja3BiNnVyYm4wNGsyMnFydGhxcHhuaXJjIn0.rRfcp9SLF3-Bus_LEuwUTQ&limit=1'
    request({url, json: true }, (error, {body}) => {

        if (error) {
            callback('Unable to connect to location services', undefined);
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        }
        else {

            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude:body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;