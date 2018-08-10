 // Initialize Firebase
var config = {
    apiKey: "AIzaSyDxdjcWApq-UvYA3qTWG4QODBkKYhbfJoo",
    authDomain: "traintime-8de64.firebaseapp.com",
    databaseURL: "https://traintime-8de64.firebaseio.com",
    projectId: "traintime-8de64",
    storageBucket: "",
    messagingSenderId: "912290016642"
  };
firebase.initializeApp(config);

var database = firebase.database();
var nameInput = $("#trainName");
var destInput = $("#trainDestination");
var timeInput = $("#firstTime");
var freqInput = $("#trainFrequency");

// Function to find the time for the next train
function nextTrain(start, frequency){
    var firstTimeConverted = moment(start, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
    var remainder = timeDifference % frequency;
    var minutesToNextTrain = frequency - remainder;
    var next =  moment().add(minutesToNextTrain, "minutes");
    return moment(next).format("hh:mm")
}

// Find the time to the next train
function timeToNextTrain(start, frequency){
    var firstTimeConverted = moment(start, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
    var remainder = timeDifference % frequency;
    var minutesToNextTrain = frequency - remainder;
    console.log(minutesToNextTrain);
    return minutesToNextTrain;
}

// Every time the page is loaded or a new entry is entered, change HTML to reflect the database
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    var newRow = $("<tr>");
    var nameEntry = $("<td>").text(childSnapshot.val().name);
    var destinationEntry = $("<td>").text(childSnapshot.val().destination);
    var frequencyEntry = $("<td>").text(childSnapshot.val().frequency);
    var nextTrainEntry = $("<td>").text(nextTrain(childSnapshot.val().startTime, childSnapshot.val().frequency));
    var remainderEntry = $("<td>").text(timeToNextTrain(childSnapshot.val().startTime, childSnapshot.val().frequency));
    newRow.append(nameEntry);
    newRow.append(destinationEntry);
    newRow.append(frequencyEntry);
    newRow.append(nextTrainEntry);
    newRow.append(remainderEntry);

    $("#trainSchedule").prepend(newRow);

});

$("#submitButton").on("click", function(){
    // Make sure that all input fields are filled
    if(freqInput.val() === "" || nameInput.val() === "" || destInput.val() === "" || timeInput.val() === ""){
        alert("Please fill out all inputs before adding a new train. Thank you!");
    }
    else{
        // Push entered values to the database on firebase
        database.ref().push({
            name: nameInput.val().trim(),
            destination: destInput.val().trim(),
            startTime: timeInput.val().trim(),
            frequency: freqInput.val().trim()
        })

    }
})