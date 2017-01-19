$('#createPost').on('click', function(evt) {
  var teamName = $('#teamName');
  var roster = $('#roster');
  var button = "<button>X</button>"
  var obj = {};
  obj.teamName = teamName.val();
  obj.roster = roster.val();
  if(teamName.val() === '' || roster.val() === '') return;
  else {
    $.post('/posts', {teams: obj}, function(res) {
      $('#teamslist').append('<li class="list">' + teamName.val() + " " + roster.val() + editButton + xButton +  '</li>');
      document.querySelector('#teamName').value = "";
      document.querySelector('#roster').value = "";
  });
  }

});

var editButton = '<button type="button" class="edit" aria-label="Left Align"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>';
var xButton = '<button type="button" class="x" aria-label="Left Align"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>'

function editClick (evt) {
var target = this;
var team = target.parentElement.textContent;
console.log(team)
}

function xClick (evt) {
  var target = this;
  var team = target.parentElement.textContent;
  var teamName = team.split(':')[0];
  console.log(team)
  console.log(teamName);
  var obj = {
    name: teamName
  }

  $.post('/posts/delete', obj, function(res) {
    console.log('deleting stuff')
  })

  this.parentNode.remove()

}

$(document).on('click', '.edit', editClick);
$(document).on('click', '.x', xClick);


$.get('/posts', function(res) {
  var template = $('#posts-template').html() ;
  var compiled = _.template(template);
  var html = compiled({posts: res.posts});
  $('#posts').html(html);
});
