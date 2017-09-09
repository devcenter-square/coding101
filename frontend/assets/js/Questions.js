/**
 * Created by theophy on 09/09/2017.
 *
 *
 * Service file to manipulate our questions from the fire base app
 */

var Questions = (function (Database) {
    var questions = []; //array of all the questions

    return {
        /**
         * this is used to filter questions by the category, if the user is a secondary sch
         * graduate
         *
         * @todo implement the filter
         * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
         *
         * @return {Array}
         */
        getSecSchool: function () {
            return questions;
        },

        getUniversity: function () {

        },

        getEmployed: function () {

        },

        fetch: function () {

        },

        getQuestions: function () {

        }

    }


}(Database));