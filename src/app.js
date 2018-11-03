/* src/app.js */
// Swiper
import Swiper from 'swiper'
// Popper
require('popper.js')
// Bootstrap
require('bootstrap')
require('scripts/bootstrap-datepicker');

// Styles
require('normalize.css');
require('swiper/dist/css/swiper.css')
import './assets/sass/_app.sass';

$(document).ready(() => {
  $('[data-toggle="tooltip"]').tooltip()

  $('body').on('click', '.btn__add-polloption', (e) => {
    e.preventDefault()
    const optionHtml = '<div class="form-group"><label for="newpollOption02" class="sr-only">Option</label><input type="text" class="form-control" id="newpollOption02" placeholder="Option"></div>'
    $('.newpoll__options').prepend(optionHtml);
  })

  $('body').on('click', '.btn__add-video', (e) => {
    e.preventDefault()
    const linkHtml = '<div class="form-group"><label for="newVidLink" class="sr-only">Video Link</label><input type="text" class="form-control" id="newVidLink" placeholder="Paste a link for a video"></div>'
    $('.newvideo__add-link').append(linkHtml);
  })

  $('.form__control-feed').on('keydown', function (e) {
    var val = e.target.value
    if (val.length > 0) {
      console.log(this)
      $(this).addClass('focused')
    } else {
      $(this).removeClass('focused')
    }
  })

  /* $('.navbar__dropdown').hover(function (e) {
        $(this).stop(true, true).delay(400).addClass('show').find('.dropdown-toggle').attr('aria-expanded', 'true').siblings('.dropdown-menu').addClass('show')
    }, function (e) {
        $(this).stop(true, true).delay(400).removeClass('show').find('.dropdown-toggle').attr('aria-expanded', 'false').siblings('.dropdown-menu').removeClass('show')
    }) */

  /* $('.dropdown__sub').hover(function (e) {
        $(this).stop(true, true).delay(400).addClass('show').siblings('.dropdown-menu').addClass('show')
    }, function (e) {
        $(this).stop(true, true).delay(400).removeClass('show').siblings('.dropdown-menu').removeClass('show')
    }) */

  $('body').on('click', '.dropdown__sub', function(e) {
    e.preventDefault()
    e.stopPropagation()
    $(this).stop(true, true).delay(400).toggleClass('show').siblings('.dropdown-menu').toggleClass('show')
  })

  $('body').on('click', '.dropdown__sub ~ .dropdown-menu > .dropdown-item', function(e) {
    $('.dropdown__sub').removeClass('show').siblings('.dropdown-menu').removeClass('show')
  })

  $('body').on('click', function(e) {
    e.preventDefault()
    $('.dropdown__sub').removeClass('show').siblings('.dropdown-menu').removeClass('show')
  })

  $('body').on('click', '.btn__play', function(e) {
    e.preventDefault()
    e.stopPropagation()
    var video = $(this).siblings('video');
    $(this).parents('.media__item-vid').addClass('playing')
    video.get(0).play()
  })

  // Custom Select Functionality
  const selectedImg = $('.custom__select-with-img select').find(':selected').data('img');
  const selectedText = $('.custom__select-with-img select').find(':selected').text();
  $('.custom__select-with-img .custom__select-selected').find('.custom__select-selected-img').attr('src', selectedImg);
  $('.custom__select-with-img .custom__select-selected').find('.custom__select-selected-text').text(selectedText);

  $('body').on('click', '.custom__select-selected', function (event) {
    event.preventDefault()
    event.stopPropagation()
    $(this).siblings('.custom__select-list').slideToggle()
  })

  $('body').on('click', '.custom__select-list-item', function(e) {
    e.preventDefault()
    e.stopPropagation()
    const newText = $(this).find('.custom__select-name').text()
    const newImg = $(this).find('.custom__select-img').attr('src')
    const selVal = $(this).attr('value');
    $('.custom__select-with-img .custom__select-selected').find('.custom__select-selected-img').attr('src', newImg);
    $('.custom__select-with-img .custom__select-selected').find('.custom__select-selected-text').text(newText);
    $('.custom__select-with-img select[name=privacy]').val(selVal);
    $('.custom__select-list').slideUp()
  })

  // Datepicker Initialization
  $('.theme__datepicker').datepicker()
  // $('.theme__datepicker-my').datepicker({
  //   format: "mm-yyyy",
  //   startView: 1,
  //   minViewMode: 1
  // })

  // Custom Select Dropdown with Radio Inputs
  $('body').on('click', '.theme__select-dropdown > .theme__select-dropdown-toggle', function(e) {
    $(this).siblings('.theme__select-dropdown-menu').slideToggle()
  })

  $('body').on('click', '.theme__select-dropdown .theme__select-dropdown-item > label', function(e) {
    var selectedInput = $(this).siblings('input[type="radio"]')
    var selectedValue = $(selectedInput).val()
    var dataRep = $(this).data('tar')
    $(selectedInput).attr('checked', 'true')
    $(this).parents('.theme__select-dropdown').find('.theme__select-dropdown-toggle').text(selectedValue).siblings('input[name="'+ dataRep +'"]').val(selectedValue).delay(400).siblings('.theme__select-dropdown-menu').slideUp()
  })

  $('body').on('click', '.theme__select-dropdown-multiple .theme__select-dropdown-item > label', function(e) {
    var selectedInput = $(this).siblings('input[type="checkbox"]')
    var selectedValue = $(selectedInput).val()
    var values = $(this).parents('.theme__select-dropdown').find('.theme__select-dropdown-toggle').text()
    values = value + ', ' + selectedValue
    var dataRep = $(this).data('tar')
    $(selectedInput).attr('checked', 'true')
    $(this).parents('.theme__select-dropdown').find('.theme__select-dropdown-toggle').text(values).siblings('input[name="'+ dataRep +'"]').val(values).delay(400).siblings('.theme__select-dropdown-menu').slideUp()
  })
});

$(document).ready(() => {
  // Swiper Initialization
  const portfolioSwiper = new Swiper('#portfolio__container', {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
  const showreelSwiper = new Swiper('#showreel__container', {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
})
