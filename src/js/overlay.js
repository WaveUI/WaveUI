/**
 * Overlay Removal
 * --------------------
 * Removes overlay when clicked.
 *
 * @method overlayRemove
 */

overlayRemove = function () {
  $('.overlay').on('click', function () {
    var modalExist = $('.modal.active').length; // Checks if modal already exists

    if (modalExist >= 1) {
      $('.modal').removeClass('active');
    }

    $(this).fadeOut(300, 'swing', function () {
      $(this).remove();
    });
  });
}

/**
 * Overlay Append
 * --------------------
 * Appends overlay element to body.
 *
 * @method overlayAppend
 */

overlayAppend = function () {
  var overlayExist = $('.overlay').length; // Checks if overlay already exists

  if (!overlayExist) {
    $('<div class="overlay"></div>').appendTo('body').hide().fadeIn(300, 'swing');
  }

  overlayRemove();
}