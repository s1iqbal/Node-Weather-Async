const request = require('request');

exports.geocodeAddress = (address, callback) => {
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  },(error, response, body) => {
    if (error) {
      callback("Unable to connect to Google servers.");
    }
    else if (body.status === 'ZERO_RESULTS') { //google api returns ZERO_RESULTS when the address is invalid
      callback("Unable to find the address. Please enter a correct address/zipcode/location");
    }
    else if (address.length === 0) {
      callback("Please enter an address.")
    }
    else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};
