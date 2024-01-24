const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=fd905ca8b5e548643358356eecd809aa&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url: url, json: true }, (error, responce) => {
    if (error) {
      callback("Unable to connect to server!", undefined);
    } else if (responce.body === undefined) {
      callback("please provide the correst cordinates!", undefined);
    } else {
      callback(undefined, responce.body);
    }
  });
};

module.exports = forecast;
