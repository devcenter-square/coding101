// app.js will be the javascript file
// for the main app functions (non-dom)

// Initialize Firebase

var config = {
    apiKey: "AIzaSyA6mwwrGZLXTrPZcotadbPla7MfSNRyvU8",
    authDomain: "coding101-e7ef0.firebaseapp.com",
    databaseURL: "https://coding101-e7ef0.firebaseio.com",
    storageBucket: "coding101-e7ef0.appspot.com"
};

firebase.initializeApp(config);

var db = {
    tracks: firebase.database().ref('tracks'),
    resources: firebase.database().ref('resources')
}

// Components

var trackList = {
    template: '#TrackList',
    data: function() {
        return {
            tracks: []
        }
    },
    watch: {
        '$route': 'fetchData'
    },
    created: function() {
        this.fetchData()
    },
    methods: {
        fetchData: function() {
            var self = this;
            db.tracks.once('value', function(snapshot) {
                var tracks = snapshot.val();

                for (var i in tracks) {
                    var track = tracks[i];
                    track.resources = {};
                    db.resources.orderByChild('track').equalTo(track.slug).once('value', function(resources) {
                        track.resources = resources.val() || {};
                    });
                    self.tracks.push(track);
                }
            });
        }
    }
};

var newTrack = {
    template: '#Track',
    data: function() {
        return {
            track: {},
            resources: [{}]
        }
    },
    methods: {
        addResource: function() {
            this.resources.push({});
        },
        removeResource: function(index) {
            this.resources.splice(index, 1);
        },
        save: function() {
            this.track.slug = slugify(this.track.name);

            db.tracks.child(this.track.slug).set({
                name: this.track.name,
                slug: this.track.slug,
                details: this.track.details
            });

            for (i = 0; i < this.resources.length; i++) {
                var _newResource = db.resources.push();
                _newResource.set({
                    track: this.track.slug,
                    url: this.resources[i].url
                });
            }

            this.$router.push('/');
        }
    }
};

var editTrack = {
    template: '#Track',
    data: function() {
        return {
            track: {},
            resources: {}
        }
    },
    beforeRouteEnter: function(to, from, next) {
        db.tracks.child(to.params.slug).once('value', function(track) {
            if (track.val() == null) {
                next(false);
            } else {
                db.resources.orderByChild("track").equalTo(to.params.slug).once('value', function(resources) {
                    next(function(vm) {
                        vm.track = track.val();
                        vm.resources = resources.val();
                    });
                });
            }
        })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData: function() {
            var self = this;
            db.tracks.child(this.$route.params.slug).once('value', function(track) {
                if (track.val() == null) {
                    router.push('/404');
                } else {
                    db.resources.orderByChild("track").equalTo(this.$route.params.slug).once('value', function(resources) {
                        self.track = track.val();
                        self.resources = resources.val();
                    });
                }
            });
        },
        addResource: function() {
            var self = this;
            var _newResource = {
                track: this.track.slug
            };

            db.resources.push(_newResource).then(function(snapshot) {
                self.resources = self.resources || {};
                Vue.set(self.resources, snapshot.key, _newResource);
            });
        },
        removeResource: function(index) {
            var self = this;
            db.resources.child(index).remove().then(function() {
                Vue.delete(self.resources, index);
            });
        },
        saveResource: function(index, resource) {
            db.resources.child(index).update({
                url: resource.url
            });
        },
        save: function() {
            this.track.slug = slugify(this.track.name);

            db.tracks.child(this.$route.params.slug).update({
                name: this.track.name,
                slug: this.track.slug,
                details: this.track.details
            });

            this.$router.push('/');
        }
    }
};

var questionList = {
    template: '#QuestionList'
};

var question = {
    template: '#Question'
};

var notFound = {
    template: '#NotFound'
};

// Routes

var router = new VueRouter({
    routes: [
        { name: 'home', path: '/', redirect: '/tracks' },
        { name: 'trackList', path: '/tracks', component: trackList },
        { name: 'newTrack', path: '/tracks/new', component: newTrack },
        { name: 'editTrack', path: '/tracks/:slug', component: editTrack },
        { name: 'questionList', path: '/questions', component: questionList },
        { name: 'question', path: '/questions/:id', component: question },
        { name: '404', path: '/404', component: notFound }
    ]
});

// Initialize Vue

var app = new Vue({ router: router }).$mount('#app');


// Utility functions

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}
