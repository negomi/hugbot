var ntwitter = require('ntwitter');
var auth = require('./auth');

var bot = new ntwitter(auth);

// Get a random number from 1 to 4
function getRandNum() {
  var number = Math.floor((Math.random()*4)+1);
  return number;
}

// Get a random pug image
function getRandPug() {
  // FIXME write function to get random pug pic
  pug = ['http://2.bp.blogspot.com/-xXmJvA0VzXQ/UiDFbfEG8bI/AAAAAAAAAKM/1_Q91xejslQ/s1600/Gadget_the_pug_expressive_eyes.jpg'];
  return pug;
}

// Log errors
function handleError(error) {
  console.error('response status:', error.statusCode);
  console.error('data:', error.data);
}

// FIXME work out how to move this into a single function
function postTweet(text, params, callback) {
  bot.updateStatus(text, params, function(error) {
    console.log(tweet.text);
    if (error) {
      handleError(error);
    }
  });
}

// Get a stream of Tweets
function startStreaming() {
  bot.stream('statuses/filter', { track: 'need a hug, want a hug, need hugs, want hugs' }, function(stream) {
    stream.on('data', function(tweet) {

      // Check Tweet for specific matching phrases as Twitter's Streaming API doesn't allow for this
      if (tweet.text.match(/need\sa\shug|want\sa\shug|need\shugs|want\shugs/)) {

        var number = getRandNum();
        var pugPic = getRandPug();

        // 75% chance of hug
        if (number <= 3) {

          var hugsParams = {
            // FIXME status for testing
            status: 'HUGBOT SENDS HUGS' + number,
            // status: '@' + tweet.user.screen_name + ' HUGBOT SENDS HUGS',
            in_reply_to_status_id: tweet.id
          };

          bot.updateStatus('text', hugsParams, function(error) {
            console.log(tweet.text);
            if (error) {
              handleError(error);
            }
          });

        // 25% chance of pug
        } else {

          var pugsParams = {
            // FIXME status for testing
            status: ' internet hugs are difficult, but luckily pugs are plentiful ' + pugPic,
            // status: '@' + tweet.user.screen_name + ' internet hugs are difficult, but luckily pugs are plentiful ' + pug,
            in_reply_to_status_id: tweet.id
          };

          bot.updateStatus('text', pugsParams, function(error) {
            console.log(tweet.text);
            if (error) {
              handleError(error);
            }
          });
        }
      }
    });
  console.log('Listening for Tweets...');
  });
}

// Start streaming Tweets
startStreaming();
