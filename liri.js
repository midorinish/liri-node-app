require("dotenv").config();
//variables
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
//capture user inputs
var userOption = process.argv[2];
var inputParameter = process.argv[3];

//execute
userInputs(userOption, inputParameter) {
    switch (userOption) {
        case "concert-this":
        showConcertInfo(inputParameter);
        break;
        case "spotify-this-song":
        showSongInfo(inputParameter);
        break;
        case "movie-this":
        showMovieInfo(inputParameter);
        break;
        case "do-what-it-says":
        showSomeInfo();
        break;
        default:
        console.log("Invalid Entry. Please type any of the following: \nconcert-this \nspotify-this-song \nmovie-this \mdo-what-it-says")

    }
}

//function for concert info
function showConcert(inputParameter){
    var queryUrl = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";
    request(queryUrl, function(error, response, body) {
        //success
        if (!error && response.statusCode === 200) {
            var concerts = JSON.parse(body);
            for (var i = 0; i < concerts.length; i++) {
                console.log("***EVENT INFO***");
                fs.appendFileSync("log.txt", "***EVENT INFO***\n");
                console.log(i);
                fs.appendFileSync("log.txt", i+"\n");
                console.log("Name of Venue:" + concerts[i].venue.name);
                fs.appendFileSync("log.txt","Name of Venue:" + concerts[i].venue.name);
                console.log("Location: " + concerts[i].venue.city);
                fs.appendFileSync("log.txt","Location: " + concerts[i].venue.city);

            }
        }
    })
}