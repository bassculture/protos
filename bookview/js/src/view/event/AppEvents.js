puremvc.define({ name: 'riddellmvc.view.event.AppEvents' }, {},               
    // STATIC MEMBERS   
    {   
        // Event name constants
        PAGETURN:           'pageturn',
        TOGGLE_COMMENTARY:  'toggle_commentary',
        TOGGLE_SIDEBAR:     'toggle_sidebar',
        
        // Create event (cross-browser)
        createEvent: function( eventName ) {
            var event;
            if( document.createEvent ) {
               event = document.createEvent( 'Events' );
               event.initEvent( eventName, false, false );
            } else if ( document.createEventObject ) {
               event = document.createEventObject();
            }
            return event;
        },
        
        // Add event listener (cross-browser)
        addEventListener: function( object, type, listener, useCapture ) {               
            if ( object.addEventListener ) {
               object.addEventListener( type, listener, useCapture );
            } else if ( object.attachEvent ) {
               object.attachEvent( type, listener );
            }
        },
               
        // Dispatch event (cross-browser)
        dispatchEvent: function( object, event ) {
            if ( object.dispatchEvent ) {
               object.dispatchEvent( event );
            } else if ( object.fireEvent ) {
               object.fireEvent( event.type, event );
            }
        },
    }
);
