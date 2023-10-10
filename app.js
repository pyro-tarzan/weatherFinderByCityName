const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const cityName = req.body.weatherDetail;
    const query = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    console.log(query);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=2245cc7bd0a1587c85939814595cbcd3`;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const cityName = weatherData.name;
            const temp = weatherData.main.temp;
            const status = weatherData.weather[0].description;
            console.log(status);
            console.log(temp);
            const icon = weatherData.weather[0].icon;
            console.log(icon);
            const link = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            const long = weatherData.coord.lon;
            const lat = weatherData.coord.lat;

            res.write("<h1>The Weather is currently <u>" + status + "</u>.</h1>");
            res.write("<h1>The Temperature in " +query+ " is " + temp + " degrees Celcius.</h1>");
            res.write(`<img src=${link}></img>`);
            res.write("<p>Longitutde: " + long + ".</p>");
            res.write("<p>Latitutde: " + lat + ".</p>");
            res.send();
            });
        });
});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});