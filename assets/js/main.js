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

  $('.owl-carousel.review').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    autoplay: true,
    autoplayTimeout: 6000,
    items: 1,
  })

  $('.owl-carousel').owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    autoplay: false,
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

// Enquiry submit handler
$('#submitButton').click(function (event) {
  event.preventDefault(); 

  const form = $('#book');
  const formData = new FormData(form[0]); 

  const jsonData = {};
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }

  $.ajax({
    url: 'https://7wusrylrub.execute-api.ap-south-1.amazonaws.com/send-mail',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(jsonData),
    success: function (data) {
      alert('Request sent, our team will get back to you shortly.')
    },
    error: function (error) {
      alert('Error submitting request, please try again in a while');
    }
  });
});


// Isotope for stays page
$(document).ready(function () {
  var $stay_grid = $('.stays-grid').isotope({
    itemSelector: '.stay-item',
    layoutMode: 'vertical',
    gutter: 0,
    transitionDuration: 0,
    getSortData: {
      name_asc: function (ele) {
        return $(ele).find(".iso-title").text();
      },
      price_asc: function (ele) {
        return parseInt($(ele).attr('iso-price').replace(/[^0-9]/g, ""), 10)
      },
      price_desc: function (ele) {
        return -parseInt($(ele).attr('iso-price').replace(/[^0-9]/g, ""), 10)
      },
      ratings: function (ele) {
        return -parseInt($(ele).attr('iso-rating'), 10)
      },
    }
  });

  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  const locationMap = { Chikmagalur: 'f11', Coorg: 'f12', Horanadu: 'f13', Kudremukh: 'f14', Mudigere: 'f15', Sakleshpur: 'f16' };
  const mobileLocationMap = { Chikmagalur: 'mf11', Coorg: 'mf12', Horanadu: 'mf13', Kudremukh: 'mf14', Mudigere: 'mf15', Sakleshpur: 'mf16' };
  const typeMap = { Homestay: 'f21', Resort: 'f22' };
  const mobileTypeMap = { Homestay: 'mf21', Resort: 'mf22' };

  currentLocation = searchParams.get('location');
  currentType = searchParams.get('type');
  document.querySelector('#entry').innerHTML = currentLocation ? currentLocation : 'All locations';
  if (currentLocation) {
    document.getElementById(locationMap[currentLocation]).checked = true;
    document.getElementById(mobileLocationMap[currentLocation]).checked = true;
    document.getElementById(typeMap[currentType]).checked = true;
    document.getElementById(mobileTypeMap[currentType]).checked = true;
  }
  var filters = [currentLocation ? `.${currentLocation}` : "", currentType ? `.${currentType}` : ""]
  $stay_grid.isotope({ filter: filters.filter(Boolean).length ? filters.filter(Boolean).join("") : "*" });
  $stay_grid.isotope('layout');
  document.querySelector('#staysCount').innerHTML = $stay_grid.isotope('getFilteredItemElements').length;

  $('#sort-options').on('change', function () {
    const sortValue = $(this).val();
    $stay_grid.isotope({ sortBy: sortValue });
  });

  // filters for desktop and mobile respectively
  const locationFilters = [];
  const typeFilters = [];
  $('#Filters1 input[type="checkbox"]').on('change', function () {
    const checkedLabelText = $(this).closest('.col').find('label').text().trim();
    if ($('#filterOne').find($(this)).length === 1) {
      if ($(this).is(':checked')) {
        locationFilters.push(checkedLabelText);
      }
      else if (!$(this).is(':checked')) {
        const index = locationFilters.indexOf(checkedLabelText);
        if (index !== -1) {
          locationFilters.splice(index, 1);
        }
      }
    }
    if ($('#filterTwo').find($(this)).length === 1) {
      if ($(this).is(':checked')) {
        typeFilters.push(checkedLabelText);
      }
      else if (!$(this).is(':checked')) {
        const index = typeFilters.indexOf(checkedLabelText);
        if (index !== -1) {
          typeFilters.splice(index, 1);
        }
      }
    }
    var combinedFilters = [];
    if (locationFilters.length && typeFilters.length) {
      for (const location of locationFilters) {
        for (const type of typeFilters) {
          combinedFilters.push(`.${location}.${type}`);
        }
      }
    }
    else {
      combinedFilters.push(locationFilters.map(e => `.${e}`))
    }
    $stay_grid.isotope({ filter: combinedFilters.join(', ') });
    document.querySelector('#staysCount').innerHTML = $stay_grid.isotope('getFilteredItemElements').length;
    document.querySelector('#entry').innerHTML = locationFilters.length ? locationFilters.join(', ') : 'All Locations';
  });

  $('#filterOffCanvas input[type="checkbox"]').on('change', function () {
    const checkedLabelText = $(this).closest('.col').find('label').text().trim();
    if ($('#locationFilter').find($(this)).length === 1) {
      if ($(this).is(':checked')) {
        locationFilters.push(checkedLabelText);
      }
      else if (!$(this).is(':checked')) {
        const index = locationFilters.indexOf(checkedLabelText);
        if (index !== -1) {
          locationFilters.splice(index, 1);
        }
      }
    }
    if ($('#staytypeFilter').find($(this)).length === 1) {
      if ($(this).is(':checked')) {
        typeFilters.push(checkedLabelText);
      }
      else if (!$(this).is(':checked')) {
        const index = typeFilters.indexOf(checkedLabelText);
        if (index !== -1) {
          typeFilters.splice(index, 1);
        }
      }
    }
    var combinedFilters = [];
    if (locationFilters.length && typeFilters.length) {
      for (const location of locationFilters) {
        for (const type of typeFilters) {
          combinedFilters.push(`.${location}.${type}`);
        }
      }
    }
    else {
      combinedFilters.push(locationFilters.map(e => `.${e}`))
    }
    $stay_grid.isotope({ filter: combinedFilters.join(', ') });
    document.querySelector('#staysCount').innerHTML = $stay_grid.isotope('getFilteredItemElements').length;
    document.querySelector('#entry').innerHTML = locationFilters.length ? locationFilters.join(', ') : 'All Locations';
  });

})
