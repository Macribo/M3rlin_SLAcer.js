$(document).ready(function() {
  //   alert('hi from m3rlin.js');
  //   if ($slicerLayerHeight.val() > 100) {
  //     alert('Wait - are you sure??');
  //   }
  $('#m3rlinModal').modal('toggle');

  $('#settings').click(function() {
    $('#m3rlinModal').modal('toggle');
    // $('#hide').css({ display: 'block' });
    $('#hide').fadeIn('slow');
  });

  $('#quick').click(function() {
    $('#quick-confirm').fadeIn('slow');
    $('.m3rlin-greeter').css({ display: 'none' });
    $('.m3rlin-main-menu-btns').css({ display: 'none' });
    $('.m3rlin-quickstart-btns').fadeIn('slow');
    $('.modal-footer').fadeIn('slow');
  });

  $('#m3rlin-back').click(function() {
    $('#quick-confirm').css({ display: 'none' });
    $('.modal-footer').css({ display: 'none' });
    $('.m3rlin-main-menu-btns').fadeIn('slow');
  });
});
