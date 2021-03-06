puremvc.define({
        name: 'bookviewmvc.model.proxy.BookProxy',
        parent: puremvc.Proxy,
    },

    // INSTANCE MEMBERS
    {
        meiDoc: null, //will hold the MEI Document; first as an XML Doc, later as an MEIDoc abstraction
        pages: [],
        current_page: null,
        base_path: "img/riddell/scaled/50",

        onRegister: function() {
            if (this.data && this.data.path) {
                this.base_path = this.data.path;
            }
            this.loadDocument();
            this.initPages();
        },

        loadDocument: function() {
            if (this.data && this.data.filename) {
                var xmlDoc = loadXMLDoc(this.data.filename);
                this.meiDoc = new MeiLib.MeiDoc(xmlDoc);
            }
        },

        initPages: function() {
            if (this.meiDoc) {
                var surfaces = this.meiDoc.getSurfaces();
                for (var i=0; i<surfaces.length; ++i) {
                    var page = {};
                    page.pageId = $(surfaces[i]).attr('n');
                    page.label = $(surfaces[i]).attr('label');
                    var target = $(surfaces[i]).find('graphic').attr('target');
                    page.img = this.getPathOfTarget(target);
                    page.imgDownScale = bookviewmvc.AppConstants.IMAGE_DOWNSCALE;
                    page.zones = $(surfaces[i]).find('zone');
                    this.pages.push(page);
                }
                console.log(this.pages);
                this.current_page = 0;
                this.sendNotification( bookviewmvc.AppConstants.PAGES_LOADED, this.pages );
                this.sendNotification( bookviewmvc.AppConstants.PAGE_TURNED, { 
                    page_index: this.current_page, 
                    page: this.pages[this.current_page] 
                });
            };

        },

        getPathOfTarget: function(target) {
            var targetpath = target.replace(/http:\/\/hms\.scot\/facsimiles/, this.base_path);
            return targetpath;
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
            } else if ( gotoPage === bookviewmvc.AppConstants.NEXT_PAGE ) {
                this.nextPage();
                console.log( 'go to next page' );
            } else if ( gotoPage === bookviewmvc.AppConstants.PREV_PAGE ) {
                this.prevPage();
                console.log( 'go to previous page' );
            } else {
                console.log( "[RiddellBookProxy] WARNING: Can't go to page '" + gotoPage.toString() + "'" );
            }
            console.log( this.pages[this.current_page] );
            if (typeof this.current_page === 'number') {
                var page = this.pages[this.current_page];  
                if (page) {
                    this.sendNotification( bookviewmvc.AppConstants.PAGE_TURNED, { 
                        page_index: this.current_page, 
                        page: page, 
                    });
                }              
            }
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
        NAME: 'BookProxy'

    }
);
