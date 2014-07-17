puremvc.define ({
        name: 'bookviewmvc.controller.command.PrepViewCommand',
        parent: puremvc.SimpleCommand
    },
 
    // INSTANCE MEMBERS
    {
        /** 
         * Register Mediators with the View
         * @override
         */
        execute: function (note) {
            this.facade.registerMediator( new bookviewmvc.view.mediator.PageViewMediator( note.body ) );
        }
    }     
);
