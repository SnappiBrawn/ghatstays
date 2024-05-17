// scroll top visibility function
$(document).ready(function () {
  $(window).scroll(function () {
    var scrollHeight = window.scrollY;
    var windowHeight = $(window).height();

    if (scrollHeight > windowHeight) {
      $("#scroll-top").css("opacity", 100);
    } else {
      $("#scroll-top").css("opacity", 0);
    }
  });
});

var owl = $('.owl-carousel.reviews-carousel').owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  autoplay: true,
  autoplayTimeout: 4000,
  responsive: {
    0: {
      items: 1
    }
  }
})

$('#reviews-next').click(function () {
  owl.trigger('next.owl.carousel');
})

$('#reviews-prev').click(function () {
  owl.trigger('prev.owl.carousel');
})

$('.owl-carousel.facts-carousel').owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  autoplay: true,
  autoplayTimeout: 4000,
  responsive: {
    0: {
      items: 1
    },
    1000: {
      items: 6
    },
  }
})

$('.owl-carousel').owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  autoplay: true,
  autoplayTimeout: 4000,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 3
    },
  }
})
