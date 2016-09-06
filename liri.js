var inquirer = require('inquirer');
var fs = require('fs');

inquirer.prompt([
    // Here we give the user a list to choose from.
    {
        type: "list",
        message: "What would you like to search?",
        choices: ["my tweets", "spotify", "movie", "do what it says"],
        name: "command"
    }

    // Once we are done with all the questions... "then" we do stuff with the answers
    // In this case, we store all of the answers into a "user" object that inquirer makes for us. 
]).then(function(user) {

    //requests user input
    var request = require('request');

    //user selects my tweets
    if (user.command === "my tweets") {

        // This block of code will read from the "keys.js" file.
        // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
        // The code will store the contents of the reading inside the variable "data" 
        // fs.readFile("keys.js", "utf8", function(error, data) {
        //     //     //We will then print the contents of data
        //     //     //console.log(data);
        //     var dataArr = data.split(',');
        //     var comKey = dataArr[0].slice(74, 101);
        //     //console.log(comKey);
        //     var comSecret = dataArr[1].slice(22, 72);
        //     //console.log(comSecret);
        //     var accessTokenKey = dataArr[2].slice(23, 74);
        //     //console.log(accessTokenKey);
        //     var accessTokenSecret = dataArr[3].slice(27, 72);
        //     //console.log(accessTokenSecret);
        // });

        var twitter = require("twitter");

        var client = new twitter({
            consumer_key: 'fFA2tspPNNJl9TIPsRVmBYSK7',
            consumer_secret: 'HA8ZJKqZdgEMqSN1NhpPieCZaHwS0hQw5o4I4fEil42wBzV15C',
            access_token_key: '2590548443-gimSJwF8enTouzwa9GHzktYEKRD5ZFz2XbV3xfw',
            access_token_secret: 'rrsvzQ7hqBfEGl0M0ymIniPNAnof4xJIJN1KDHv3lykof',
        });
        var count = 20;
        var params = { screen_name: '@IgawaJustin' };
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for (i = 0; i < count; i++) {
                    console.log(tweets[i].text);
                }
            }
        });
    }

    //if user selects spotify
    else if (user.command === "spotify") {

        //allows user to type in which song they would like to search
        inquirer.prompt([

            {
                type: "input",
                message: "What song would you like to look up?",
                name: "search"
            }
            //once user types in song, THEN code does following
        ]).then(function(user) {
            //if user types in a song
            if (user.search) {

                request('https://api.spotify.com/v1/search?q=' + user.search + '&type=track', function(error, response, body) {

                    if (!error && response.statusCode == 200) {

                        console.log("Artist(s): " + JSON.parse(body).tracks.items[0].artists[0].name);
                        console.log("Song Name: " + JSON.parse(body).tracks.items[0].name);
                        console.log("Preview Link: " + JSON.parse(body).tracks.items[0].preview_url);
                        console.log("Album: " + JSON.parse(body).tracks.items[0].album.name);
                    }
                });
            }
            //if user doesn't type in a song
            else {

                request('https://api.spotify.com/v1/search?q=the+sign&type=track', function(error, response, body) {

                    if (!error && response.statusCode == 200) {

                        console.log("Artist(s): " + JSON.parse(body).tracks.items[4].artists[0].name);
                        console.log("Song Name: " + JSON.parse(body).tracks.items[4].name);
                        console.log("Preview Link: " + JSON.parse(body).tracks.items[4].preview_url);
                        console.log("Album: " + JSON.parse(body).tracks.items[4].album.name);
                    }
                });
            }
        });
    }

    //if user selects movie
    else if (user.command === "movie") {
        //allows user to type in which movie they would like to search
        inquirer.prompt([

            {
                type: "input",
                message: "What movie would you like to look up?",
                name: "search"
            }
            //once user types in movie, THEN code does following
        ]).then(function(user) {
            //if user types in movie
            if (user.search) {

                request('http://www.omdbapi.com/?t=' + user.search + '&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {

                    if (!error && response.statusCode == 200) {

                        console.log("Title: " + JSON.parse(body).Title);
                        console.log("Year Released: " + JSON.parse(body).Year);
                        console.log("IMDB's Rating: " + JSON.parse(body).imdbRating);
                        console.log("Country movie was produced: " + JSON.parse(body).Country);
                        console.log("Language: " + JSON.parse(body).Language);
                        console.log("Plot: " + JSON.parse(body).Plot);
                        console.log("Actors: " + JSON.parse(body).Actors);
                        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
                        console.log("Rotten Tomatoes url: " + JSON.parse(body).tomatoURL);

                    }
                });
            }
            //if user doesn't type in a movie
            else {

                request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {

                    if (!error && response.statusCode == 200) {

                        console.log("Title: " + JSON.parse(body).Title);
                        console.log("Year Released: " + JSON.parse(body).Year);
                        console.log("IMDB's Rating: " + JSON.parse(body).imdbRating);
                        console.log("Country movie was produced: " + JSON.parse(body).Country);
                        console.log("Language: " + JSON.parse(body).Language);
                        console.log("Plot: " + JSON.parse(body).Plot);
                        console.log("Actors: " + JSON.parse(body).Actors);
                        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
                        console.log("Rotten Tomatoes url: " + JSON.parse(body).tomatoURL);
                        console.log("If you haven't watched 'Mr. Nobdy', then you should: http://www.imdb.com/title/tt0485947/");
                        console.log("It's on Netflix!");
                    }
                });
            }
        });
    }

    //user selects my do what it says
    else if (user.command === "do what it says") {

        // This block of code will read from the "random.txt" file.
        // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
        // The code will store the contents of the reading inside the variable "data" 
        fs.readFile("random.txt", "utf8", function(error, data) {
            var defaultSong = data.slice(19, 37);
            //console.log(defaultSong);

            request('https://api.spotify.com/v1/search?q=i+want+it+that+way&type=track', function(error, response, body) {

                    if (!error && response.statusCode == 200) {

                        console.log("Artist(s): " + JSON.parse(body).tracks.items[0].artists[0].name);
                        console.log("Song Name: " + JSON.parse(body).tracks.items[0].name);
                        console.log("Preview Link: " + JSON.parse(body).tracks.items[0].preview_url);
                        console.log("Album: " + JSON.parse(body).tracks.items[0].album.name);
                    }
                });
        });

    }
});
