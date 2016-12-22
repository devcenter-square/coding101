/*!
 * Coding101
 * Coding101 is a guide for people that want to learn how to code
 * https://github.com/devcenter-square/coding101
 * @author Devcenter
 * @version 0.0.1
 * Copyright 2016. MIT licensed.
 */
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

var trackList = Vue.component('trackList', {
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
                        track.resources = resources.val();
                    });

                    self.tracks.push(track);
                }
            });
        }
    }
});

var newTrack = Vue.component('newTrack', {
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
            function slugify(text) {
                return text.toString().toLowerCase()
                    .replace(/\s+/g, '-') // Replace spaces with -
                    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
                    .replace(/\-\-+/g, '-') // Replace multiple - with single -
                    .replace(/^-+/, '') // Trim - from start of text
                    .replace(/-+$/, ''); // Trim - from end of text
            }

            this.track.slug = slugify(this.track.name);

            db.tracks.child(this.track.slug).set({
                name: this.track.name,
                slug: this.track.slug,
                details: this.track.details
            });

            for (i = 0; i < this.resources.length; i++) {
                var _newResource = firebase.database().ref('resources').push();
                _newResource.set({
                    track: this.track.slug,
                    url: this.resources[i].url
                })
            }

            this.$router.push('/');
        }
    }
});

var editTrack = Vue.component('editTrack', {
    template: '#Track',
    data: function() {
        return {
            track: {},
            resources: [{}]
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
            db.tracks.child(this.$route.params.slug).once('value', function(snapshot) {
                self.track = snapshot.val();
            })
            db.resources.orderByChild("track").equalTo(this.$route.params.slug).once('value', function(snapshot) {
                self.resources = snapshot.val();
            });
        },
        addResource: function() {
            this.resources.push({});

            // write code to create resource on firebase
        },
        removeResource: function(index) {
            this.resources.splice(index, 1);

            // write code to remove resource from firebase
        },
        saveResource: function() {
            // write code to save resource
        },
        save: function() {
            // write code to update track

            this.$router.push('/');
        }
    }
});

var questionList = Vue.component('questionList', {
    template: '#QuestionList'
});

var question = Vue.component('question', {
    template: '#Question'
});

// Routes

var router = new VueRouter({
    routes: [
        { name: 'home', path: '/', redirect: '/tracks' },
        { name: 'trackList', path: '/tracks', component: trackList },
        { name: 'newTrack', path: '/tracks/new', component: newTrack },
        { name: 'editTrack', path: '/tracks/:slug', component: editTrack },
        { name: 'questionList', path: '/questions', component: questionList },
        { name: 'question', path: '/questions/:id', component: question }
    ]
});

// Initialize Vue

var app = new Vue({ router: router }).$mount('#app');
