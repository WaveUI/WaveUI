/**
 * Modal Trigger
 * --------------------
 * Add click events to element with [modal='true'] attribute.
 * Locates
 *
 * @method modalTrigger
 */

modalTrigger = function () {
  $('[modal="true"]').on('click', function () {
    var modalId = $(this).attr('modal-id');

    $('#' + modalId).addClass('active');

    overlayAppend();
  });
}

modalTrigger();