const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

const argv = yargs
  .options({
    a: { //address option
      demand:true,
      alias: 'address',
      describe: 'Address to fetch weather for.',
      string: true //means address="" has to be required.
    }
  })
  .help()
  .alias('help', 'h') //you can use --h instead of --help if you wanted to.
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeurl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

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
