const yargs = require('yargs');
const axiosWeather = require('./axiosWeather/axiosWeather.js');

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

axiosWeather.getWeather(encodedAddress);
