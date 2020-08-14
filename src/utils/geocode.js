const request = require('request')

const geocode = (address, callback) => {
    const url = "http://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoidmlzaGFsLXBvd2FyNSIsImEiOiJja2RqeGxicmMwamJrMnNxeGR3ZTZnM2d6In0.GUbz-P3qwHHMzHfZtGfddw&limit=1"
    request({ url, json: true }, (error, response) => {
        const { features } = response.body
        if (error) {
            callback("unable to connect to geocode", undefined)
        } else if (features.length === 0) {
            callback("unable to find location for geocode", undefined)
        } else {
            callback(undefined, {
                longitude: features[0].center[0],
                latitude: features[0].center[1],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode