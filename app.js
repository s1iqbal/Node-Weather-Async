const yargs = require('yargs');

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

geocode.geocodeAddress(encodedAddress, (errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
        console.log("Displaying address for,", results.address);
        weather.getWeather(results.latitude,results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
              console.log(errorMessage);
            } else {
              console.log(`It is currently ${weatherResults.temperature} degrees. It feels like ${weatherResults.apparentTemperature} degrees`);
            }
        });
    }
});
