function showQuestion(str) {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("txtHint").innerHTML =
        this.responseText;
      }
    };
    xmlhttp.open("GET", "https://coding101-e7ef0.firebaseapp.com/#/questions", true);
    xmlhttp.send();
  }

