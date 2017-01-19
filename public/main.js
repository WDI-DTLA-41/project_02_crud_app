console.log('Hi there');

var $edit = $('#edit');
var $delete = $('#delete');
var $submit = $('#submit');

$edit.on('click', function(event) {
  $.post('/chat', function(req, res) {

  })
})


$delete.on('click', function(event) {
  $.post('/chat', function(req, res) {
    // db.col
  })
})
