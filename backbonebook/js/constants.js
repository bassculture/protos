/*global $ */
/*jshint unused:false */
var app = app || {};

$(function () {
  'use strict';
  app.Constants = {

    // An quasi-arbitrary constant. It matches the downscale applied to
    // the facsimile images in order to reduce media size. It is relevant
    // when coordinates are measured in the original size dimensions.
    // (e.g. MEI zone coordinates were recorded on a full-size image)
    // Should be replaced by a function to retreive the actual image scale.
    FACSIMILE_SCALE: 0.5,

    PageSizeMode: { 
      FILL:                 'fill_container',
      FIT:                  'fit_container',
    },

    ZoomMode: {
      NONE:                 'none',
      CONTENT:              'content',
    },      
  }

});
