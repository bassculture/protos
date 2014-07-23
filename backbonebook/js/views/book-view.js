/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
  'use strict';

  // Book View
  // --------------

  // The DOM element for a page ...
  app.BookView = Backbone.View.extend({
    //... is a div
    el:  '#book-view',

    className: 'book-view',

    // The PageView listens for changes to its model, re-rendering.
    initialize: function () {
      this.listenTo(this.model, 'change:current_page', this.render);
      if (arguments[0]) {
        this.size_mode = arguments[0].size_mode || app.Constants.PageSizeMode.FILL;
        this.zoom_mode = arguments[0].zoom_mode || app.Constants.ZoomMode.CONTENT;
      }
      this.pageview = new app.PageView({ 
        model: this.model.get('current_page'),
        size_mode: this.size_mode,
        zoom_mode: this.zoom_mode,
      });
    },

    render: function () {
      console.log('render book view');
      this.pageview.model = this.model.get('current_page');
      this.pageview.render();
      // this.$el.html(this.pageview.render().el);
      return this;
    },

    resize: function () {

      // TODO: resize book-view according to settings

    },

  });
})(jQuery);
