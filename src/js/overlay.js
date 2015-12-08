overlayRemove = function () {
  $('.overlay').on('click', function () {
    var modalExist = $('.modal.active').length;

    if (modalExist >= 1) {
      $('.modal').removeClass('active');
    }

    $(this).fadeOut(300, 'swing', function () {
      $(this).remove();
    });
  });
}

overlayAppend = function () {
  var overlayExist = $('.overlay').length;

  if (overlayExist < 1) {
    // Append Overlay
    $('<div class="overlay"></div>').appendTo('body').hide().fadeIn(300, 'swing');
  }

  overlayRemove();
}