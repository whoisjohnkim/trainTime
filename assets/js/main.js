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

$("#submitButton").on("click", function(){
    // Make sure that all input fields are filled
    if(freqInput.val() === "" || nameInput.val() === "" || destInput.val() === "" || timeInput.val() === ""){
        alert("Please fill out all inputs before adding a new train. Thank you!");
    }
    else{
        var nextTrainTime = nextTrain(timeInput.val(),freqInput.val());
        console.log(nextTrainTime);
    }
})