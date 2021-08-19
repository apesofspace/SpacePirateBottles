"use strict";

$(document).ready(function () {
  //accordion
  $(function () {
    $(".accordion__item .accordion__title-wrap").on("click", function (e) {
      e.preventDefault();
      var $this = $(this);

      if (!$this.hasClass("active")) {
        $(".accordion__content").slideUp(400);
        $(".accordion__item .accordion__title-wrap").removeClass("active");
        $(".accordion__item").removeClass("active");
      }

      $this.toggleClass("active");
      $this.parent().toggleClass("active");
      $this.next().slideToggle();
    });
  }); //main-section

  $('.js-info-btn').on('click', function () {
    $('.js-info-wrap').addClass('active');
    $(this).css('opacity', '0');
    $('.js-form-wrap').css('opacity', '0');
    $('.follow-wrap').addClass('active');
    $('body').addClass('overflow');
  });
  $('.js-back').on('click', function () {
    $('.js-info-wrap').removeClass('active');
    $('.js-info-btn').css('opacity', '1');
    $('.js-form-wrap').css('opacity', '1');
    $('.follow-wrap').removeClass('active');
    $('body').removeClass('overflow');
  }); //hide arrow

  setTimeout(function () {
    $('.follow-arrow').css('opacity', '0');
  }, 15000); // to top

  $('.js-top').on('click', function () {
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
    return false;
  });
}); // anchors

var lastId,
    topMenu = $(".js-menu"),
    botMenu = $(".bot-menu"),
    header = $('.header'),
    topMenuHeight = header.outerHeight(),
    menuItems = topMenu.find("a"),
    botmenuItems = botMenu.find("a"),
    scrollItems = menuItems.map(function () {
  var item = $($(this).attr("href"));

  if (item.length) {
    return item;
  }
});
botmenuItems.click(function (e) {
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
  $('html, body').stop().animate({
    scrollTop: offsetTop
  }, 500);
  e.preventDefault();
});
menuItems.click(function (e) {
  $('.js-burger').removeClass('active');
  $('.js-nav').removeClass('active');
  $('body').removeClass('overflow');
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
  $('html, body').stop().animate({
    scrollTop: offsetTop
  }, 500);
  e.preventDefault();
});
$(window).scroll(function () {
  var fromTop = $(this).scrollTop() + topMenuHeight;
  var cur = scrollItems.map(function () {
    if ($(this).offset().top < fromTop) return this;
  });
  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";

  if (lastId !== id) {
    lastId = id;
    menuItems.parent().removeClass("active").end().filter("[href='#" + id + "']").parent().addClass("active");
  }
}); // road map

function getCoordsOfRoads(nodeList) {
  return Array.from(nodeList).map(function (item) {
    return {
      target: item,
      coordY: item.getBoundingClientRect().top
    };
  });
}

var roads = document.querySelectorAll('.road');
var bottles = document.querySelectorAll('.bottle');
var coordsRoads = getCoordsOfRoads(roads);
var coordsBottles = getCoordsOfRoads(bottles);
document.addEventListener('scroll', function () {
  var filteredRoadsArr = getCoordsOfRoads(roads).filter(function (obj) {
    return obj.coordY <= document.documentElement.clientHeight / 2;
  });
  var filteredBottlesArr = getCoordsOfRoads(bottles).filter(function (obj) {
    return obj.coordY <= document.documentElement.clientHeight / 2;
  });

  if (filteredRoadsArr.length) {
    filteredRoadsArr[filteredRoadsArr.length - 1].target.classList.remove("inactive");
  }

  if (filteredBottlesArr.length) {
    filteredBottlesArr[filteredBottlesArr.length - 1].target.classList.remove("inactive");
  }
}); // guest counter in choose party section

var guestInput = document.querySelector(".js-guest-input");
var guestInputField = document.querySelector(".js-guest-input-field");

if (guestInput && guestInputField) {
  guestInput.addEventListener("click", changeAmount);
}

function changeAmount(e) {
  if (e.target.classList.contains("js-guests-plus")) {
    guestInputField.value = parseInt(guestInputField.value) + 1;
  }

  if (e.target.classList.contains("js-guests-minus")) {
    guestInputField.value = parseInt(guestInputField.value) - 1;
  }
} // burger


if (document.querySelector('.js-burger')) {
  var BURGER = document.querySelector('.js-burger');
  var NAV = document.querySelector('.js-nav');
  var BODY = document.querySelector('body');
  var OVERFLOW = 'overflow';
  var ACTIVE = 'active';
  BURGER.addEventListener('click', function () {
    BURGER.classList.toggle(ACTIVE);
    NAV.classList.toggle(ACTIVE);
    BODY.classList.toggle(OVERFLOW);
  });
} //window height


var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
window.addEventListener('resize', function () {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
});