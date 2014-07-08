puremvc.define({
        name: 'riddellmvc.model.proxy.RiddellBookProxy',
        parent: puremvc.Proxy
    },

    // INSTANCE MEMBERS
    {
        meiDoc: null, //will hold the MEI Document; first as an XML Doc, later as an MEIDoc abstraction
        pages: [],

        onRegister: function() {
            this.loadDocument();
            this.initPages();
        },

        loadDocument: function() {
            //TODO: laod MEI document from a file
            //this.meiDoc = ...
        },

        initPages: function() {
            this.pages.push( { pageId: '15', img: 'img/riddell/Ca9-d_22_015.jpg' } );
            this.pages.push( { pageId: '16', img: 'img/riddell/Ca9-d_22_016.jpg' } );
            this.pages.push( { pageId: '17', img: 'img/riddell/Ca9-d_22_017.jpg' } );
            this.pages.push( { pageId: '18', img: 'img/riddell/Ca9-d_22_018.jpg' } );
            this.pages.push( { pageId: '19', img: 'img/riddell/Ca9-d_22_019.jpg' } );
            this.pages.push( { pageId: '20', img: 'img/riddell/Ca9-d_22_020.jpg' } );
            this.current_page = 0;
            this.sendNotification( riddellmvc.AppConstants.PAGES_LOADED, this.pages );
            this.sendNotification( riddellmvc.AppConstants.PAGE_TURNED, this.current_page );
        },

        /**
         * Go to the next page
         * @private
         */
        nextPage: function() {
            if ( this.current_page < this.pages.length - 1 ) {
                this.current_page += 1;
            }
            return this.current_page;
        },

        /**
         * Go to the previous page
         * @private
         */
        prevPage: function() {
            if ( this.current_page > 0 ) {
                this.current_page -= 1;
            }
            return this.current_page;
        },

        /**
         * Go to the given page
         * @private
         */
        jumpToPage: function( pageNo ) {
            if ( 0 <= pageNo && pageNo < this.pages.length) {
                this.current_page = pageNo;
            }
            return this.current_page;
        },

        /**
         * Perform page turn
         */
        turnPage: function( gotoPage ) {
            if ( typeof gotoPage == "number" ) {
                this.jumpToPage( gotoPage );
                console.log( 'jump to page ' + gotoPage.toString() );
            } else if ( gotoPage === riddellmvc.AppConstants.NEXT_PAGE ) {
                this.nextPage();
                console.log( 'go to next page' );
            } else if ( gotoPage === riddellmvc.AppConstants.PREV_PAGE ) {
                this.prevPage();
                console.log( 'go to previous page' );
            } else {
                console.log( "[RiddellBookProxy] WARNING: Can't go to page '" + gotoPage.toString() + "'" );
            }
            console.log( this.pages[this.current_page] );
            this.sendNotification( riddellmvc.AppConstants.PAGE_TURNED, this.current_page )
        },

        /**
         * Get a list of all pages in the book
         */
        getPages: function() {
            return this.pages;
        },

        /**
         * Get the zones on a given page
         */
        getPageZones: function() {
            return [];
        },

        /**
         * Get the zones of a given tune
         */
        getTuneZones: function(tune_n) {
            return [];
        },

        /**
         * etc.
         */
        getWhatever: function() {
            return [];
         },

        getUuid: function() {
            var i, random, uuid = '';

            for ( i = 0; i < 32; i++ ) {
                random = Math.random() * 16 | 0;
                if ( i === 8 || i === 12 || i === 16 || i === 20 ) {
                    uuid += '-';
                }
                uuid += ( i === 12 ? 4 : (i === 16 ? ( random & 3 | 8 ) : random) ).toString( 16 );
            }
            return uuid;
        }
    },

    // CLASS MEMBERS
    {
        NAME: 'RiddellBookProxy'

    }
);
