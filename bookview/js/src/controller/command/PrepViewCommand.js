puremvc.define ({
        name: 'riddellmvc.controller.command.PrepViewCommand',
        parent: puremvc.SimpleCommand
    },
 
    // INSTANCE MEMBERS
    {
        /** 
         * Register Mediators with the View
         * @override
         */
        execute: function (note) {
            this.facade.registerMediator( new riddell.view.mediator.RiddellViewerMediator() );
        }
    }     
);
