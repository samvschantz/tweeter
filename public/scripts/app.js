$(function(){
  //function for transforming received tweet data into HTML
  function createTweetElement(tweetData){
    var name = tweetData['user']['name'];
    var largeAvatar = tweetData['user']['avatars']['large'];
    var handle = tweetData['user']['handle'];
    var content = tweetData['content']['text'];
    var created_at = tweetData['created_at'];

    var $tweet = $("<article>").addClass("oldTweet");

    function escape(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

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
    var $content = $(`<div>${escape(content)}</div>`).addClass("content");
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
      $('#tweetContainer').prepend($tweet);
    }
  }

  function loadTweets(){
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
      success: function (tweets) {
        console.log(tweets)
        renderTweets(tweets)
      }
    })
  }

  loadTweets()

  var $button = $('#sendtweet');
    $button.on('click', function(event){
      event.preventDefault();
      var charLeft = $('form').text()
      if (charLeft > 139){
        $.flash('Write more!');
      } else if (charLeft < 0){
        $.flash('Tweets must be less than 140 characters!');
      } else {
        $.get('/tweets').done(function() {
          $('#tweetContainer').empty()
        })

        var data = $('form').serialize()

        $.post('/tweets', data).done(function() {
          loadTweets()
        })
      }
      loadTweets()
    });
})
