const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=37bc5543593c709a7af2beb197953fe3&query=${latitude},${longitude}&units=f`

    request({ url, json: true }, (error, response) => {
        const { current, error: ResponseError } = response.body
        if (error) {
            callback("unable to connect weather api.!", undefined)
        } else if (ResponseError) {
            callback("unable to find location for weather.!", undefined)
        } else {
            callback(undefined, {
                info: current.weather_descriptions[0],
                temperature: current.temperature,
                feelslike: current.feelslike
            })
        }
    })
}

module.exports = forecast