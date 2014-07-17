puremvc.define({
        name: 'bookviewmvc.controller.command.PrepModelCommand',
        parent: puremvc.SimpleCommand
    },
  
    // INSTANCE MEMBERS
    {
        /** 
         * Register Proxies with the Model
         * @override
         */
        execute: function (note) {
            this.facade.registerProxy( new bookviewmvc.model.proxy.BookProxy() );
        }
    }    
);
