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
    // creation of header element
    const avatarSpan = $('<span>').addClass("tweet__avatar");
    const avatar = $('<img>').attr("src", tweet.user.avatars).attr("width", "40px");
    avatarSpan.append(avatar);
    const name = $('<span>').text(tweet.user.name).addClass("tweet__name");
    const headerDiv = $('<div>').addClass("tweet__user").append(avatarSpan).append(name);
    const handle = $('<span>').addClass("tweet__handle").text(tweet.user.handle);
    const header= $('<header>').addClass("tweet__article-header").append(headerDiv).append(handle);
  
    // creation of tweet body
    const body = $('<div>').addClass("tweet__body").text(tweet.content.text);
  
    // creation of footer icons
    const flag = $('<span>').addClass("tweet__button tweet__button--flag");
    const flagIcon = $('<i>').addClass("fas fa-flag");
    flag.append(flagIcon);
    const retweet = $('<span>').addClass("tweet__button tweet__button--retweet");
    const retweetIcon = $('<i>').addClass("fas fa-retweet");
    retweet.append(retweetIcon);
    const heart = $('<span>').addClass("tweet__button tweet__button--heart");
    const heartIcon = $('<i>').addClass("fas fa-heart");
    heart.append(heartIcon);
    const buttonDiv = $('<div>').addClass("tweet__buttons").append(flag).append(retweet).append(heart);
  
    // creation of footer
    const currentDate = new Date();
    const dateDiffInMS = currentDate - tweet['created_at'];
    const dateDiffInDays = Math.floor(dateDiffInMS / (1000 * 60 * 60 * 24));
    const creationSpan = $('<span>').addClass("tweet__creation-date").text(dateDiffInDays + " days ago");
    const footer = $('<footer>').addClass("tweet__article-footer").append(creationSpan).append(buttonDiv);
  
    // put the header, body, and footer together
    const $article = $('<article>').addClass("tweet").append(header).append(body).append(footer);
  
    return $article;
  };
  
  
  // Test / driver code (temporary)
  renderTweets(data);

});