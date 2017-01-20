//~~VARIABLES~~//

var teamInput = '<input type="text" placeholder="Enter Team (12s, 14s)" id="teamName">'
var rosterInput = '<input type="text" placeholder="Enter Roster" id="roster">'
var submit = '<button id="createPost">Add Team Info</button>'
var editButton = '<button type="button" class="edit" aria-label="Left Align"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>';
var xButton = '<button type="button" class="x" aria-label="Left Align"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>'


//~~FUNCTIONS//

//when the add team info button is clicked, the data from the two input forms is
//created on db and appended to page
$('#createPost').on('click', function(evt) {
  var teamName = $('#teamName');
  var roster = $('#roster');
  var obj = {};
  obj.name = teamName.val();
  obj.roster = roster.val();
  if(teamName.val() === '' || roster.val() === '') return;
  else {
    $.post('/posts', obj, function(res) {
      if (res.status === 200) {
        var makeId = "id:" + res.id;
        obj.id = makeId;
      $('#teamslist').append('<li class="list" ' + 'id="' + makeId + '">' + teamName.val() + ": " + roster.val() + editButton + xButton +  '</li>');
      document.querySelector('#teamName').value = "";
      document.querySelector('#roster').value = "";
      } else {
        console.log('server error, returning')
        return;
      }
    });
  }
});

//takes no parameters and used when combined with an event listener listening on the entire document
//When edit team info button is clicked, does a post request to /posts/edit

function editPost (evt) {
  var btn = this;
  var form = this.previousElementSibling;
  var li = this.parentElement;
  var editName = form.children[0].value;
  var changeName = editName;
  var editRoster = form.children[1].value;
  var obj = {};
  obj.name = editName;
  obj.roster = editRoster;
  obj.id = this.parentNode.getAttribute('id');
  li.innerHTML = editName + ": " + editRoster + editButton + xButton;
    $.post('/posts/edit', obj, function(res) {
      console.log(obj, 'edited and saved')
    });

  if ($('#renderTable')){
    window.location.reload();
  }
}

function editClick (evt) {
  var target = this;
  var team = target.parentElement.textContent;
  roster = team.split(':')[1];
  teamName = team.split(':')[0];
  var objId = this.parentElement.getAttribute('id');
  this.parentNode.innerHTML = '<form id="'+ objId + '"><input type="text" placeholder="Edit Team (12s, 14s)" id="editName">' + ' ' + '<input type="text" placeholder="Edit Roster" id="editRoster"></form>' + ' ' + '<button id="editPost">Edit Team Info</button>';
  document.querySelector('#editName').value = teamName;
  document.querySelector('#editRoster').value = roster;
}

function xClick (evt) {
  var target = this;
  var team = target.parentElement.textContent;
  var teamName = team.split(':')[0];
  var obj = {};
  obj.name = teamName;

  $.post('/posts/delete', obj, function(res) {
    console.log('object containing', obj, 'deleted')
  })

    if ($('#renderTable')){
    window.location.reload();
  }

  this.parentNode.remove()

}

//EVENT LISTENERS search entire document for elements created after load
$(document).on('click', '.edit', editClick);
$(document).on('click', '.x', xClick);
$(document).on('click', '#editPost', editPost);

//AJAX REQUESTS
$.get('/posts', function(res) {
  var template = $('#posts-template').html() ;
  var compiled = _.template(template);
  var html = compiled({posts: res.posts});
  $('#posts').html(html);
});
