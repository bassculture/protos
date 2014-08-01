/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
  'use strict';

  // Embedded Book View
  // ------------------

  // The DOM element for a page ...
  app.EmbeddedBookView = Backbone.View.extend({
    //... is a div
    el:  '#book-view',


    events: {
      'click .prev-page': 'handlePrevClick',
      'click .next-page': 'handleNextClick',
    },

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

      this.windowResizeListener = this.createListener(this.resize);
      app.addEventListener(window, 'resize', this.windowResizeListener);

      // this.pageClickListener = this.createListener(this.handlePageClick);
      // app.addEventListener(this.$('.pages-view').get(0), 'click', this.pageClickListener);

      // this.prevClickListener = this.createListener(this.handlePrevClick);
      // app.addEventListener(this.$('button.prev-page').get(0), 'click', this.handlePrevClick);

      // this.nextClickListener = this.createListener(this.handleNextClick);
      // app.addEventListener(this.$('button.next-page').get(0), 'click', this.handleNextClick);

      this.resize();

    },

    handlePrevClick: function (event) {
      console.log('prev page');
      this.model.prevPage();
    },

    handleNextClick: function (event) {
      console.log('next page');
      this.model.nextPage();
    },

    handlePageClick: function (event) {
      var me = this;
      var clickarea_left = this.$('.pages-view').width() / 3;
      var clickarea_right = 2 * this.$('.pages-view').width() / 3;
      if (clickarea_left < event.clientX && event.clientX < clickarea_right) {

        // TODO: toggle .pane-west; 
        // the tricky thing is that the jquery toggle callbacks will have the .pane-west
        // as `this`, therefore we cannot resize the pages view from there.
        // Perhaps the toggling should happen in the book model, which will cause
        // the book to rerender, hiding it's .pane-west and resizing it's pages?
        // this.$('.pane-west').toggle(400, me.resize);
      }
    },

    render: function () {
      console.log('render book view');
      this.pageview.model = this.model.get('current_page');
      this.pageview.render();
      this.$('span.pagenumber').html( (this.model.get('current_index') + 1).toString() + '/' + this.model.get('pages').length);
      // this.$el.html(this.pageview.render().el);
      return this;
    },

    createListener: function(handler) {
      var me = this;
      var listener = {
        view: me,
        handler: handler,
        handleEvent: function (event) {
          if (this.view){
            this.handler.apply(this.view, [event]);
          }
        },
      }
      return listener;
    },

    paddingHorizontal: function () {
      //TODO: parse int from `20px`
      return parseInt(this.$el.css('padding-left')) + parseInt(this.$el.css('padding-right'));
    }, 

    paddingVertical: function () {
      return parseInt(this.$el.css('padding-top')) + parseInt(this.$el.css('padding-bottom'));
    },

    resize: function () {

      // TODO: resize book-view according to settings
      var $pages_view = this.$('.pages-view'),
        $pane_west = this.$('.pane-west'),
        $pane_north = this.$('.pane-north'),
        width, height, offset_x, offset_y;

      var horizontal_padding = this.paddingHorizontal();
      var vertical_padding = this.paddingVertical();
      width = this.$el.width() - $pane_west.get(0).offsetWidth;
      height = this.$el.height() - $pane_north.get(0).offsetHeight;
      offset_x = Math.max(
        $pane_west.get(0).offsetWidth + $pane_west.offset().left,
        $pane_north.offset().x
      );
      offset_y = $pane_north.get(0).offsetHeight + $pane_north.offset().top;
      // offset_y = $pane_west.position().top;
      $pages_view.css({
        width: width,
        height: height,
        left: offset_x,
        top: offset_y,
        position: 'absolute',
      });

      this.pageview.resize();

    },

  });
})(jQuery);
