const axios = require('axios');

var getWeather = (address) => {
  var geocodeurl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`;
  axios.get(geocodeurl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find address.');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/7aa10610dfa49b52ba0c3abf5e9089c9/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherURL);
  }).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It is currently ${temperature}. It feels like ${apparentTemperature}`);
  }).catch((e) => {
    if(e.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers');
    }
    else {
      console.log(e.message);
    }
  });
}

module.exports.getWeather = getWeather;
