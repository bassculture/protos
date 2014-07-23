var app = app || {};

(function () {
  'use strict';

  // Page Model
  // ----------

  app.Book = Backbone.Model.extend({
    defaults: {
      current_index: null,
      current_page: null,
      base_path: "img/riddell/scaled/50",
      meiDoc: null,
      filename: null,
    },

    initialize: function() {
      var me = this;
      console.log(arguments);
      var params = arguments[0];
      me.set(params);

      me.set('pages', new app.Pages());

      me.loadDocument();
      if (me.has('meiDoc')) {
        var surfaces = me.get('meiDoc').getSurfaces();
        for (var i=0; i<surfaces.length; ++i) {
          var page = new app.Page();
          var target = $(surfaces[i]).find('graphic').attr('target');
          page.set({
            n: $(surfaces[i]).attr('n'), 
            label: $(surfaces[i]).attr('label'),
            img: me.getPathOfTarget(target),
            facs_scale: app.Constants.FACSIMILE_SCALE,
            zones: $(surfaces[i]).find('zone'),
          });
          me.get('pages').add(page);
        }
        console.log(me.get('pages'));
      };
    },

    getPathOfTarget: function(target) {
        var targetpath = target.replace(/http:\/\/hms\.scot\/facsimiles/, this.get('base_path'));
        return targetpath;
    },


    loadDocument: function() {
      if (this.get('filename')) {
        var xmlDoc = loadXMLDoc(this.get('filename'));
        this.set('meiDoc', new MeiLib.MeiDoc(xmlDoc));
      }
    },


  });
})();
