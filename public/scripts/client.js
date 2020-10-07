/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const renderTweets = tweetArray => {
    $('.all-tweets-container').empty();
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
    const dateDiffInYears = Math.floor(dateDiffInMS / (1000 * 60 * 60 * 24 * 365));
    const dateDiffInMonths = Math.floor(dateDiffInMS / (1000 * 60 * 60 * 24 * (365 / 12)));
    const dateDiffInDays = Math.floor(dateDiffInMS / (1000 * 60 * 60 * 24));
    const dateDiffInHours = Math.floor(dateDiffInMS / (1000 * 60 * 60));
    const dateDiffInMinutes = Math.floor(dateDiffInMS / (1000 * 60));
    let dateDiff;
    if (dateDiffInYears > 0) {
      dateDiff = dateDiffInYears + " year(s) ago";
    } else if (dateDiffInMonths > 0) {
      dateDiff = dateDiffInMonths + " month(s) ago";
    } else if (dateDiffInDays > 0) {
      dateDiff = dateDiffInDays + " day(s) ago";
    } else if (dateDiffInHours > 0) {
      dateDiff = dateDiffInHours + " hour(s) ago";
    } else if (dateDiffInMinutes >= 0) {
      dateDiff = dateDiffInMinutes + " minute(s) ago";
    } else {
      dateDiff = "";
    }

    // create the footer
    const footer = `<footer class="tweet__article-footer">
                      <span class="tweet__creation-date">${dateDiff}</span>
                      <div class="tweet__buttons">
                        <i class="fas fa-flag"></i>
                        <i class="fas fa-retweet"></i>
                        <i class="fas fa-heart"></i>
                      </div>
                    </footer>`;
  
    const article = $('<article>').addClass("tweet").append(header).append(body).append(footer);
    return article;
  };
  
  const sortTweetsByCreationDate = tweetArray => tweetArray.sort((a, b) => b["created_at"] - a["created_at"]);

  const loadTweets = function() {
    $.ajax('/tweets/', { method: 'GET' })
    .then(function (tweets) {
      const sortedTweets = sortTweetsByCreationDate(tweets);
      renderTweets(sortedTweets);
    });
  };

  loadTweets();

  $('form').on('submit', function(event) {
    event.preventDefault();
    $(".error").remove();
    const tweetText = $('#tweet-text').val();
    if (tweetText.length === 0) {
      $('.new-tweet').append('<div class="error">Cannot submit an empty tweet!</div>');
    } else if (tweetText.length > 140) {
      $('.new-tweet').append('<div class="error">Exceeded character limit!</div>');
    } else {
      const data = $(this).serialize();
      $.ajax('/tweets/', { method: 'POST', data })
      .then(function (newTweet) {
        console.log(newTweet);
        $.ajax('/tweets/', { method: 'GET' })
        .then(function (tweets) {
          const sortedTweets = sortTweetsByCreationDate(tweets);
          renderTweets(sortedTweets);
        });
      });
    }
  });
});