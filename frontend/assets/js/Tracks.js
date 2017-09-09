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

                        var resourcesPromise = [];
                        for (var i in loadedTracks) {
                            tracks.push(loadedTracks[i]);
                            //this is to load up resources for each track
                            resourcesPromise.push(Database.resources.orderByChild('track').equalTo(loadedTracks[i].slug).once('value'));
                        }


                        // load up all resources for each track
                        Promise.all(resourcesPromise)
                            .then(function (values) {
                                for (var i = 0; i < values.length; i++) {
                                    tracks[i].resources = values[i].val() || {};
                                }

                                //finally resolve our fetch here, that we are done with all the fetching
                                resolve(tracks);
                            }).catch(reject);

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