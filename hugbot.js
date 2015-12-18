var twitter = require('twode');

// Set API keys for dev environment.
// var auth = require('./auth');
// for (var key in auth) {
//   process.env[key] = auth[key];
// }

function Bot(handle) {
  this.handle = handle;
  this.twitter = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });
}

Bot.prototype.handleError = function(error) {
  console.error('Status:', error.statusCode);
  console.error('Data:', error.data);
};

Bot.prototype.pugs = [
  'http://bit.ly/1boVVNH',
  'http://bit.ly/1aVWjl3',
  'http://bit.ly/Ik6yoi',
  'http://bit.ly/1aZrkng',
  'http://bit.ly/18oFYqv',
  'http://bit.ly/doqglS',
  'http://bit.ly/195gk56'
];

Bot.prototype.isPug = function() {
  function getRandNum(min, max) {
    return Math.floor((Math.random() * max) + min);
  }

  return getRandNum(1, 10) > 9 ? true : false;
};

Bot.prototype.getResponse = function(userHandle) {
  var response = '@' + userHandle;

  if (this.isPug()) {
    var pugPic = this.pugs[Math.floor(this.pugs.length * Math.random())];
    response += ' hugs over the internet can be tricky, but luckily, pugs are plentiful ' + pugPic;
  } else {
    response += ' HUGBOT SENDS HUGS'
  }

  return response;
};

Bot.prototype.run = function() {
  var bot = this;

  this.twitter.stream('statuses/filter', { track: '@' + this.handle }, function(stream) {

    console.log('Listening for Tweets...');

    stream.on('data', function(tweet) {
      var status = bot.getResponse(tweet.user.screen_name);

      bot.twitter.updateStatus(status, function(err) {
        if (err) return bot.handleError(err);
      });
    });
  });
};

var hugbot = new Bot('hugsorpugs');
hugbot.run();
