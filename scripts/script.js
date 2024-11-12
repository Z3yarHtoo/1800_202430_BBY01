//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("logging out user");
  }).catch((error) => {
    // An error happened.
  });
}

//just a leftover (pun intended) that I might as well keep in if we redo the database again.
function writeMeals() {
  //define a variable for the collection you want to create in Firestore to populate data
  var mealsRef = db.collection("meals");

  mealsRef.add({
    code: "Chuchitos",
    name: "Chuchitos",
    city: "Burnaby",
    province: "BC",
    details: "A very typical kind of Guatemalan tamale made using the same corn masa as a regular tamale but they are smaller, have a much firmer consistency and are wrapped in a tuzas (dried corn husks) instead of plantain leaves.",
    lat: 49.2467097082573,
    lng: -122.9187029619698,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
  });
  mealsRef.add({
    code: "Pupusas",
    name: "Pupusas",
    city: "Maple Ridge",
    province: "BC",
    details: "A thick griddle cake or flatbread from El Salvador and Honduras made with cornmeal or rice flour.",
    lat: 49.3399431028579,
    lng: -122.85908496766939,
    last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
  });
  mealsRef.add({
    code: "Gorditas",
    name: "Gorditas",
    city: "North Vancouver",
    province: "BC",
    details: "A gordita in Mexican cuisine is a dish made with masa and stuffed with cheese, meat, or other fillings.",
    lat: 49.38847101455571,
    lng: -122.94092543551031,
    last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
  });
}