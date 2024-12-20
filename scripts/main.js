function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Lets us know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userName = userDoc.data().name;
                console.log(userName);
                document.getElementById("name-goes-here").innerText = userName;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}
insertNameFromFirestore();

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("mealCardTemplate"); // Retrieve the HTML element with the ID "mealCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "meals"
        .then(allMeals => {
            //var i = 1;  //Optional: if you want to have a unique ID for each meal
            allMeals.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
                var mealCode = doc.data().code;    //get unique ID to each meal to be used for fetching right image
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${mealCode}.jpg`; //Example: NV01.jpg
                newcard.querySelector('a').href = "eachMeal.html?docID=" + docID;
                newcard.querySelector('i').id = 'save-' + docID;   //guaranteed to be unique
                newcard.querySelector('i').onclick = () => updateBookmark(docID);

                currentUser.get().then(userDoc => {
                    //get the user name
                    var bookmarks = userDoc.data().bookmarks;
                    if (bookmarks.includes(docID)) {
                        document.getElementById('save-' + docID).innerText = 'bookmark';
                    }
                })

                //attach to gallery, Example: "meals-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

            })
        })
}

displayCardsDynamically("meals");  //input param is the name of the collection

function updateBookmark(mealDocID) {
    // Gets the current user's bookmarks
    currentUser.get().then(doc => {
        console.log(doc.data().bookmarks);
        currentBookmarks = doc.data().bookmarks;

        // When a bookmark tab is clicked, this function either adds or removes the user's tie to this bookmark in the database
        if (currentBookmarks && currentBookmarks.includes(mealDocID)) {
            console.log(mealDocID);
            currentUser.update({
                bookmarks: firebase.firestore.FieldValue.arrayRemove(mealDocID),
            })
                .then(function () {
                    console.log("this bookmark is removed for " + currentUser);
                    let iconID = "save-" + mealDocID;
                    document.getElementById(iconID).innerText = "bookmark_border";
                })
        } else {
            currentUser.set({
                bookmarks: firebase.firestore.FieldValue.arrayUnion(mealDocID),
            },
                {
                    merge: true
                })
                .then(function () {
                    console.log("This bookmark is saved for " + currentUser);
                    let iconID = "save-" + mealDocID;
                    document.getElementById(iconID).innerText = "bookmark";
                })

        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const foodImages = document.querySelectorAll('.food-image:not(.meal-img)'); // Exclude .meal-img

    foodImages.forEach(image => {
        // Hover effect
        image.addEventListener('mouseover', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = 'See map location';
            image.parentElement.style.position = 'relative'; // Ensure parent has relative positioning
            image.parentElement.appendChild(tooltip);
        });

        image.addEventListener('mouseout', () => {
            const tooltip = image.parentElement.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });

        // Click functionality
        image.addEventListener('click', () => {
            window.location.href = 'map.html?location=BCIT';
        });
    });
});
