puremvc.define({
        name: 'riddellmvc.controller.command.PrepModelCommand',
        parent: puremvc.SimpleCommand
    },
  
    // INSTANCE MEMBERS
    {
        /** 
         * Register Proxies with the Model
         * @override
         */
        execute: function (note) {
            this.facade.registerProxy( new riddellmvc.model.proxy.RiddellBookProxy() );
        }
    }    
);
