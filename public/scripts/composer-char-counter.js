$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let remainingChars = 140 - this.value.length;
    let counterOutput = $(this).parent().parent().children('.new-tweet__submit-container').children('.counter')
    counterOutput.text(remainingChars);
    if (remainingChars < 0) {
      counterOutput.removeClass("new-tweet__black");
      counterOutput.addClass("new-tweet__red");
    } else {
      counterOutput.removeClass("new-tweet__red");
      counterOutput.addClass("new-tweet__black");
    }
    $(this).css("height", "");
    $(this).css("height", this.scrollHeight + 3 + "px");
  });
});