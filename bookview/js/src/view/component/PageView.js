puremvc.define({
        name: 'bookviewmvc.view.component.PageView',
        constructor: function( params ) {
            // data
            this.params = params || {};
            this.page;
            this.size_mode = this.params.size_mode || bookviewmvc.AppConstants.PageViewSize.FILL;
            this.zoom_mode = this.params.zoom_mode || bookviewmvc.AppConstants.ZoomMode.CONTENT;

            // Fixed DOM elements managed by this view component
            if (this.params.div) {
                this.div                = this.params.div;
                this.imgBox             = $('<div></div>').addClass('img-box').get(0);
                this.zoomBox            = $('<div></div>').addClass('zoom-box').get(0);
                this.img       = $('<img></img>').addClass('landscape').get(0);
                
                $(this.div).append(this.imgBox);
                $(this.imgBox).append(this.zoomBox);
                $(this.zoomBox).append(this.img);

                $(this.div).css({
                    height: "100%",
                    width: "100%",
                    padding: '10px',
                    border: '5px solid red',
                }).css('box-sizing', 'border-box')
                  .css('-moz-box-sizing', 'border-box')
                  .css('-webkit-box-sizing', 'border-box');


                $(this.imgBox).css({
                    padding: '10px',
                    border: '5px solid blue', 
                }).
                    css('overflow-x', 'auto').
                    css('overflow-y', 'auto').
                    css('box-sizing', 'border-box').
                    css('-moz-box-sizing', 'border-box').
                    css('-webkit-box-sizing', 'border-box');
                
                $(this.zoomBox).css({
                    position: 'relative',
                    border: '2px solid grey', 
                }).
                    css('overflow-x', 'hidden').
                    css('overflow-y', 'hidden').
                    css('box-sizing', 'border-box').
                    css('-moz-box-sizing', 'border-box').
                    css('-webkit-box-sizing', 'border-box');
                
                $(this.img).
                    css('width', '100%').
                    css('position', 'absolute').
                    css('box-sizing', 'border-box').
                    css('-moz-box-sizing', 'border-box').
                    css('-webkit-box-sizing', 'border-box');

                // Event listeners for fixed UI elements
                this.div.component = this;
                bookviewmvc.view.event.AppEvents.addEventListener( this.div, 'click', function( event ) {
                        this.component.onClick( event );
                });

                window.component = this;
                bookviewmvc.view.event.AppEvents.addEventListener( window, 'resize', function( event ) {
                        this.component.onResizeWindow( event );
                });

                this.img.component = this;
                bookviewmvc.view.event.AppEvents.addEventListener( this.img, 'load', function( event ) {
                    this.loaded = true;
                    this.component.updateAnnotZones( event );
                    this.component.resizeImgBox();
                    this.component.resizeImage();
                });
            }
        }
    },

    // INSTANCE MEMBERS
    {
            resizeImgBox: function() {
                if (this.size_mode === bookviewmvc.AppConstants.PageViewSize.FILL) {
                    $(this.imgBox).css({
                        height: "100%",
                        width: "100%",
                    });
                } else if(this.size_mode === bookviewmvc.AppConstants.PageViewSize.FIT) {
                }
            },

            contentArea: function() {
                var i, I, ulx_min, uly_min, lrx_max, lry_max, 
                    ulx, uly, lrx, lry
                    page = this.page;
                if (page) {
                    for (i = 0, I = (!page.zones ? 0 : page.zones.length); i < I; ++i) {
                        if (i===0) {
                            ulx_min = Number($(page.zones[i]).attr('ulx'));
                            uly_min = Number($(page.zones[i]).attr('uly'));
                            lrx_max = Number($(page.zones[i]).attr('lrx'));
                            lry_max = Number($(page.zones[i]).attr('lry'));
                        } else {
                            ulx_min = Math.min( ulx_min, Number($(page.zones[i]).attr('ulx')) );
                            uly_min = Math.min( uly_min, Number($(page.zones[i]).attr('uly')) );
                            lrx_max = Math.max( lrx_max, Number($(page.zones[i]).attr('lrx')) );
                            lry_max = Math.max( lry_max, Number($(page.zones[i]).attr('lry')) );
                        }
                    }
                    ulx_min *= page.imgDownScale;
                    uly_min *= page.imgDownScale;
                    lrx_max *= page.imgDownScale;
                    lry_max *= page.imgDownScale;
                }
                return { ulx: ulx_min, uly: uly_min, lrx: lrx_max, lry: lry_max };
            },

            resizeImage: function() {

                if (this.img) {
                    var area, content_w, content_h, rat_h, rat_w, 
                        box_w, bow_h, img_w, img_h, zoom_w, zoom_h, offset_x, offset_y,
                        scale;

                    offset_x = 0;
                    offset_y = 0;

                    // calculate the content area width and length by combining zones
                    if (this.zoom_mode === bookviewmvc.AppConstants.ZoomMode.NONE) {
                        content_w = this.img.naturalWidth;
                        content_h = this.img.naturalHeight;
                    } else if (this.zoom_mode === bookviewmvc.AppConstants.ZoomMode.CONTENT) {
                        area = this.contentArea();
                        content_w = area.lrx - area.ulx;
                        content_h = area.lry - area.uly;
                        if (isNaN(content_w)) content_w = this.img.naturalWidth;
                        if (isNaN(content_h)) content_h = this.img.naturalHeight;
                    }

                    // resize image so that content area fits in imgBox best
                    box_w = $(this.imgBox).width();
                    box_h = $(this.imgBox).height();
                    rat_w = box_w / content_w;
                    rat_h = box_h / content_h;

                    if (rat_w >= rat_h) {
                        scale = rat_w;
                    } else {
                        scale = rat_h;
                    }
                    
                    if (this.zoom_mode === bookviewmvc.AppConstants.ZoomMode.CONTENT) {
                        offset_x = -area.ulx * scale;
                        offset_y = -area.uly * scale;
                    }

                    img_w = this.img.naturalWidth * scale;
                    img_h = this.img.naturalHeight * scale;
                    zoom_w = content_w * scale;
                    zoom_h = content_h * scale;
                    $(this.img).css('width',  img_w);
                    $(this.img).css('height', img_h);
                    $(this.img).css( { left : offset_x, top : offset_y } );
                    $(this.zoomBox).css('width',  zoom_w);
                    $(this.zoomBox).css('height', zoom_h);

                    this.updateAnnotZones();
                }



            },

            onResizeWindow: function(event) {
                if (this.size_mode) {
                    this.resizeImgBox();
                    this.resizeImage();
                }
            },

            onClick: function(event) {
                console.log('onClick');
            },

            addEventListener: function(type, listener, useCapture) {
                if (this.div) bookviewmvc.view.event.AppEvents.addEventListener ( this.div, type, listener, useCapture );
            },

            createEvent: function(eventName) {
               return bookviewmvc.view.event.AppEvents.createEvent( eventName );
            },

            dispatchEvent: function(event) {
               if (this.div) bookviewmvc.view.event.AppEvents.dispatchEvent( this.div, event );
            },

            hideAnnotZones: function() {
                return $(this.imgBox).find('div.annot').hide();
            },

            updateAnnotZones: function() {
                // Update zone dimensions and positions
                var page = this.page, 
                    annot_divs, annot_div,
                    zone_w, zone_h, zone_left, zone_top, zone_right, zone_bottom,
                    displayedImgScale;

                annot_divs = this.hideAnnotZones(); 
                if (this.page && this.img && this.img.loaded) {
                    var i, I;
                    displayedImgScale = this.img.width / this.img.naturalWidth;
                    displayedImgPosition = $(this.img).position();
                        
                    for (i = 0, I = (!page.zones ? 0 : page.zones.length); i < I; ++i) {

                        zone_left = Number($(page.zones[i]).attr('ulx')) * page.imgDownScale;
                        zone_top = Number($(page.zones[i]).attr('uly')) * page.imgDownScale;
                        zone_right = Number($(page.zones[i]).attr('lrx')) * page.imgDownScale;
                        zone_bottom = Number($(page.zones[i]).attr('lry')) * page.imgDownScale;
                        zone_w = zone_right - zone_left;
                        zone_h = zone_bottom - zone_top;

                        if (i < annot_divs.length) {
                            annot_div = annot_divs[i];
                        } else {
                            annot_div = $('<div></div>').addClass('annot').css({ position: 'absolute' }); 
                            $(this.zoomBox).append(annot_div);
                        }
                        $(annot_div).show();
                        $(annot_div).width(zone_w * displayedImgScale);
                        $(annot_div).height(zone_h * displayedImgScale);
                        // $(annot_div).left(zone_left * displayedImgScale);
                        // $(annot_div).top(zone_top * displayedImgScale);
                        $(annot_div).css( {
                            left: zone_left * displayedImgScale + displayedImgPosition.left, 
                            top: zone_top * displayedImgScale + displayedImgPosition.top
                        });
                    }
                }

            },

            update: function( note ) {
                var me = this;
                this.page = note.page;
                this.hideAnnotZones();
                if (this.img) {
                    this.img.loaded = false;
                    $(this.img).attr('src', this.page.img);
                }
            },
    },

    // STATIC MEMBERS
    {
        NAME: 'PageView',
    }
);
