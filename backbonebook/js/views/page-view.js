/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
  'use strict';

  // Page View
  // --------------

  // The DOM element for a page ...
  app.PageView = Backbone.View.extend({
    //... is a div
    el:  '#page-view',

    className: 'page-view',

    template: _.template($('#img-template').html()),

    // The DOM events specific to an item.
    events: {
      // 'click': 'onClick',
    },

    onClick: function () {
      console.log('click');
    },

    initialize: function () {

      var params = arguments[0];
      if (params) {
        this.size_mode = params.size_mode || app.Constants.PageSizeMode.FILL;
        this.zoom_mode = params.zoom_mode || app.Constants.ZoomMode.CONTENT;
      }


      // adding listeners to other objects than this.el doesn't seem to work with
      // this.events. [ TODO: try it in an isolated test? ]
      // Instead, we can add the listeners directly:

      var img = this.$('img').get(0);
      // img.pageview = this;

      this.imgLoadListener = (function (obj) {
        var listener = {
          view: obj, 
          handleEvent: function (event) {
            if (this.view && this.view.resize) {}
            this.view.resize();
          },
        }
        return listener;
      })(this);


      this.imgLoadListener = this.createListener(this.resize);
      this.windowResizeListener = this.createListener(this.resize);

      app.addEventListener(this.$('img').get(0), 'load', this.imgLoadListener);
      app.addEventListener(window, 'resize', this.windowResizeListener);
      
    },

    createListener: function(handler) {
      var me = this;
      var listener = {
        view: me,
        handler: handler,
        handleEvent: function (event) {
          if (this.view){
            this.handler.apply(this.view, event);
          }
        },
      }
      return listener;
    },

    windowResizeListener: function (event) {
      // `this` now is the window object.
      this.pageview.resize();
    },

    // 
    render: function () {

      // TODO: make sure the template receives
      // parameters correctly.
      if (this.model) {
        var img = this.$('img');
        this.$('img').attr('src', this.model.get('img'));
      }
      // this.resize();
      return this;

    },

    resize: function () {

      // TODO: resize image box, image and annot zones
      this.resizeImgBox();
      this.resizeImage();

    },

    resizeImgBox: function() {
      if (this.size_mode === app.Constants.PageSizeMode.FILL) {
        this.$('.img-box').css({
          height: "100%",
          width: "100%",
        });
      } else if(this.size_mode === app.Constants.PageSizeMode.FIT) {

      }
    },

    contentArea: function() {
      var i, I, ulx_min, uly_min, lrx_max, lry_max, 
        ulx, uly, lrx, lry, zones,
        page = this.model;

      if (page) {
        zones = page.get('zones');
        for (i = 0, I = (!zones ? 0 : zones.length); i < I; ++i) {
          if (i===0) {
            ulx_min = Number($(zones[i]).attr('ulx'));
            uly_min = Number($(zones[i]).attr('uly'));
            lrx_max = Number($(zones[i]).attr('lrx'));
            lry_max = Number($(zones[i]).attr('lry'));
          } else {
            ulx_min = Math.min( ulx_min, Number($(zones[i]).attr('ulx')) );
            uly_min = Math.min( uly_min, Number($(zones[i]).attr('uly')) );
            lrx_max = Math.max( lrx_max, Number($(zones[i]).attr('lrx')) );
            lry_max = Math.max( lry_max, Number($(zones[i]).attr('lry')) );
          }
        }
        ulx_min *= page.get('facs_scale');
        uly_min *= page.get('facs_scale');
        lrx_max *= page.get('facs_scale');
        lry_max *= page.get('facs_scale');
      }
      return { ulx: ulx_min, uly: uly_min, lrx: lrx_max, lry: lry_max };
    },

    resizeImage: function() {
      if (this.$('img').length > 0) {
        var $img, img, area, content_w, content_h, rat_h, rat_w, 
        box_w, box_h, img_w, img_h, zoom_w, zoom_h, offset_x, offset_y,
        scale;

        $img = this.$('img');
        img = $img.get(0);

        offset_x = 0;
        offset_y = 0;

        // calculate the content area width and length by combining zones
        if (this.zoom_mode === app.Constants.ZoomMode.NONE) {
          content_w = img.naturalWidth;
          content_h = img.naturalHeight;
        } else if (this.zoom_mode === app.Constants.ZoomMode.CONTENT) {
          area = this.contentArea();
          content_w = area.lrx - area.ulx;
          content_h = area.lry - area.uly;
          if (isNaN(content_w)) content_w = img.naturalWidth;
          if (isNaN(content_h)) content_h = img.naturalHeight;
        }

        // resize image so that content area fits in imgBox best
        box_w = this.$('.img-box').width();
        box_h = this.$('.img-box').height();
        rat_w = box_w / content_w;
        rat_h = box_h / content_h;

        if (rat_w >= rat_h) {
          scale = rat_w;
        } else {
          scale = rat_h;
        }
        
        if (this.zoom_mode === app.Constants.ZoomMode.CONTENT) {
          offset_x = -area.ulx * scale;
          offset_y = -area.uly * scale;
        }

        img_w = img.naturalWidth * scale;
        img_h = img.naturalHeight * scale;
        zoom_w = content_w * scale;
        zoom_h = content_h * scale;
        $img.css('width',  img_w);
        $img.css('height', img_h);
        $img.css( { left : offset_x, top : offset_y, position: 'absolute' } );
        this.$('.zoom-box').css('width',  zoom_w);
        this.$('.zoom-box').css('height', zoom_h);

        this.updateAnnotZones();                
      }
    },

    updateAnnotZones: function () {
      // TODO
    },


  });
})(jQuery);
