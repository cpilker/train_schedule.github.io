# TRAIN SCHEDULE
## About
* The purpose of this project was to develop a train application that allows users to review the existing train schedule as well as additional trains.
* The system will populate all trains in the Firebase application that calcluate the next train time in HH:mm format as well as define time until next train.

## Basic Set Up
* The train schedule is populated at the top of the screen and the data is stored in a Firebase database.
* Past train schedules uploaded will be pulled from Firebase and populated when the page loads. 
* The user has a bottom section available to add a name of a train, destination, first pick up and then frequency. This is then pushed to Firebase and the page does a net new pull from each time.
    * Basic UI is bootstrap with minimal mark up required to provide padding within the tables

## Functions
* Application requried a $(window).on('load') - without it the user would not pull the correct info from the database.
* Firebase is the initialized.
* **On Click** function is utilized to add new trains to the database.
    * Data added include: Train name, destination, frequency and when the first train is
* Database.ref is then utilized to pull the info back out of Firebase and populate the train schedule table.
* Firebase calculates next time based on the current time and the original frequency/first-train.
