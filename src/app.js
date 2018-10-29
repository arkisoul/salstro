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
  console.log('Ready!');

  require('scripts/demo');
});
