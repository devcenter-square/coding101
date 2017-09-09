/**
 * Created by theophy on 09/09/2017.
 *
 *
 * connection with our fire base app here
 *
 * we can now call Database.tracks or questions to manipulate them
 *
 * @link https://firebase.google.com/docs/database/web/read-and-write
 */


var Database = (function () {
    var config = {
        apiKey: "AIzaSyA6mwwrGZLXTrPZcotadbPla7MfSNRyvU8",
        authDomain: "coding101-e7ef0.firebaseapp.com",
        databaseURL: "https://coding101-e7ef0.firebaseio.com",
        storageBucket: "coding101-e7ef0.appspot.com"
    };

    firebase.initializeApp(config);

    return {
        tracks: firebase.database().ref('tracks'),
        resources: firebase.database().ref('resources'),
        questions: firebase.database().ref('questions'),
        answers: firebase.database().ref('answers')
    };
}());


