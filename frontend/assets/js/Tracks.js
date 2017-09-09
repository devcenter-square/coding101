/**
 * Created by theophy on 09/09/2017.
 *
 *
 *
 * this is going to be based on  Creational Design pattern --> Singleton (only instantiated once)
 *
 * which would hold all our tracks and also exposes some functions to manage it (Encapsulation)
 */


var Tracks = (function (Database) {
    var tracks = [];//holds all our tracks, and nobody can modify it

    return {
        /**
         * this fetches our tracks and also saves it in our main track array variable above
         * so we can manipulate it and use it anytime we want, which means we load the tracks once
         * and then use `getTracks()` to use it anytime
         * @return {Promise}
         */
        fetch: function () {
            return new Promise(function (resolve, reject) {
                Database.tracks.once('value')
                    .then(function (snapshot) {
                        tracks = []; //any time we load tracks, always clear our tracks array
                        var loadedTracks = snapshot.val();
                        for (var i in loadedTracks) {
                            tracks.push(loadedTracks[i]);
                        }

                        resolve(tracks);
                    })
                    .catch(reject);
            });
        },

        /**
         * this is used to access our tracks variable at the top
         * @return {Array}
         */
        getTracks: function () {
            return tracks;
        }
    }

}(Database));