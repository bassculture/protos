puremvc.define({
        name: 'bookviewmvc.view.mediator.PageViewMediator',
        parent: puremvc.Mediator,
        constructor: function( params ) {
            this.params = params;
        }
    },
 
    // INSTANCE MEMBERS
    {
        // Notifications this mediator is interested in 
        listNotificationInterests: function() {
            return [ bookviewmvc.AppConstants.PAGE_TURNED, bookviewmvc.AppConstants.PAGES_LOADED ];
        },
        
        // Code to be executed when the Mediator instance is registered with the View
        onRegister: function() {
            this.setViewComponent( new bookviewmvc.view.component.PageView( this.params ) );
            this.viewComponent.addEventListener( bookviewmvc.view.event.AppEvents.PAGETURN, this );
        },
        
        // Handle events from the view component
        handleEvent: function ( event ) {            
            switch( event.type ) {
                case bookviewmvc.view.event.AppEvents.PAGETURN:
                    this.sendNotification( bookviewmvc.AppConstants.PAGETURN_ACTION, event.gotoPage );
                    break; 
             }
        },
 
        // Handle notifications from other PureMVC actors
        handleNotification: function( note ) {
            switch ( note.getName() ) {
                case bookviewmvc.AppConstants.PAGE_TURNED:
                    this.viewComponent.update( note.getBody() );
                    break;
            }
        },
    },
 
    // STATIC MEMBERS
    {
        NAME: 'PageViewMediator'
    }    
);
