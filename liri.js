```js
require("dotenv").config();
```
//variables needed 
var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var spotify = require("spotify-web-api-node");
var client = new Twitter
var fs = require("fs");

var arg = process.argv;
var command = process.argv[2];

var x = "";

//so you can use multiple word args
for(var i = 2; i < arg.length; i++){
    if(i > 2 && i < arg.length) {
        x = x + "+" + arg[i];
    } else {
        x = x + arg[i];
        }
    }


//commands and connctions to their functions
switch(command) {
    case "my-tweets":
        showTweets();
    break;
    case "spotify-this-song":
        if(x){
            spotifySong(x);
        } else {
            spotifySong("Someday we'll know")
        }
    break;
    case "movie-this":
        if(x){
            omdbData(x)
        } else {
            omdbData("coco")
        }
    break;
    case "do-what-it-says":
        doThing();
    break;

    default:
    console.log("{please enter a command. (ex: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
    break;
    }


//display recent 20 tweets and when created
    function showTweets() {
        var screenName = {screen_name: 'Allisamichelle'};
        client.get('statuses/user_timeline', screenName, function(error, tweets, response){
          if(!error){
            for(var i = 0; i<tweets.length; i++){
              var date = tweets[i].created_at;
              console.log("@Allisamichelle: " + tweets[i].text + " Created At: " + date.substring(0, 19));
              console.log("-----------------------");
              
              //adds text to log.txt file
              fs.appendFile('log.txt', "@Allisamichelle: " + tweets[i].text + " Created At: " + date.substring(0, 19));
              fs.appendFile('log.txt', "-----------------------");
            }
          }else{
            console.log('Error');
          }
        });
      }

//spotify song choice and display song data
      function spotifySong(song){
        spotify.search({ type: 'track', query: song}, function(error, data){
          if(!error){
            for(var i = 0; i < data.tracks.items.length; i++){
              var songData = data.tracks.items[i];
              //artist
              console.log("Artist: " + songData.artists[0].name);
              //song name
              console.log("Song: " + songData.name);
              //spotify preview link
              console.log("Preview URL: " + songData.preview_url);
              //album name
              console.log("Album: " + songData.album.name);
              console.log("-----------------------");
              
              //adds text to log.txt
              fs.appendFile('log.txt', songData.artists[0].name);
              fs.appendFile('log.txt', songData.name);
              fs.appendFile('log.txt', songData.preview_url);
              fs.appendFile('log.txt', songData.album.name);
              fs.appendFile('log.txt', "-----------------------");
            }
          } else{
            console.log('Error');
          }
        });
      }

//pulls movie info from OMDB and fisplays data
      function omdbData(movie){
        var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';
      
        request(omdbURL, function (error, response, body){
          if(!error && response.statusCode == 200){
            var body = JSON.parse(body);
      
            console.log("Title: " + body.Title);
            console.log("Release Year: " + body.Year);
            console.log("IMdB Rating: " + body.imdbRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Rotten Tomatoes URL: " + body.tomatoURL);
      
            //adds text to log.txt
            fs.appendFile('log.txt', "Title: " + body.Title);
            fs.appendFile('log.txt', "Release Year: " + body.Year);
            fs.appendFile('log.txt', "IMdB Rating: " + body.imdbRating);
            fs.appendFile('log.txt', "Country: " + body.Country);
            fs.appendFile('log.txt', "Language: " + body.Language);
            fs.appendFile('log.txt', "Plot: " + body.Plot);
            fs.appendFile('log.txt', "Actors: " + body.Actors);
            fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + body.tomatoRating);
            fs.appendFile('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL);
      
          } else{
            console.log('Error')
          }
            //adds text to log.txt
            fs.appendFile('log.txt', "-----------------------");
            fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            fs.appendFile('log.txt', "It's on Netflix!");
          }
        )};
      
//  
      function doThing(){
        fs.readFile('random.txt', "utf8", function(error, data){
          var txt = data.split(', ');
      
          spotifySong(txt[1]);
        });
      }

