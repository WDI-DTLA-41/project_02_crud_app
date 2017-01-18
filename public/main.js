$('#createPost').on('click', function(evt) {
  var message = $('#message');
  var roster = $('#roster');
  var button = "<button>X</button>"
  var obj = {};
  obj.message = message.val();
  obj.roster = roster.val();
  if(message.val() === '' || roster.val() === '') return;
  else {
    $.post('/posts', {message: obj}, function(res) {
      $('ul').append('<li>' + message.val() + " " + roster.val() + editButton + xButton +  '</li>');
      document.querySelector('#message').value = "";
      document.querySelector('#roster').value = "";
  });
  }

});

$('#createSch').on('click', function(evt) {
  var message = $('#sch');
  var button = "<button>X</button>"
  if(message.val() === '') return;
  else {
    console.log('clicked on schedule button')
    $.post('/posts', {message: message.val()}, function(res) {
      $('ul').append('<li>' + message.val() + '</li>');
      document.querySelector('#sch').value = "";
  });
  }

});

var editButton = '<button type="button" class="edit" aria-label="Left Align"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>';
var xButton = '<button type="button" class="x" aria-label="Left Align"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>'

function editClick (evt) {
  console.log('edit button clicked')
}

function editX (evt) {
  console.log('X button clicked')
}

$(document).on('click', '.edit', editClick);
$(document).on('click', '.x', editX);

// $('.edit').click(

//   function (event) {
//   console.log('edit button clicked')
// });

$('.x').click(function(event) {
  console.log('x has been clicked')
});

// function handleClick(evt) {
//   var edit = document.querySelector('button');
//   if (evt.target === edit) console.log('edit clicked');
// }
// var body = document.querySelector('body');
// body.addEventListener('clicked', handleClick);

$.get('/posts', function(res) {
  var template = $('#posts-template').html() ;
  var compiled = _.template(template);
  var html = compiled({posts: res.posts});
  $('#posts').html(html);
});
