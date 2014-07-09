puremvc.define({
        name: 'riddellmvc.view.component.RiddellViewer',
        constructor: function(event) {
            // data
            this.pages = [];
            this.current_index;

            // Fixed DOM elements managed by this view component
            this.bookviewApp        = document.querySelector( '#bookview-app' );
            this.main               = this.bookviewApp.querySelector( '#main' );
            this.imgBox             = this.bookviewApp.querySelector( '.img-box' );
            this.header             = this.bookviewApp.querySelector( '#header' );
            this.pageturnPrev       = this.bookviewApp.querySelector( '#pageturn-prev' );
            this.pageturnNext       = this.bookviewApp.querySelector( '#pageturn-next' );
            this.pageNo             = this.bookviewApp.querySelector( '#pagenumber' );
            this.imgLandscape       = this.bookviewApp.querySelector( 'img#landscape' );
            this.sidebar            = this.bookviewApp.querySelector( '#sidebar' );
            this.floatingbox        = this.bookviewApp.querySelector( '#floatingbox' );
            this.thumbnails         = this.bookviewApp.querySelector( '#thumbnails' );

            // Event listeners for fixed UI elements
            this.bookviewApp.component = this;
            riddellmvc.view.event.AppEvents.addEventListener( this.bookviewApp, 'click', function( event ) {
                    this.component.onClick( event );
            });

            this.pageturnPrev.component = this;
            riddellmvc.view.event.AppEvents.addEventListener( this.pageturnPrev, 'click', function( event ) {
                    this.component.dispatchPageTurn( riddellmvc.AppConstants.PREV_PAGE );
            });

            this.pageturnNext.component = this;
            riddellmvc.view.event.AppEvents.addEventListener( this.pageturnNext, 'click', function( event ) {
                    this.component.dispatchPageTurn( riddellmvc.AppConstants.NEXT_PAGE );
            });

            window.component = this;
            riddellmvc.view.event.AppEvents.addEventListener( window, 'resize', function( event ) {
                    this.component.onResizeWindow( event );
            });
        }
    },

    // INSTANCE MEMBERS
    {

            onResizeWindow: function(event) {
                var rat_h = window.innerHeight / $(this.imgLandscape).height();
                var rat_w = window.innerWidth / $(this.imgLandscape).width();
                if (rat_w >= rat_h) {
                  $(this.imgLandscape).css('width', "100%");
                  $(this.imgLandscape).css('height', "auto");
                } else {
                  $(this.imgLandscape).css('width', "auto");
                  $(this.imgLandscape).css('height', "100%");
                }
                this.updateAnnotZones();
            },

            onClick: function(event) {
                console.log('onClick');
                // if (event.clientX > window.outerWidth/3.0) {
                //   $(this.floatingbox).toggle();
                // } else {
                //   $(this.sidebar).toggle();
                // }
            },

            addEventListener: function(type, listener, useCapture) {
                riddellmvc.view.event.AppEvents.addEventListener ( this.bookviewApp, type, listener, useCapture );
            },

            createEvent: function(eventName) {
               return riddellmvc.view.event.AppEvents.createEvent( eventName );
            },

            dispatchPageTurn: function(gotoPage) {
                console.log('dispatchPageTurn');
                var pageturnEvent = this.createEvent( riddellmvc.view.event.AppEvents.PAGETURN );
                pageturnEvent.gotoPage = gotoPage;
                this.dispatchEvent( pageturnEvent );
            },

            dispatchEvent: function(event) {
               riddellmvc.view.event.AppEvents.dispatchEvent( this.bookviewApp, event );
            },

            updateAnnotZones: function() {
                // Update zone dimensions and positions
                var page = this.pages[this.current_index], 
                    annot_divs, annot_div,
                    zone_w, zone_h, zone_left, zone_top, zone_right, zone_bottom,
                    displayedImgScale;

                displayedImgScale = this.imgLandscape.width / this.imgLandscape.naturalWidth;
                
                annot_divs = $(this.imgBox).find('div.annot').hide(); 
                for (var i = 0; i < page.zones.length; ++i) {

                    zone_left = Number($(page.zones[i]).attr('ulx')) * page.imgDownScale;
                    zone_top = Number($(page.zones[i]).attr('uly')) * page.imgDownScale;
                    zone_right = Number($(page.zones[i]).attr('lrx')) * page.imgDownScale;
                    zone_bottom = Number($(page.zones[i]).attr('lry')) * page.imgDownScale;
                    zone_w = zone_right - zone_left;
                    zone_h = zone_bottom - zone_top;

                    if (i < annot_divs.length) {
                        annot_div = annot_divs[i];
                    } else {
                        annot_div = $('<div></div>').addClass('annot'); 
                        $(this.imgBox).append(annot_div);
                    }
                    $(annot_div).show();
                    $(annot_div).width(zone_w * displayedImgScale);
                    $(annot_div).height(zone_h * displayedImgScale);
                    $(annot_div).offset({left: zone_left * displayedImgScale, top: zone_top * displayedImgScale});
                }
            },

            updateCurrentPage: function(current_index) {
                var page = this.pages[current_index], 
                    annot_divs, annot_div, zone_w, zone_h,
                    zone_w, zone_h, zone_left, zone_top, zone_right, zone_bottom,
                    displayedImgScale,
                    me = this;
                $(this.imgLandscape).attr('src', page.img);
                this.updatePageNo(current_index);
                this.imgLandscape.onload = function() {
                    me.updateAnnotZones();
                }
            },

            updatePageNo: function(current_index) {
                var current_pageno = current_index + 1;
                $(this.pageNo).html(current_pageno.toString() + '/' + this.pages.length.toString());
                this.current_index = current_index;
            }, 

            updatePages: function(pages) {
                this.pages = pages;
            },

    },

    // STATIC MEMBERS
    {
        NAME: 'RiddellViewer',
    }
);
