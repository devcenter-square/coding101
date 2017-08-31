var sec = [];

function secQuestion() {
    return;
}

function gradQuestion() {
    return;
}

function empQuestion() {
    return;
}


function addQuestion(className) {
    var catName = className.match(/\d+$/)[0];
    catName = document.getElementsByClassName('[0]');
    if (catName == 'blue') {
        secQuestion();
        // document.getElementsByClassName('qst_cont').innerHTML = sec[];
    } else if (catName == 'green') {
        gradQuestion();
    } else {
        empQuestion();
    }
    console.log('statements');
}