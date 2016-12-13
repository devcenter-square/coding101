/*!
 * Coding101
 * Coding101 is a guide for people that want to learn how to code
 * https://github.com/devcenter-square/coding101
 * @author Devcenter
 * @version 0.0.1
 * Copyright 2016. MIT licensed.
 */
$(document).ready(function() {
    $("#add-another-answer").click(function() {

        $($('.q-row').last()).after('<div class="row m-t-xl q-row"><div class="four columns"><label>Answer 3</label><a href="#" class="text-grey delete-this-answer">Remove</a></div><div class="eight columns"><input class="form-control u-full-width" placeholder="Actual Answer" type="text" required><input class="form-control u-full-width" placeholder="Add track" type="text" required></div></div>');

        $(".delete-this-answer").click(function() {
            $(this).closest(".q-row").remove();
        });

    });

    $(".delete-this-answer").click(function() {
        $(this).closest(".q-row").remove();
    });

});
