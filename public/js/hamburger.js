$( document ).ready(function() {

    $( "#menuMobile" ).hide();
    $( ".hamburger" ).click(function() {
        $( "#menuMobile" ).slideToggle( "fast", function() {
        });
    });


});