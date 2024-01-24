const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
// const document = require("document");

// Defined path for Express confi
const viewsPath = path.join(__dirname, "../templates/views");
const publicDirectoryPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Hanflebars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to server!
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "chinna",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      Error: "You must provide the address!!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Must provide search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/about", (reeq, res) => {
  res.render("about", {
    title: "About",
    name: "chinna",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Chinna",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Chinna",
    errorMessage: "Page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    // errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});

// const weatherForm = document.querySelector("form");

// weatherForm.addEventListener("submit", () => {
//   console.log("Testing");
// });
