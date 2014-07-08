puremvc.define({
        name: 'riddellmvc.Application',
        constructor: function() {            
            // register the startup command and trigger it.
            this.facade.registerCommand( riddellmvc.AppConstants.STARTUP, riddellmvc.controller.command.StartupCommand );
            this.facade.sendNotification( riddellmvc.AppConstants.STARTUP );
        },
    },

    // INSTANCE MEMBERS
    {
        // Define the startup notification name
        STARTUP: 'startup',
               
        // Get an instance of the PureMVC Facade. This creates the Model, View, and Controller instances.
        facade: puremvc.Facade.getInstance( riddellmvc.AppConstants.CORE_NAME )
    }
);
