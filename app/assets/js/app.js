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


// Routes
var TrackList = {
    template: '<div>All Tracks</div>'
}

var Track = {
    template: '<div>Track {{ $route.params.id }}</div>'
}

var QuestionList = {
    template: '<div>All questions</div>'
}

var Question = {
    template: '<div>Question {{ $route.params.id }}</div>'
}

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
