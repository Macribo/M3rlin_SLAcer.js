$(document).ready(function() {
  //   alert('hi from m3rlin.js');
  //   if ($slicerLayerHeight.val() > 100) {
  //     alert('Wait - are you sure??');
  //   }
  $('#m3rlinModal').modal('toggle');
  $('.m3rlin-quickstart-btns').css({ display: 'none' });
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
    $('#greeter').css({ display: 'none' });
  });

  $('#m3rlin-back').click(function() {
    $('#quick-confirm').css({ display: 'none' });

    $('#greeter').fadeIn('slow');
    $('.m3rlin-quickstart-btns').css({ display: 'none' });
    $('.m3rlin-main-menu-btns').fadeIn('slow');
  });
});
