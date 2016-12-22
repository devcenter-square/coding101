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

// Sample code to create a track on firebase

// var _tracks = firebase.database().ref('tracks');
// var _newTrack = _tracks.push();
//
// _newTrack.set({
//  name: 'Sample Track',
//  slug: 'sample-track',
//  resources: []
// });

// Components

var TrackList = Vue.component('TrackList', {
    template: '#TrackList',
    data: function() {
        return {
            tracks: null
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
            var $this = this;
            var tracks = [];
            firebase.database().ref('tracks').on('value', function(snapshot) {
                $this.tracks = snapshot.val();
            });
        },


    }
});

var NewTrack = Vue.component('NewTrack', {
    template: '#NewTrack',
    data: function() {
        return {
            track: {},
            resources: [{}]
        }
    },
    methods: {
        addResource: function(event) {
            event.preventDefault();
            this.resources.push({});
        },
        removeResource: function(index, event) {
            event.preventDefault();
            this.resources.splice(index, 1);
        },
        create: function() {
            function slugify(text) {
                return text.toString().toLowerCase()
                    .replace(/\s+/g, '-') // Replace spaces with -
                    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
                    .replace(/\-\-+/g, '-') // Replace multiple - with single -
                    .replace(/^-+/, '') // Trim - from start of text
                    .replace(/-+$/, ''); // Trim - from end of text
            }
            this.track.slug = slugify(this.track.name);

            var _newTrack = firebase.database().ref('tracks').push();
            _newTrack.set({
                name: this.track.name,
                slug: this.track.slug,
                details: this.track.details
            });

            for (i=0; i < this.resources.length; i++) {
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

var ViewTrack = Vue.component('ViewTrack', {
    template: '#ViewTrack'
});

var QuestionList = Vue.component('QuestionList', {
    template: '#QuestionList'
});

var Question = Vue.component('Question', {
    template: '#Question'
});

// Routes

var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/tracks' },
        { path: '/tracks', component: TrackList },
        { path: '/tracks/new', component: NewTrack },
        { path: '/tracks/:slug', component: ViewTrack },
        { path: '/questions', component: QuestionList },
        { path: '/questions/:id', component: Question }
    ]
});

// Initialize Vue

var app = new Vue({ router: router }).$mount('#app');
