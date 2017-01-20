- A readme.md file with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc.

#Project 2: Sports Team Manager

##Getting Started

###Installation
The sports team manager requires no installation for the user. Just an internet connection and the link to the site. Load the site, and start managing your sports team!

###Instructions
On the home page, you can add a team and roster to start. Once a team and a roster has been submitted from the input fields, click on the button for it to save. You can then click on the pencil icon to edit the selections or the X button to delete the entire entry. The /teams.html will display the teams and rosters on the site. The /rosters.html will show a table reflecting the team and all of the current members of the roster. If the roster is edited or updated, the table will automatically be updated to reflect the most current information.

###MVP
For minimal viable product, I wanted a web app with CRUD functionality being able to read, update, edit and delete user inputted information in regards to their sports teams and roster. The site should be able to persist submitted data as well as manipulate it as the user pleased. Also, the site should be able to display the teams and the roster within a easy to view table.

##Additional Reading

###Approach Taken for creating app
I wanted a site with simple functionality to be able to edit a team's roster on the fly. Once the team has been added, the editing and displaying of the information should be intuitive and seamless.Instead of an overwhelming number of input fields to be completed before you could even see your data, a minimalistic approach was taken in making it just work.

###Wireframes
A mockup was originally created using mockingbird which served as the blueprint for my site's design and layout. This wireframe can be viewed [here](https://github.com/yeahbq/project_02_crud_app/blob/master/home-page-wireframe.png). 

###User Stories
The user story created states
>>"As a user, I will be able to add teams to the site and then edit or delete the
>>fields of the roster, schedule and tournament results."

A copy of the user stories file can be found [here](https://github.com/yeahbq/project_02_crud_app/blob/master/userstories.txt)

###Technologies Used
The site was created using HTML, CSS, and JavaScript for everything clientside. CSS frameworks were made using Bootstrap. Templating was done using EJS. Additional libraries included jQuery. For server related tasks, the code was written using node.js. Node modules and middleware used include Morgan, body-parser, ejs, express, express-handlebars, handlebars, and mongod. The repo included .git for version tracking and GitHub for hosting and uploading commits online. The app itself is hosted through heroku and uses Mongodb to maintain the online database.

###Feature Requests
-Adding more fields for the players of the roster (position, age, position)
-Added pages to the site to display a team's schedule
-Added pages to display the team's win-loss record and standing.
-Include pictures for each player on the roster

###Unsolved Problems
-If a user chooses to have more than one team open to edit, trying to submit the edits will give an error and only save the first edited team from the top of the page.
-Rendering the table currently works using window.load. Because of the layout of the html pages, trying to use ajax requests to recreate the table is difficult.
