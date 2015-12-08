$('[modal="true"]').on('click', function () {
  var modalId = $(this).attr('modal-id');

  $('#' + modalId).addClass('active');

  overlayAppend();
});