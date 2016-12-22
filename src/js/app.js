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
// 	name: 'Sample Track',
// 	slug: 'sample-track',
// 	resources: []
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

var Track = Vue.component('Track', {
    template: '#Track',
    data: function() {
        return {
            trackName: '',
            trackSlug: '',
            trackResource: '',
            trackResourceTwo: '',
            trackDetails: '',
        }
    },
    methods: {
        trackSubmit: function () {
            var _tracks = firebase.database().ref('tracks');
            var _newTrack = _tracks.push();

            var trackSlug = this.trackName.replace(/\s+/g, '-').toLowerCase();

            _newTrack.set({
            	name: this.trackName,
                slug: trackSlug,
            	details: this.trackDetails,
            	resources: [
                    {
                        link: this.trackResource

                    },
                    {
                        linktwo: this.trackResourceTwo
                    }
            ]
            });

            this.$router.push('/')


        }
    }
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
        { path: '/tracks/:id', component: Track },
        { path: '/questions', component: QuestionList },
        { path: '/questions/:id', component: Question }
    ]
});

// Initialize Vue

var app = new Vue({ router: router }).$mount('#app');
