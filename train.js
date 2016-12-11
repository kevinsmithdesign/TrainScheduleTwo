
var config = {
    apiKey: "AIzaSyC2uQvLtNSOWR0aHbmt4j2-HYq2DriVt3U",
    authDomain: "traintwo-962ee.firebaseapp.com",
    databaseURL: "https://traintwo-962ee.firebaseio.com",
    storageBucket: "traintwo-962ee.appspot.com",
    messagingSenderId: "1043752956726"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//add on click listener
$('#trainSubmit').on('click', function(e){
  //prevent page restart
  e.preventDefault();

    //variable to hold user input
    var trainName = $('#trainName').val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    //create a new object train
    var newTrain = {
        name: trainName,
        destin: destination,
        first: firstTrain,
        freq: frequency,
    }

    //push new train to firebase
    database.ref().push(newTrain);

    //set input fields to blank
    $('#trainName').val('');
    $('#destination').val('');
    $('#firstTrainTime').val('');
    $('#frequency').val('');

  return false;
});

database.ref().on('child_added', function(snapshot,value){

    var trainName = snapshot.val().name;
    var destination = snapshot.val().destin;
    var firstTrain = snapshot.val().first;
    var frequency = snapshot.val().freq;

    //First time for intial value
    var startTime = moment(firstTrain, 'hh:mm');
    console.log("initial time is: " + moment(startTime).format('hh:mm'));

    //current time to find out difference
    var currentTime = moment();
    console.log("current time is: " + moment(currentTime).format("hh:mm"));

    //difference between initial and current
    var difference = moment().diff(moment(startTime), "minutes");
    console.log("difference in initial time and current time: " + difference);

    //modular math to figure out time 
    var remainder = difference % frequency;
    console.log("the remainder is: " + remainder);

    //minutes away time calculation
    var minutesAway = frequency - remainder;
    console.log("minutes till train: " + minutesAway);

    //calculate the next train arrival time
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

    $('.trainData').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + minutesAway + "</td></tr>");
});







