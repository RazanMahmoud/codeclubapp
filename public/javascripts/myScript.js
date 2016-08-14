$(document).ready(function(){
    $(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
            $(this).toggleClass('open');        
        },
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
            $(this).toggleClass('open');       
        }
    );
    
    $('.navbar .nav li a').click(function(){
        
        $('.navbar .nav li').removeClass('active');
        $('.navbar .nav li a').removeClass('active');
        $(this).addClass('active');
    });
      
});

/* Start Loading page */



$(window).load(function(){
    $(".loading .spinner").fadeOut(3000,function(){
    $('body').css("overflow","auto");
    $(this).parent().fadeOut(2000,function(){
        $(this).remove();
        });
    });
});

/* End Loading page */