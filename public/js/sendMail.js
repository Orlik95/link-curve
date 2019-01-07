function sendMail(nick, btag, about) {


    if(validateForm(["nick", "btag", "about"])){

        var http = new XMLHttpRequest();
        var url = window.location.href;
        http.open('POST', url, true);

        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        http.send(`nick=${nick}&btag=${btag}&about=${about}`);

        document.getElementById('nick').value = "";
        document.getElementById('btag').value = "";
        document.getElementById('about').value = "";
        swal('Wysłano zgłoszenie!');


    }

}