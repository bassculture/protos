var app = app || {};

(function () {
  'use strict';

  // Page Model
  // ----------

  app.Page = Backbone.Model.extend({
    defaults: {
      n: null,
      label: null,
      img: null,
      facs_scale: null,
      zones: [],
      size_mode: null,
    },

    initialize: function () {
      this.size_mode = this.size_mode || app.Constants.PageSizeMode.FILL;
    },
  });
})();
