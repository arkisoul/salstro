/* src/app.js */

// Popper
require('popper.js')
// Bootstrap
require('bootstrap')

// Styles
require('normalize.css');
import './assets/sass/_app.sass';

$(document).ready(() => {
  // require('scripts/demo');
  $('.btn__add-polloption').on('click', (e) => {
    e.preventDefault()
    const optionHtml = '<div class="form-group"><label for="newpollOption02" class="sr-only">Option</label><input type="text" class="form-control" id="newpollOption02" placeholder="Option"></div>'
    $('.newpoll__options').prepend(optionHtml);
  })

  $('.btn__add-video').on('click', (e) => {
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

  // Custom Select Functionality
  const selectedImg = $('.custom__select-with-img select').find(':selected').data('img');
  const selectedText = $('.custom__select-with-img select').find(':selected').text();
  $('.custom__select-with-img .custom__select-selected').find('.custom__select-selected-img').attr('src', selectedImg);
  $('.custom__select-with-img .custom__select-selected').find('.custom__select-selected-text').text(selectedText);

  $('.custom__select-selected').on('click', function (event) {
    event.preventDefault()
    event.stopPropagation()
    $(this).siblings('.custom__select-list').slideToggle()
  })

  $('.custom__select-list-item').on('click', function(e) {
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
});
