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
      $.ajax('/tweets/', { method: 'POST', data })
      .then(function (newTweet) {
        reloadAndClearForm();
      });
    }
  });

  // clicking on the "Write a new tweet" nav item hides and unhides the "new tweet" form
  $('.nav__new-tweet-container').on('click', function() {
    if ($('form').is(':visible')) {
      $('form').slideUp();
    } else {
      $('form').slideDown();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // scrolling below 400px from the top causes the back-to-top button to appear
  $(document).scroll(function() {
    if ($(this).scrollTop() > 400) {
      $('.button-to-top').removeAttr('hidden');
    } else {
      $('.button-to-top').attr('hidden', 'true');
    }
  });

  $('.button-to-top').on('click', function(event) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('form').slideDown();
  });
});