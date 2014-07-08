puremvc.define({
        name: 'riddellmvc.controller.command.PrepControllerCommand',
        parent: puremvc.SimpleCommand
    },
  
    // INSTANCE MEMBERS
    {
        /** 
         * Register Commands with the Controller
         * @override
         */
        execute: function (note) {   
            this.facade.registerCommand( riddellmvc.AppConstants.PAGETURN_ACTION, riddellmvc.controller.command.PageturnCommand );
        }
    }    
);
