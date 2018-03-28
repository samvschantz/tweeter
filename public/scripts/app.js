$(function(){
  //function for transforming received tweet data into HTML
  function createTweetElement(tweetData){
    var name = tweetData['user']['name'];
    var largeAvatar = tweetData['user']['avatars']['large'];
    var handle = tweetData['user']['handle'];
    var content = tweetData['content']['text'];
    var created_at = tweetData['created_at'];

    var $tweet = $("<article>").addClass("oldTweet");

    //header
    var $img = $("<img>").attr("src", largeAvatar);
    var $displayName = $(`<div>`).addClass("displayName").append(`${name}</div>`);
    var $userName = $(`<div>`).addClass("userName").append(`${handle}</div>`);
    var $header = $("<header>");
    $($header).append($img);
    $($header).append($displayName);
    $($header).append($userName);

    $($tweet).append($header);

    //content
    var $content = $(`<div>${content}</div>`).addClass("content");
    $($tweet).append($content);

    //footer
    var $footer = $("<footer>");
    var $daysSince = $(`<div>${created_at}</div>`).addClass("daysSince");
    $($footer).append($daysSince);
    $($tweet).append($footer)
    $($tweet).append("</article>")

    return $tweet
  }

  //goes through tweets and displays using previously defined function
  function renderTweets(tweets) {
    for (i in tweets){
      var $tweet = createTweetElement(tweets[i])
      $('#tweetContainer').append($tweet);
    }
  }

  renderTweets(data);

  function loadTweets(){

  }

// It will use jQuery to make a request to /tweets and receive the array of tweets as JSON.

// If you're unclear how to make an Ajax GET request, refer to the AJAX with jQuery activity from earlier today.
// The one difference is that you are requesting and handling a JSON response instead of an HTML response.

// In order to test/drive the function, you can simply call it right after its definition.
// We do want to load the tweets on page load anyway, so this is fair.

// This is a good time to remove the hard-coded tweets object that we added earlier in order to drive
// our renderTweets function.

// You already have a renderTweets function defined which can take in this array of objects and
// render them to the DOM, so your success callback function will simply call up the renderTweets, passing it the response from the AJAX request.

Because we've done the leg work of iterating over and rendering the tweet objects in a previous exercise, we only really have to worry about making the AJAX get request and then delegating the work to our renderTweets function.
})
