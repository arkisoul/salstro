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
  $('[data-toggle="tooltip"]').tooltip();

  $('.newpost__add-tag').on('keypress', function (e) {
    if (e.keyCode !== 13) {
      return
    }
    e.preventDefault()
    if (e.target.value.length > 0) {
      var val = e.target.value
      var html = '<span class="newpost__tag">' + val + '<button class="btn btn__remove-tag" onclick="removeTag(this)">&times;</button></span>'
      $(this).parents('.newpost__tag-group').siblings('.newpost__tag-container').append(html)
      if ($(this).siblings('.newpost__tags').val() === '') {
        $(this).siblings('.newpost__tags').val(val)
      } else {
        $(this).siblings('.newpost__tags').val($(this).siblings('.newpost__tags').val() + ', ' + val)
      }
      $(this).val('')
    }
  })

  $('.btn__add-polloption').on('click', function (e) {
    e.preventDefault()
    const optionHtml = '<div class="newpoll__options"><div class="form-group newpoll__option"><label class="sr-only">Option</label><input class="form-control new__option-input" type="text" placeholder="Option 1" onkeypress="stopTagOpt(event)"></div><div class="newpoll__option-add"><button class="btn btn__remove btn__remove-polloption" onclick="removePollOption(this)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 1.876"><rect id="Rectangle_230" data-name="Rectangle 230" class="rectA" width="15" height="1.876" rx="0.938"/></svg></button></div></div>'
    $('.newpoll__options-wrap').append(optionHtml);
  })

  /* $('body').on('click', '.upload__file', function(e) {
    var id = $(this).attr('for')
    $('#' + id).click()
    console.log('clicked')
  }) */

  $('.form__control-feed').on('keydown', function (e) {
    var val = e.target.value
    if (val.length > 0) {
      $(this).addClass('focused')
    } else {
      $(this).removeClass('focused')
    }
  })

  $('.dropdown__sub').on('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
    $(this).stop(true, true).delay(400).toggleClass('show').siblings('.dropdown-menu').toggleClass('show')
  })

  $('.dropdown__sub ~ .dropdown-menu > .dropdown-item').on('click', function (e) {
    $('.dropdown__sub').removeClass('show').siblings('.dropdown-menu').removeClass('show')
  })

  $('body').on('click', function (e) {
    $('.dropdown__sub').removeClass('show').siblings('.dropdown-menu').removeClass('show')
    $('.custom__select-list').slideUp()
    $('.theme__select-dropdown-menu').slideUp()
  })

  $('.btn__play').on('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
    var video = $(this).siblings('video');
    $(this).parents('.media__item-vid').addClass('playing')
    video.get(0).play()
  })

  // Custom Select Functionality
  /* const selectedImg = $('.custom__select-with-img select').find(':selected').data('img');
  const selectedText = $('.custom__select-with-img select').find(':selected').text();
  $('.custom__select-with-img .custom__select-selected').find('.custom__select-selected-img').attr('src', selectedImg);
  $('.custom__select-with-img .custom__select-selected').find('.custom__select-selected-text').text(selectedText); */

  $('.custom__select-selected').on('click', function (event) {
    event.preventDefault()
    event.stopPropagation()
    $(this).siblings('.custom__select-list').slideToggle()
  })

  $('.custom__select-list-item').on('click', function (e) {
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
  $('.theme__datepicker-my').datepicker(/* {
    format: 'mm-yyyy',
    startView: 1,
    minViewMode: 1
  } */);
  $('.theme__datepicker ~ .input-group-append').on('click', function (e) {
    e.preventDefault()
    $(this).siblings('.theme__datepicker').click()
    $(this).siblings('.theme__datepicker-my').click()
    $(this).siblings('.theme__datepicker').focus()
    $(this).siblings('.theme__datepicker-my').focus()
  })

  // Custom Select Dropdown with Radio Inputs
  // Custom Multiple Select Dropdown with Checkbox Inputs
  $('.theme__select-dropdown > .theme__select-dropdown-toggle').on('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
    $(this).siblings('.theme__select-dropdown-menu').slideToggle()
  })

  $('.theme__select-dropdown .theme__select-dropdown-item > label').on('click', function (e) {
    var selectedInput = $(this).siblings('input[type="radio"]')
    var selectedValue = $(selectedInput).val()
    var dataRep = $(this).data('tar')
    $(selectedInput).prop('checked', true)
    $(this).parents('.theme__select-dropdown').find('.theme__select-dropdown-toggle').addClass('active').text(selectedValue).siblings('input[name="' + dataRep + '"]').val(selectedValue).delay(400).siblings('.theme__select-dropdown-menu').slideUp()
  })

  $('.theme__select-dropdown-multiple .theme__select-dropdown-item > label').on('click', function (e) {
    var selectedInput = $(this).siblings('input[type="checkbox"]')
    var selectedValue = $(selectedInput).val()
    var values = $(this).parents('.theme__select-dropdown').find('.theme__select-dropdown-toggle').text()
    var dataRep = $(this).data('tar')

    if ($(selectedInput).prop('checked')) {
      $(selectedInput).removeProp('checked')
      if (typeof values != 'undefined' && values.length > 0) {
        values = values.split(', ')
        values = values.filter((ele) => ele !== selectedValue)
        values = values.join(', ')
      }
    } else {
      $(selectedInput).prop('checked')
      if (typeof values != 'undefined' && values.length > 0 && ($(this).parents('.theme__select-dropdown').hasClass('active'))) {
        values = values + ', ' + selectedValue
      } else {
        values = selectedValue
      }
    }
    if (!$(this).parents('.theme__select-dropdown').hasClass('active')) {
      $(this).parents('.theme__select-dropdown').addClass('active')
    }
    $(this).parents('.theme__select-dropdown').find('.theme__select-dropdown-toggle').addClass('active').text(values).siblings('input[name="' + dataRep + '"]').val(values).delay(400).siblings('.theme__select-dropdown-menu').slideUp()
  })

  // Material Design Input Fields
  var mdInput = $('.theme__primary-form-control');

  // check whether it has placeholder
  var mdInputPlaceholder = mdInput.attr('placeholder');
  if (typeof mdInputPlaceholder != 'undefined' && mdInputPlaceholder.length > 0) {
    mdInput.addClass('touched')
  }
  $('.theme__primary-form-control').on('touchstart focus focusin click', function (e) {
    $(this).addClass('touched')
  })

  $('.theme__primary-form-control').on('touchend focusout', function (e) {
    if (e.target.value === '') {
      $(this).removeClass('touched')
    } else {
      $(this).addClass('touched')
    }
  })

  $('.add__badge').on('keypress', function (e) {
    if (e.keyCode !== 13) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    if (e.target.value.length > 0) {
      var val = e.target.value;
      var html = '<span class="theme__badge">' + val + '<button class="btn__badge-close" onclick="removeBadge(event, this)" role="button" type="button">×</button></span>'
      $(this).siblings('.theme__badge-container').append(html)
      var id = $(this).attr('id')
      if ($('input[name="' + id + '"]').val() === '') {
        $('input[name="' + id + '"]').val(val)
      } else {
        $('input[name="' + id + '"]').val($('input[name="' + id + '"]').val() + ', ' + val)
      }
      $(this).val('')
    }
  })

  $('.theme__primary-form-control, .theme__secondary-form-control').on('keypress', function (e) {
    if (e.keyCode === 13) e.preventDefault()
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

window.removePollOption = function (_this) {
  $(_this).parents('.newpoll__options').remove()
}

window.stopTagOpt = function (e) {
  if (e.keyCode !== 13) {
    return
  }
  e.preventDefault()
}

window.removeTag = function (_this) {
  var tag = $(_this).parent('.newpost__tag').text()
  tag = tag.slice(0, tag.length - 1)
  var tags = $(_this).parents('.newpost__tag-container').siblings('.newpost__tag-group').find('.newpost__tags').val()
  tags = tags.split(', ')
  tags = tags.filter((ele) => ele !== tag)
  $(_this).parents('.newpost__tag-container').siblings('.newpost__tag-group').find('.newpost__tags').val(tags.join(', '))
  $(_this).parent('.newpost__tag').remove()
}

window.removePhotoPost = function (_this) {
  $(_this).parent('.newphotopost__item').remove()
}

window.removeBadge = function (event, _this) {
  event.preventDefault()
  var badge = $(_this).parent('.theme__badge').text()
  badge = badge.slice(0, badge.length - 1)
  var badges = $(_this).parents('.theme__badge-container').siblings('input[type="hidden"]').val()
  if (typeof badges != 'undefined' && badges.length > 0) {
    badges = badges.split(', ')
  }
  badges = badges.filter((ele) => ele !== badge)
  $(_this).parents('.theme__badge-container').siblings('input[type="hidden"]').val(badges.join(', '))
  $(_this).parent('.theme__badge').remove()
}
