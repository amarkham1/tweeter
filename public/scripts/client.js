/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  const renderTweets = tweetArray => {
    const tweets = $('<div>').addClass("all-tweets");
    for (const tweet of tweetArray) {
      const tweetArticle = createTweetElement(tweet);
      tweets.append(tweetArticle);
    }
    $('.all-tweets-container').append(tweets);
  }

  const createTweetElement = tweet => {
    const header = `<header class="tweet__article-header">
                      <div class="tweet__user">
                        <span class="tweet__avatar">
                          <img src="${tweet.user.avatars}" width="40px" />
                        </span>
                        <span class="tweet__name">${tweet.user.name}</span>
                      </div>
                      <span class="tweet__handle">${tweet.user.handle}</span>
                    </header>`;
  
    const body = `<div class="tweet__body">${tweet.content.text}</div>`;
  
    // calculate the number of days since the creation date
    const currentDate = new Date();
    const dateDiffInMS = currentDate - tweet['created_at'];
    const dateDiffInDays = Math.floor(dateDiffInMS / (1000 * 60 * 60 * 24));

    // create the footer
    const footer = `<footer class="tweet__article-footer">
                      <span class="tweet__creation-date">${dateDiffInDays} days ago</span>
                      <div class="tweet__buttons">
                        <span class="tweet__button tweet__button-flag"><i class="fas fa-flag"></i></span>
                        <span class="tweet__button tweet__button-retweet"><i class="fas fa-retweet"></i></span>
                        <span class="tweet__button tweet__button-heart"><i class="fas fa-heart"></i></span>
                      </div>
                    </footer>`;
  
    const article = $('<article>').addClass("tweet").append(header).append(body).append(footer);
    return article;
  };
  
  const loadTweets = function() {
    $.ajax('/tweets/', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets);
    });
  };

  loadTweets();
  
  $('form').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    $.ajax('/tweets/', { method: 'POST', data })
    .then(function (newTweet) {
      console.log('Success');
    });
  });
});