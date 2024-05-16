
$(document).ready(function() {
    $(window).scroll(function() {
      var scrollHeight = window.scrollY; // Get document scroll height
      var windowHeight = $(window).height(); // Get viewport height
  
      // Check if scroll height is greater than 100vh
      if (scrollHeight > windowHeight) {
        $("#scroll-top").css("opacity", 100); // Set display to flex
      } else {
        $("#scroll-top").css("opacity", 0); // Reset display property
      }
    });
  });


