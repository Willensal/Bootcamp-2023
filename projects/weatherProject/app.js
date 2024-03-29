const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "7ebcfa1670a91cacf570662df6c7dd13";
    const units = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iamgeURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1> The Temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
            res.write("<h2> the weather is currently: " + weatherDescription + "</h2>");
            res.write("<img src=" + iamgeURL + ">");
            res.send();
        })


    })


})

app.listen(3000, function () {
    console.log("server is running on port 3000");
});
