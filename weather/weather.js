const request = require('request');
var getWeather = (longitude, latitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/7aa10610dfa49b52ba0c3abf5e9089c9/${longitude},${latitude}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback("Unable to connect.");
    }
    else if (body.code === 400) {
      callback("Incorrect address.")
    }
    else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
}

module.exports.getWeather = getWeather;
