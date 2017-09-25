(function () {
  var $main = $('.main');
  var $controller = $('.controller');
  $controller.on('click', function () {
    $main.toggleClass('shrink');
  });



})();