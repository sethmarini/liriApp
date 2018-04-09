require("dotenv").config();

var fs = require("fs");
var request = require("request");
 
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

// Client ID: 1e0997f6e58842c5b1db5f462d7e8299
// Client Secret: 34d1ef11b18d49c5a3ccf340bf0d56bc
// key: c74ac23b
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// twitter
var myTweets = function() {
	var params = {screen_name: 'sethmarini'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (!error) {
    console.log(tweets);
  }
	console.log("It works!");
}

// spotify
var spotifyThisSong = function(arr) {

	if (!arr) {
		arr = "The Sign";
	}

	console.log("Song: " + arr);
}

// imdb
var movieThis = function(arr) {

	if (!arr) {
		arr = "Pulp Fiction";
	}

	console.log("Movie: " + arr);
}

// text file
var doWhatItSays = function() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if(error) {
			return console.log(error);
		}
		console.log(data);
		var splitData = data.split(",");
		console.log(splitData);
		var command = splitData[0];
		var title = splitData[1];
		console.log(command);
		switch (command) {
			case "my-tweets":
				myTweets();
				break;
			case "spotify-this-song":
				spotifyThisSong(title);
				break;
			case "movie-this":
				movieThis(title);
				break;
			case "do-what-it-says":
				doWhatItSays();
				break;
			default:
				console.log("An error has occured!");
		}
	})
}

var liri = function() {

		var command = process.argv[2]; 
		var title = process.argv[3];
		console.log(command);
		switch (command) {
			case "my-tweets":
				myTweets();
				break;
			case "spotify-this-song":
				spotifyThisSong(title);
				break;
			case "movie-this":
				movieThis(title);
				break;
			case "do-what-it-says":
				doWhatItSays();
				break;
			default:
				console.log("An error has occured!");
		}
};

liri();




