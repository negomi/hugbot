var ntwitter = require('ntwitter');

var bot = new ntwitter({
  consumer_key: 'CONSUMER_KEY',
  consumer_secret: 'CONSUMER_SECRET',
  access_token_key: 'ACCESS_TOKEN_KEY',
  access_token_secret: 'ACCESS_TOKEN_KEY'
});

// Get a random number from 1 to 10
function getRandNum() {
  var number = Math.floor((Math.random()*10)+1);
  return number;
}

// Get a random element from an array
function getRandIndex(array) {
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

// Array to store streamed tweets
var queue = [];

// Get a stream of Tweets
function startStreaming() {
  bot.stream('statuses/filter', { track: '@hugsorpugs' }, function(stream) {

    console.log('Listening for Tweets...');

    stream.on('data', function(tweet) {

      var number = getRandNum();
      var pugPic = getRandPug();

      // 90% chance of hug
      if (number <= 9) {

        var hugsParams = {
          status: '@' + tweet.user.screen_name + ' HUGBOT SENDS HUGS',
          in_reply_to_status_id: tweet.id
        };

        console.log(tweet.text);

        // Tweet hug reply
        bot.updateStatus(hugsParams, hugsParams, callback);

      // 10% chance of pug
      } else {

        var pugsParams = {
          status: '@' + tweet.user.screen_name + ' hugs over the internet can be tricky, but luckily, pugs are plentiful ' + pugPic,
          in_reply_to_status_id: tweet.id
        };

        console.log(tweet.text);

        // Tweet pug reply
        bot.updateStatus(pugsParams, pugsParams, callback);
      }
    });
  });
}

// Start streaming Tweets
startStreaming();
