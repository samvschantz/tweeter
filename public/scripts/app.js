$(function(){

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

  function renderTweets(tweets) {
    for (i in tweets){
      var $tweet = createTweetElement(tweets[i])
      $('#tweetContainer').append($tweet);
    }
  }

  renderTweets(data);
})
