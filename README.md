
# myQuiz

myQuiz is quiz game with user registration functionality.

## Rules of the game
Only registered users can play. 
Correct answer is equal to 1 point.
Regular users can answer only once each question. After answering all the questions in category, the category will be inaccessible until the user become a VIP player.
VIP players can answering unlimited times all the questions but he can't get more than 1 point from a question.
Every user compete with the others in our general ranking table.

## Installing
Open "Quiz-NG" directory and run 'npm install'.
Open Rest-api to install rest-api dependencies and run 'npm install' then with 'node index.js' the server will start listening on port 3000 by default.
Run `ng serve` in "Quiz frontend" directory for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


The backend is created with Node JS (Express) and cloud database with Atlas - MongoDB.
Otherwise there is mongodump files for possibility to use a local MongoDB database. If you choose this you must change link for database in "Rest-api" folder.
