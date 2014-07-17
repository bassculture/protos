/**
 * @class PageturnCommand
 */
puremvc.define ({
        name: 'bookviewmvc.controller.command.PageturnCommand',
        parent: puremvc.SimpleCommand
    },

    // INSTANCE MEMBERS
    {
        /** 
         * Perform business logic (in this case, based on Notification name)
         * @override
         */
        execute: function ( note ) {
            var proxy = this.facade.retrieveProxy( bookviewmvc.model.proxy.BookProxy.NAME );
            
            switch( note.getName() ) {
                case bookviewmvc.AppConstants.PAGETURN_ACTION:
                    proxy.turnPage( note.getBody() );
                    break;

                default:
                    console.log('PageturnCommand received an unsupported Notification');
                    break;
            } 
        }
    }    
);
