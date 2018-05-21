	require("dotenv").config();

	var fs      = require("fs"),
		request = require("request"),
		Twitter = require("twitter"),
	 	Spotify = require('node-spotify-api'),
	  	keys    = require("./keys.js"),
	 	spotify = new Spotify(keys.spotify),
	 	client  = new Twitter(keys.twitter);

	// twitter
	var myTweets = function(tweet) {
		console.log("this works!");
		var params = {screen_name: 'sethmarini'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
	 		 if (!error) {
				for(var i = 0; i < 20; i++) {
					console.log("Tweet: " + i);
					console.log("Created: " + tweets[i].created_at);
					console.log("Text: " + tweets[i].text);
				}
			}
		});
	}

	// spotify
	var spotifyThisSong = function(song) {
		spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
			if(err) {
				return console.log("Sorry cannot find song");
			}
			console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
			console.log("Song: " + data.tracks.items[0].album.external_urls.spotify);
			console.log("Album: " + data.tracks.items[0].album.name);
		});
	}

	// imdb
	var movieThis = function(movie) {
		var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
		request(queryUrl, function(err, response, body) {
			var movie = JSON.parse(body);
			console.log("Movie: " + movie.Title);
			console.log("Plot: " + movie.Plot);
			console.log("Year: " + movie.Year);
			console.log("Actors: " + movie.Actors);
			console.log("Rating: " + movie.imdbRating);
			console.log("Language: " + movie.Language);
			// console.log("Rotten Tomates: " + movie.movie.Ratings[1].Value);
		});
	};


	// text file
	var doWhatItSays = function() {
		fs.readFile("random.txt", "utf8", function(error, data) {
			if(error) {
				return console.log(error);
			}
			
			var splitData = data.split(","),
				command   = splitData[0],
			    title     = splitData[1];

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

	// main function
	var liri = function(command, title) {

			var command = process.argv[2],
				title   = process.argv[3];
			
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
