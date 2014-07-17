puremvc.define({
        name: 'bookviewmvc.controller.command.PrepControllerCommand',
        parent: puremvc.SimpleCommand
    },
  
    // INSTANCE MEMBERS
    {
        /** 
         * Register Commands with the Controller
         * @override
         */
        execute: function (note) {   
            this.facade.registerCommand( bookviewmvc.AppConstants.PAGETURN_ACTION, bookviewmvc.controller.command.PageturnCommand );
        }
    }    
);
