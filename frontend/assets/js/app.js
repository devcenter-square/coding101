/**
 * Created by theophy on 09/09/2017.
 *
 * Do all application logic here
 */

// Load Up all our resources here (Promise.all), before showing anything to the user, like a loader
Tracks.fetch().then(function (tracks) {
    console.log("Here is our tracks", tracks); //check ur console
}, function (error) {
    console.error("Error occurred", error);
});
