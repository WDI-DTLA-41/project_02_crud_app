console.log('Hi there');

var $upBtn = $('#upVote');
var $dwnBtn = $('#downVote');

$upBtn.click(function() {
  $upBtn.toggleClass('makeOrange');
  $dwnBtn.removeClass('makeRed');
});

$dwnBtn.click(function() {
  $dwnBtn.toggleClass('makeRed');
  $upBtn.removeClass('makeOrange');
})
