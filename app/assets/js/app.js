/*!
 * Coding101
 * Coding101 is a guide for people that want to learn how to code
 * https://github.com/devcenter-square/coding101
 * @author Devcenter
 * @version 0.0.1
 * Copyright 2017. MIT licensed.
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
    resources: firebase.database().ref('resources'),
    questions: firebase.database().ref('questions'),
    answers: firebase.database().ref('answers')
}

// Components

var trackList = {
    template: '#TrackList',
    data: function() {
        return {
            tracks: []
        };
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
                    fetchResources(tracks[i]);
                }

                function fetchResources(track) {
                    db.resources.orderByChild('track').equalTo(track.slug).once('value', function(snapshot) {
                        track.resources = snapshot.val() || {};
                        self.tracks.push(track);
                    })
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
            this.track.slug = generateUUID();

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
            if (track.val() === null) {
                next(false);
            } else {
                db.resources.orderByChild("track").equalTo(to.params.slug).once('value', function(resources) {
                    next(function(self) {
                        self.track = track.val();
                        self.resources = resources.val();
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
                if (track.val() === null) {
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
            db.tracks.child(this.$route.params.slug).update({
                name: this.track.name,
                details: this.track.details
            });

            this.$router.push('/');
        }
    }
};

var questionList = {
    template: '#QuestionList',
    data: function() {
        return {
            questions: []
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
            db.questions.once('value', function(snapshot) {
                var questions = snapshot.val();

                for (var i in questions) {
                    fetchAnswers(questions[i]);
                }

                function fetchAnswers(question) {
                    db.answers.orderByChild('question').equalTo(question.slug).once('value', function(snapshot) {
                        question.answers = snapshot.val() || {};
                        self.questions.push(question);
                    })
                }
            });
        }
    }
};

var newQuestion = {
    template: '#Question',
    data: function() {
        return {
            question: {},
            answers: [{}]
        }
    },
    methods: {
        addAnswer: function() {
            this.answers.push({});
        },
        removeAnswer: function(index) {
            this.answers.splice(index, 1);
        },
        save: function() {
            this.question.slug = generateUUID();

            db.questions.child(this.question.slug).set({
                description: this.question.description,
                slug: this.question.slug
            });

            for (i = 0; i < this.answers.length; i++) {
                var _newAnswer = db.answers.push();
                _newAnswer.set({
                    question: this.question.slug,
                    description: this.answers[i].description,
                    tracks: this.answers[i].tracks
                });
            }

            this.$router.push('/questions');
        }
    }
};

var editQuestion = {
    template: '#Question',
    data: function() {
        return {
            question: {},
            answers: {}
        }
    },
    beforeRouteEnter: function(to, from, next) {
        db.questions.child(to.params.slug).once('value', function(question) {
            if (question.val() === null) {
                next(false);
            } else {
                db.answers.orderByChild("question").equalTo(to.params.slug).once('value', function(answers) {
                    next(function(self) {
                        self.question = question.val();
                        self.answers = answers.val();
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
            db.questions.child(this.$route.params.slug).once('value', function(question) {
                if (question.val() === null) {
                    router.push('/404');
                } else {
                    db.answers.orderByChild("question").equalTo(this.$route.params.slug).once('value', function(answers) {
                        self.question = question.val();
                        self.answers = answers.val();
                    });
                }
            });
        },
        addAnswer: function() {
            var self = this;
            var _newAnswer = {
                question: this.question.slug
            };

            db.answers.push(_newAnswer).then(function(snapshot) {
                self.answers = self.answers || {};
                Vue.set(self.answers, snapshot.key, _newAnswer);
            });
        },
        removeAnswer: function(index) {
            var self = this;
            db.answers.child(index).remove().then(function() {
                Vue.delete(self.answers, index);
            });
        },
        save: function() {
            var self = this;
            db.questions.child(this.$route.params.slug).update({
                description: self.question.description
            }).then(function() {
                for (index in self.answers) {
                    var _answer = self.answers[index];
                    db.answers.child(index).update({
                        description: _answer.description,
                        tracks: _answer.tracks
                    });
                }

                self.$router.push('/questions');
            });
        }
    }
};

Vue.component('selectize-vue', {
    template: '<input class="form-control u-full-width select-tracks" v-bind:value="value" placeholder="Add track" type="text" required>',
    props: ['value'],
    created: function() {
        var self = this;
        db.tracks.once('value', function(snapshot) {
            var tracks = [];
            for (i in snapshot.val()) {
                tracks.push(snapshot.val()[i]);
            }
            $(self.$el).selectize({
                persist: false,
                maxItems: null,
                valueField: 'slug',
                labelField: 'name',
                searchField: ['name', 'details'],
                options: tracks,
                onChange: function(value) {
                    self.$emit('input', value);
                }
            });

        });
    }
})

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
        { name: 'newQuestion', path: '/questions/new', component: newQuestion },
        { name: 'editQuestion', path: '/questions/:slug', component: editQuestion },
        { name: '404', path: '/404', component: notFound }
    ]
});

// Initialize Vue

var app = new Vue({ router: router }).$mount('#app');


// Utility functions

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};
