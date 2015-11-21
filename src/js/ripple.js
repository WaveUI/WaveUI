// Ripple
$('[ripple]').on('click', function (e) {
  var rippleDiv = $('<div class="ripple" />'),
    rippleSize = 60,
    rippleOffset = $(this).offset(),
    rippleY = e.pageY - rippleOffset.top,
    rippleX = e.pageX - rippleOffset.left,
    ripple = $('.ripple');

  rippleDiv.css({
    top: rippleY - (rippleSize / 2),
    left: rippleX - (rippleSize / 2),
    background: $(this).attr("ripple-color")
  }).appendTo($(this));

  window.setTimeout(function () {
    rippleDiv.remove();
  }, 1900);
});