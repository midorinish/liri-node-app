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
userInputs(userOption, inputParameter);
{
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
      console.log(
        "Invalid Entry. Please type any of the following: \nconcert-this \nspotify-this-song \nmovie-this mdo-what-it-says"
      );
  }
}

//function for concert info
function showConcert(inputParameter) {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    inputParameter +
    "/events?app_id=codingbootcamp";
  request(queryUrl, function(error, response, body) {
    //success
    if (!error && response.statusCode === 200) {
      var concerts = JSON.parse(body);
      for (var i = 0; i < concerts.length; i++) {
        //Title
        console.log("***EVENT INFO***");
        fs.appendFileSync("log.txt", "***EVENT INFO***\n");
        //Concert
        console.log(i);
        fs.appendFileSync("log.txt", i + "\n");
        //Name of Venue
        console.log("Name of Venue:" + concerts[i].venue.name);
        fs.appendFileSync("log.txt", "Name of Venue:" + concerts[i].venue.name);
        //Location
        console.log("Location: " + concerts[i].venue.city);
        fs.appendFileSync("log.txt", "Location: " + concerts[i].venue.city);
        //Date
        console.log("Date: " + concerts[i].datetime);
        fs.appendFileSync("log.txt", "Date: " + concerts[i].datetime);
        fs;
      }
    } else {
      console.log("Error");
    }
  });
}

//Function for Spotify

function showSongInfo(inputParameter) {
  if (inputParameter === undefined) {
    inputParameter = "Drop it Like it's Hot"; //default song
  }
  spotify.search(
    {
      type: "track",
      query: inputParameter
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }

      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log("**********SONG INFO*********");
        fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
        console.log(i);
        fs.appendFileSync("log.txt", i + "\n");
        console.log("Song name: " + songs[i].name);
        fs.appendFileSync("log.txt", "song name: " + songs[i].name + "\n");
        console.log("Preview song: " + songs[i].preview_url);
        fs.appendFileSync(
          "log.txt",
          "preview song: " + songs[i].preview_url + "\n"
        );
        console.log("Album: " + songs[i].album.name);
        fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
        console.log("Artist(s): " + songs[i].artists[0].name);
        fs.appendFileSync(
          "log.txt",
          "artist(s): " + songs[i].artists[0].name + "\n"
        );
        console.log("*****************************");
        fs.appendFileSync("log.txt", "*****************************\n");
      }
    }
  );
}

//Function for OMDB
function showMovieInfo(inputParameter) {
  if (inputParameter === undefined) {
    inputParameter = "The Thing"; //default
  }
  var queryUrl =
    "http://www.omdbapi.com/?t=" +
    inputParameter +
    "&y=&plot=short&apikey=b3c0b435";
  request(queryUrl, function(err, response, body) {
    //success
    if (!error && response.statusCode === 200) {
      var movies = JSON.parse(body);
      console.log("Title: " + movies.Title);
      fs.appendFileSync("log.txt", "Title: " + movies.Title + "\n");
      console.log("Release Year: " + movies.Year);
      fs.appendFileSync("log.txt", "Release Year: " + movies.Year + "\n");
      console.log("IMDB Rating: " + movies.imdbRating);
      fs.appendFileSync("log.txt", "IMDB Rating: " + movies.imdbRating + "\n");
      console.log(
        "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies)
      );
      fs.appendFileSync(
        "log.txt",
        "Rotten Tomatoes Rating: " + getRottenTomatoesRatingValue(movies) + "\n"
      );
      console.log("Country of Production: " + movies.Country);
      fs.appendFileSync(
        "log.txt",
        "Country of Production: " + movies.Country + "\n"
      );
      console.log("Language: " + movies.Language);
      fs.appendFileSync("log.txt", "Language: " + movies.Language + "\n");
      console.log("Plot: " + movies.Plot);
      fs.appendFileSync("log.txt", "Plot: " + movies.Plot + "\n");
      console.log("Actors: " + movies.Actors);
      fs.appendFileSync("log.txt", "Actors: " + movies.Actors + "\n");
    } else {
      console.log("Error");
    }
  });
}

//read random.txt file
//function showSomeInfo ({
//fs.readFile ("random.txt", "utf8", function(err, data){
//if (err) {
//return console.log(err);
//}
//var dataArray = data.split(",");
//userInputs(dataArray[0], dataArray[1]);
//})
//})
