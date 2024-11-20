function displayMealInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("meals")
        .doc(ID)
        .get()
        .then(doc => {
            thisMeal = doc.data();
            mealCode = thisMeal.code;
            mealName = doc.data().name;

            // only populate title, and image
            document.getElementById("mealName").innerHTML = mealName;
            let imgEvent = document.querySelector(".meal-img");
            imgEvent.src = "../images/" + mealCode + ".jpg";
            
            imgEvent.addEventListener('mouseover', () => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = 'See map location';
                imgEvent.parentElement.style.position = 'relative'; 
                imgEvent.parentElement.appendChild(tooltip);
            });
            imgEvent.addEventListener('mouseout', () => {
                const tooltip = imgEvent.parentElement.querySelector('.tooltip');
                if (tooltip) tooltip.remove();
            });
                    // Add click functionality
        imgEvent.addEventListener('click', () => {
            window.location.href = 'map.html?location=BCIT';
        });
    
        });
}
displayMealInfo();

function saveMealDocumentIDAndRedirect() {
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('mealDocID', ID);
    window.location.href = 'review.html';
}

function populateReviews() {
    console.log("test");
    let mealCardTemplate = document.getElementById("reviewCardTemplate");
    let mealCardGroup = document.getElementById("reviewCardGroup");

    let params = new URL(window.location.href); // Get the URL from the search bar
    let mealID = params.searchParams.get("docID");

    // Double-check: is your collection called "Reviews" or "reviews"?
    db.collection("reviews")
        .where("mealDocID", "==", mealID)
        .get()
        .then((allReviews) => {
            reviews = allReviews.docs;
            console.log(reviews);
            reviews.forEach((doc) => {
                var title = doc.data().title;
                var description = doc.data().description;
                var time = doc.data().timestamp.toDate();
                var rating = doc.data().rating; // Get the rating value
                console.log(rating)

                console.log(time);

                let reviewCard = mealCardTemplate.content.cloneNode(true);
                reviewCard.querySelector(".title").innerHTML = title;
                reviewCard.querySelector(".time").innerHTML = new Date(
                    time
                ).toLocaleString();
                reviewCard.querySelector(".description").innerHTML = `Description: ${description}`;

                // Populate the star rating based on the rating value

                // Initialize an empty string to store the star rating HTML
                let starRating = "";
                // This loop runs from i=0 to i<rating, where 'rating' is a variable holding the rating value.
                for (let i = 0; i < rating; i++) {
                    starRating += '<span class="material-icons">star</span>';
                }
                // After the first loop, this second loop runs from i=rating to i<5.
                for (let i = rating; i < 5; i++) {
                    starRating += '<span class="material-icons">star_outline</span>';
                }
                reviewCard.querySelector(".star-rating").innerHTML = starRating;

                mealCardGroup.appendChild(reviewCard);
            });
        });
}

populateReviews();