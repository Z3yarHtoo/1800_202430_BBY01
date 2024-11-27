# Project Title
Cuisine Connect

## 1. Project Description
Our team, BBY01, is developing a web application to help students across BCIT connect 
to other cultures via food using reviews and recommendations for cultural dishes. 

## 2. Names of Contributors
List team members and/or short bio's here... 
* My name is Zeyar Htoo and I am an international student currently studying CST in BCIT. My favorite sport is Badminton.
* Hi, my name is Alex "The Tired" Hidalgo! I'm a CST student at BCIT ready and willing to learn! 
* My name is Omar Alobaidi. I'm looking forward to a great year at BCIT! Also, I love voice acting.
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)

## 4. Complete setup/installion/usage
To use our site, all you need is our link! [PASTE LINK HERE ONCE THE SITE IS HOSTED]

## 5. Known Bugs and Limitations
Here are some known bugs and limitations:
* currently possible for users to inject JavaScript in review cards
* leftover scripts and poor security allows users to call functions that can break funcitonality or overload out database
* currently there are two functions that retrieve the user's name from the database, should only be one.
* script.js should either do more, or be refactored into other files. both of which we have no time to do without introducing bugs we don't have time to fix. it sucks, but works.

## 6. Features for Future
What we'd like to build in the future:
* search bar
* filter search
* allowing users to write meal cards
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── eachMeal.html               # HTML file that shows a meal card selected from homepage.html
├── homepage.html               # Main page once the user has logged in
├── login.html               # HTML page for the user to log in
├── map.html               # HTML page that shows meal card location data on a map
├── profile.html               # gives the user the option to change their information and shows them their saved reviews, if any
├── review.html               # page for users to write reviews for meal cards
├── thanks.html               # page redirect once a user has finished writing a review
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /Chuchitos.jpg             # image taken from https://growingupbilingual.com/chuchitos-a-traditional-guatemalan-tamal-recipe/
    /Gorditas.jpg              # image taken from https://www.maricruzavalos.com/gorditas-recipe-with-maseca/
    /Pupusas.jpg               # image taken from https://en.wikipedia.org/wiki/Pupusa
    /logo.jpg                  # image taken from template, still just a placeholder image.
├── scripts                  # Folder for scripts
    /authentication.js         # JS file that handles user authentication using firebase
    /eachMeal.js               # JS file that handles meal cards, review fetching from database, 
        and passing the user from eachMeal.html to review.html
    /main.js                   # gets username from firestore to display on homepage.html, displays
        meal cards homepage.html, handles users bookmarking reviews, and passes users to map.html 
        with the corresponding location when an image is clicked on eachMeal.html
    /profile.js                # handles the modification of user data on profile.html
    /review.js                 # handles all the logic needed to write a review on review.html
    /saved.js                  # gets the users name from firestore database and gets the user's bookmarks. Both to be displayed on profile.html
    /script.js                 # holds logout function and leftover code to write more meal cards
    /skeleton.js               # handles navbar loading funcitonality that limits user 
        access when not signed in
├── styles                   # Folder for styles
    /style.css                 # CSS styling to override Bootstrap when necessary



```


