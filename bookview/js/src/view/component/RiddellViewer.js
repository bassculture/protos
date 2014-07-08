puremvc.define({
        name: 'riddellmvc.view.component.RiddellViewer',
        constructor: function(event) {
            // data
            this.pages = [];

            // Fixed DOM elements managed by this view component
            this.bookviewApp        = document.querySelector( '#bookview-app' );
            this.main               = this.bookviewApp.querySelector( '#main' );
            this.imgBox             = this.bookviewApp.querySelector( '#img-box' );
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

            updateCurrentPage: function(current_index) {
                $(this.imgLandscape).attr('src', this.pages[current_index].img);
                this.updatePageNo(current_index);
            },

            updatePageNo: function(current_index) {
                var current_pageno = current_index + 1;
                $(this.pageNo).html(current_pageno.toString() + '/' + this.pages.length.toString());
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
