 var app = app || {};

(function ($) {
  'use strict';

  app.addEventListener = function (object, type, listener, useCapture) { 
      if ( object.addEventListener ) {
         object.addEventListener( type, listener, useCapture );
      } else if ( object.attachEvent ) {
         object.attachEvent( type, listener );
      }
  }


})(jQuery);