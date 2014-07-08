puremvc.define({
        name: 'riddell.view.mediator.RiddellViewerMediator',
        parent: puremvc.Mediator
    },
 
    // INSTANCE MEMBERS
    {
        // Notifications this mediator is interested in 
        listNotificationInterests: function() {
            return [ riddellmvc.AppConstants.PAGE_TURNED, riddellmvc.AppConstants.PAGES_LOADED ];
        },
        
        // Code to be executed when the Mediator instance is registered with the View
        onRegister: function() {
            this.setViewComponent( new riddellmvc.view.component.RiddellViewer );
            this.viewComponent.addEventListener( riddellmvc.view.event.AppEvents.PAGETURN, this );
        },
        
        // Handle events from the view component
        handleEvent: function ( event ) {            
            switch( event.type ) {
                case riddellmvc.view.event.AppEvents.PAGETURN:
                    this.sendNotification( riddellmvc.AppConstants.PAGETURN_ACTION, event.gotoPage );
                    break; 
             }
            
        },
 
        // Handle notifications from other PureMVC actors
        handleNotification: function( note ) {
            switch ( note.getName() ) {
                case riddellmvc.AppConstants.PAGE_TURNED:
                    this.viewComponent.updateCurrentPage( note.getBody() );
                    break;
                case riddellmvc.AppConstants.PAGES_LOADED:
                    this.viewComponent.updatePages( note.getBody() );
                    break;
            }
        },
    },
 
    // STATIC MEMBERS
    {
        NAME: 'RiddellViewerMediator'
    }    
);
