$(window).on("load", function (){
//console.log(moment().format("MM/DD/YYYY h:mm:ss a"))

    //Firebase API info
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB4NfM130VPhTS8RIOOWwTu51nLKPTF-Uw",
        authDomain: "train-b37ef.firebaseapp.com",
        databaseURL: "https://train-b37ef.firebaseio.com",
        projectId: "train-b37ef",
        storageBucket: "train-b37ef.appspot.com",
        messagingSenderId: "254487399859"
    };
    //Initialize firebase
    firebase.initializeApp(config);
    
    // Assign the reference to the database to a variable named 'database'
    var database = firebase.database();

    //Initial values
    var name = '';
    var destination = '';
    var frequency = '';
    var firstTrain = '';
    var nextTrain = '';
    var minutesAway = '';
    var dateAdded = 0;
    
    //Create new row in the current employees
    var submit = $("#submit");

    submit.on("click", function() {
        name = $("#train-name").val();
        destination = $("#train-destination").val();
        frequency = $("#train-frequency").val();
        firstTrain = $("#train-arrival").val();

        console.log(name)
        // Code for the push to firebase
        database.ref().push({

            name: name,
            destination: destination,
            frequency: frequency,
            firstTrain: firstTrain,
            //minutesAway: minutesAway,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        $("#train-name").val("");
        $("#train-destination").val("");
        $("#train-frequency").val("");
        $("#train-arrival").val("");

    });

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref().on("child_added", function (childSnapshot) {

        // Pull from firebase
        name = childSnapshot.val().name,
        destination = childSnapshot.val().destination,
        frequency = childSnapshot.val().frequency,
        firstTrain = childSnapshot.val().firstTrain;
        //nextArrival = childSnapshot.val().nextArrival,
        //minutesAway = childSnapshot.val().minutesAway;

        //Used train activity pattern as a starting point. Had to make various adjustments to get the program to work effectively, specifically in determining the next train times.
        // Define Variables
        tFrequency = frequency;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);
        // Current Time
        currentDateTime = moment();
        //console.log("Current time: " + currentDateTime)

        //currentTimeConverted = moment(currentDateTime, "HH:mm").subtract(1, "years");
        //console.log("Current time converted: " + currentTimeConverted)

        // Difference between the times
        diffTime = moment().diff(moment(firstTimeConverted), "minutes");

        // How much time is left from the first train to the current (i.e. if happening every 5 minutes and its been 23 minutes...2 minutes as part of the equation)
        remainder = diffTime % tFrequency;

        // Minute Until Train
        minutesAway = tFrequency - remainder;
        console.log("Time until next train: " + minutesAway);

        // Next Train Arrives at the calculated date and time
        nextTrain = moment().add(minutesAway, "minutes");
        console.log("Train Arrival: " + moment(nextTrain).format("hh:mm"));

        trainArrives = moment(nextTrain).format("hh:mm");

        //Push to table
        $('.table').append('<tr><td>'+ name +'</td><td>'+ destination +'</td><td>'+ frequency +'</td><td>'+ trainArrives +'</td><td>'+ minutesAway +'</td></tr>');
    

    // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});