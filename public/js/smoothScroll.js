$(document).ready(function() {



    $('a[href^="#"]').on('click', function(event) {

        if($('#menuMobileTitle').css('display') == "none"){
            var higher = 50;
        }
        else
        {
            var higher = 100;
        }

        var target = $( $(this).attr('href') );

        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - higher
            }, 500);
            console.log($('#menuMobileTitle').css('display'));
        }
    });

});