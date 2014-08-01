/*global $ */
/*jshint unused:false */
var app = app || {};

$(function () {
  'use strict';

  app.book = new app.Book({ 
    filename: 'mei/Ca9-d_22.RIDDELL-ScotsReels.xml'
  });

  // the application will show a view of the book
  app.bookview = new app.EmbeddedBookView({
    model: app.book,
    zoom_mode: app.Constants.ZoomMode.CONTENT,
  });

  if (app.book.get('pages').length > 0) {
    app.book.set({
      current_page: app.book.get('pages').at(0),
      current_index: 0, 
    });
  }

});
