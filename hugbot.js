var ntwitter = require('ntwitter');
var auth = require('./auth');

var bot = new ntwitter(auth);

// Get a random number from 1 to 10
function getRandNum() {
  var number = Math.floor((Math.random()*10)+1);
  return number;
}

// Get a random element from an array
function getRandIndex(array){
  var index = Math.floor(array.length*Math.random());
  return array[index];
}

// Get a random pug image
function getRandPug() {
  pugs = [
  'http://bit.ly/1boVVNH',
  'http://on.vh1.com/18q12eV',
  'http://bit.ly/1aVWjl3',
  'http://bit.ly/Ik6yoi',
  'http://bit.ly/1aZrkng',
  'http://bit.ly/18oFYqv',
  'http://bit.ly/doqglS',
  'http://bit.ly/195gk56'
  ];
  var pug = getRandIndex(pugs);
  return pug;
}

// Log errors
var callback = function handleError(error) {
  if (error) {
    console.error('response status:', error.statusCode);
    console.error('data:', error.data);
  }
};

// Get a stream of Tweets
function startStreaming() {
  bot.stream('statuses/filter', { track: 'need a hug, want a hug, need hugs, want hugs' }, function(stream) {

    console.log('Listening for Tweets...');

    stream.on('data', function(tweet) {

      // Check Tweet for specific matching phrases as Twitter's Streaming API doesn't allow for this
      if (tweet.text.match(/need\sa\shug|want\sa\shug|need\shugs|want\shugs/)) {

        var number = getRandNum();
        var pugPic = getRandPug();

        // 90% chance of hug
        if (number <= 9) {

          var hugsParams = {
            // FIXME status for testing
            status: 'HUGBOT SENDS HUGS',
            // status: '@' + tweet.user.screen_name + ' HUGBOT SENDS HUGS',
            in_reply_to_status_id: tweet.id
          };

          // Add params to queue
          queue.push(hugsParams);

        // 10% chance of pug
        } else {

          var pugsParams = {
            status: '@' + tweet.user.screen_name + ' hugs over the internet are difficult, but luckily, pugs are plentiful ' + pugPic,
            in_reply_to_status_id: tweet.id
          };

          // Add params to queue
          queue.push(pugsParams);
        }
      }
    });
  });
}

// Array to store streamed tweets
var queue = [];

// Post 6 random Tweets every 5 minutes
setInterval(function() {
  console.log(queue);
  // Loop through queue to randomly select 6 Tweets
  for (var i = 0; i < 6; i++) {
    var index = Math.floor(Math.random() * queue.length);
    var sampleTweet = queue.splice(index, 1);
    console.log(i+1);
    console.log(sampleTweet[0]);

    bot.updateStatus(sampleTweet[0], sampleTweet[0], callback);
  }
}, 1000*60*5);

// Start streaming Tweets
startStreaming();
