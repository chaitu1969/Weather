const request = require("request");

// const GeoCode = (address, callBack) => {
//   const url =
//     "http://api.weatherstack.com/current?access_key=fd905ca8b5e548643358356eecd809aa&query=17.3850,78.4867&units=m";

//   request({ url: url, json: true }, (error, response) => {
//     if (error) {
//       callBack("unable to connect to location services!", undefined);
//     } else if (response.body.location.name == 0) {
//       callBack("Unable to find the Location", undefined);
//     } else {
//       callBack(undefined, {
//         latitude: response.body.location.lat,
//         longitude: response.body.location.lon,
//         location: response.body.location.name,
//       });
//     }
//   });
// };

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiY2hpbm5ha2FybGUiLCJhIjoiY2xvcjJiM3phMHJ0dTJqcGUza3hybzVzMyJ9.9InZaiN6gGI2dabFr64y-Q";
  request({ url, json: true }, (error, responce) => {
    if (error) {
      callback("Unable to connect the server!", undefined);
    } else if (responce.body.features.length === 0) {
      callback("Unable to find location, try another search", undefined);
    } else {
      callback(undefined, {
        latitude: responce.body.features[0].center[0],
        longitude: responce.body.features[0].center[1],
        Name: responce.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
