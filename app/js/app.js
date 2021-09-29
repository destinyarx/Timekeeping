$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
       isClosed = false;
  
      trigger.click(function () {
        hamburger_cross();      
      });
  
      function hamburger_cross() {
  
        if (isClosed === true) {          
          overlay.hide(); // hide
          trigger.removeClass('is-closed'); // is-open
          trigger.addClass('is-open'); // is-closed
          isClosed = true; // false
        } else {   
          overlay.hide(); // show
          trigger.removeClass('is-open'); // is-closed
          trigger.addClass('is-closed'); // is-open
          isClosed = false; // true
        }
    }
    
    $('[data-toggle="offcanvas"]').click(function () {
          $('#wrapper').toggleClass('toggled');
    });  
});