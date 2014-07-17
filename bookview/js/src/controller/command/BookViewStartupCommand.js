puremvc.define({
        name: 'bookviewmvc.controller.command.StartupCommand',
        parent: puremvc.MacroCommand
    },

    // INSTANCE MEMBERS 
    {
        /** 
         * Add the sub-commands for this MacroCommand
         * @override
         */
        initializeMacroCommand: function () {
            this.addSubCommand( bookviewmvc.controller.command.PrepControllerCommand );
            this.addSubCommand( bookviewmvc.controller.command.PrepViewCommand );  
            this.addSubCommand( bookviewmvc.controller.command.PrepModelCommand );
        }
    }    
);
