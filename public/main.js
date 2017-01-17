$('#createPost').on('click', function(evt) {
  var message = $('#message');
  var button = "<button>X</button>"
  if(message === '') return;
  else {
    $.post('/posts', {message: message.val()}, function(res) {
      $('ul').append('<li>' + message.val() + '</li>');
      message.value = "";
  });
  }

});

$.get('/posts', function(res) {
  var template = $('#posts-template').html();
  var compiled = _.template(template);
  var html = compiled({posts: res.posts});
  $('#posts').html(html);
});
