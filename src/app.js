/* src/app.js */

// Popper
require('popper.js')
// Bootstrap
require('bootstrap')

// Styles
require('normalize.css');
// require('bootstrap/dist/css/bootstrap.css');
import './assets/sass/_app.sass';

$(document).ready(() => {
  // require('scripts/demo');
  $('.btn__add-polloption').on('click', (e) => {
    e.preventDefault()
    const optionHtml = '<div class="form-group"><label for="newpollOption02" class="sr-only">Option</label><input type="text" class="form-control" id="newpollOption02" placeholder="Option"></div>'
    $('.newpoll__options').prepend(optionHtml);
  })
});
