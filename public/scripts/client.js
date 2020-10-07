/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  loadTweets();

  $('form').on('submit', function(event) {
    event.preventDefault();
    const tweetText = $('#tweet-text').val();
    $(".new-tweet__error").slideUp();
    if (tweetText.length === 0) {
      const errorHTML = $('<div class="new-tweet__error"><i class="fas fa-exclamation-triangle"></i>    Cannot submit an empty tweet!    <i class="fas fa-exclamation-triangle"></i></div>').hide();
      errorHTML.prependTo('.new-tweet').slideDown();
    } else if (tweetText.length > 140) {
      const errorHTML = $('<div class="new-tweet__error"><i class="fas fa-exclamation-triangle"></i>    Exceeded character limit of 140!     <i class="fas fa-exclamation-triangle"></i></div>').hide();
      errorHTML.prependTo('.new-tweet').slideDown();
    } else {
      const data = $(this).serialize();
      emptyTextArea('#tweet-text');
      $.ajax('/tweets/', { method: 'POST', data })
        .then(function(newTweet) {
          reloadAndResetCounter();
        });
    }
  });

  $('.nav__new-tweet-container').on('click', function(event) {
    if ($('form').is(':visible')) {
      $('form').slideUp();
    } else {
      $('form').slideDown();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  $(document).scroll(function() {
    if ($(this).scrollTop() > 0) {
      $('.button-to-top').removeAttr('hidden');
    } else {
      $('.button-to-top').attr('hidden', 'true');
    }
  });
  // clicking the back-to-top button brings you to the top of the page and shows the new tweet form
  $('.button-to-top').on('click', function(event) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('form').slideDown();
  });
});