var ntwitter = require('ntwitter');
var auth = require('./auth');

var bot = new ntwitter(auth);

// Get a random number from 1 to 4
function getRandNum(){
  var number = Math.floor((Math.random()*4)+1);
  return number;
}

// Get a random pug image
function getRandPug(){
  pug = ['http://2.bp.blogspot.com/-xXmJvA0VzXQ/UiDFbfEG8bI/AAAAAAAAAKM/1_Q91xejslQ/s1600/Gadget_the_pug_expressive_eyes.jpg'];
  // pug =
  return pug;
}

// Get a stream of Tweets
function startStreaming() {
  bot.stream('statuses/filter', { track: 'need a hug, want a hug, need hugs, want hugs' }, function(stream) {
    stream.on('data', function(tweet) {
      console.log(tweet.text);

      setInterval(function(){
// Check Tweet for specific matching phrases as Twitter's Streaming API doesn't allow for this
      if (tweet.text.match(/need\sa\shug|want\sa\shug|need\shugs|want\shugs/)) {

        var number = getRandNum();
        var pug = getRandPug();

        if (number <= 0) {

          var hugsParams = {
            status: 'HUGBOT SENDS HUGS',
            // status: '@' + tweet.user.screen_name + ' HUGBOT SENDS HUGS',
            in_reply_to_status_id: tweet.id
          };

          bot.updateStatus('text', hugsParams, function(error) {
            if (error) {
              console.error(error);
            }
          });

        } else {

          var pugsParams = {
            status: 'internet hugs are hard, but here\'s a pug instead ' + pug,
            // status: '@' + tweet.user.screen_name + ' internet hugs are difficult, but here\'s a pug instead ' + pug,
            in_reply_to_status_id: tweet.id
          };
          bot.updateStatus('text', pugsParams, function(error) {
            if (error) {
              console.error(error);
            }
          });

        }

      }

      console.log('Starting new cycle');

      }, 1000 * 60);




    });
  console.log('Listening for Tweets...');
  });
}

// Start streaming Tweets
startStreaming();
