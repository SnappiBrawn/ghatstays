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

// secondary nav hide behaviour
$(document).ready(function () {
  var lastScrollTop = 0;
  document.addEventListener("scroll", function () {
    var st = window.scrollY;
    if (st < lastScrollTop && st > 200) {
      $(".secondary-navbar").addClass("visible");
    }
    else {
      $(".secondary-navbar").removeClass("visible");
    }
    lastScrollTop = st <= 0 ? 0 : st;
  }, false);
});

// Owl carousels
$(document).ready(function () {
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

  $('.owl-carousel.stay-carousel').owlCarousel({
    loop: true,
    margin: 3,
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    center: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
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
});

// init Isotope for home page
var $grid = $('.filtered-listing').isotope({
  itemSelector: '.iso-item',
  layoutMode: 'fitRows',
  getSortData: {
    name: '.name',
    price: '.price parseInt',
    category: '[data-category]',
  }
});

$('#filters').on('click', 'button', function () {
  var filterValue = $(this).attr('data-filter');
  $(this).siblings().each(function () {
    $(this).removeClass("active");
  });
  $(this).addClass("active");
  $grid.isotope({ filter: filterValue });
});

// bind sort button click
$('#sorts').on('click', 'button', function () {
  var sortByValue = $(this).attr('data-sort-by');
  $grid.isotope({ sortBy: sortByValue });
});

// Bootstrap ToolTips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


// Isotope for stays page

var $stay_grid = $('.stays-grid').isotope({
  itemSelector: '.stay-item',
  layoutMode: 'vertical',
  gutter: 0,
  transitionDuration: 0,
  getSortData: {
    price_asc: function (ele) {
      return parseInt( $(ele).attr('iso-price').replace(/[^0-9]/g, ""), 10 )
    },
    price_desc: function (ele) {
      return -parseInt( $(ele).attr('iso-price').replace(/[^0-9]/g, ""), 10 )
    },
  }
});

const url = new URL(window.location.href);
const searchParams = url.searchParams;
currentLocation = searchParams.get("location");
document.querySelector('#entry').innerHTML = currentLocation ? currentLocation : "All locations";
$stay_grid.isotope({ filter: currentLocation ? '.' + currentLocation : "*" });
$stay_grid.isotope('layout');
document.querySelector('#staysCount').innerHTML = $stay_grid.isotope('getFilteredItemElements').length;

$('#sort-options').on('change', function () {
  const sortValue = $(this).val();
  $stay_grid.isotope({ sortBy: sortValue });
});