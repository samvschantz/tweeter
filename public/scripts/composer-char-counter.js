document.addEventListener('DOMContentLoaded', function(event) {
  $('.new-tweet textarea').on('keypress',function () {
    var enteredText = $('textarea').val();
    var count = enteredText.length + 1;
    var charLeft = 140 - count;
    $(this).parent().children('span').text(charLeft);
  })
});