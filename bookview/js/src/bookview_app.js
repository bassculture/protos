puremvc.define({
        name: 'bookviewmvc.Application',
        constructor: function() {            
            // register the startup command and trigger it.
            this.facade.registerCommand( bookviewmvc.AppConstants.STARTUP, bookviewmvc.controller.command.StartupCommand );
            this.facade.sendNotification( bookviewmvc.AppConstants.STARTUP );            
        },
    },

    // INSTANCE MEMBERS
    {
        // Define the startup notification name
        STARTUP: 'startup',
               
        // Get an instance of the PureMVC Facade. This creates the Model, View, and Controller instances.
        facade: puremvc.Facade.getInstance( bookviewmvc.AppConstants.CORE_NAME )
    }
);