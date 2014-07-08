puremvc.define({
        name: 'riddellmvc.controller.command.StartupCommand',
        parent: puremvc.MacroCommand
    },

    // INSTANCE MEMBERS 
    {
        /** 
         * Add the sub-commands for this MacroCommand
         * @override
         */
        initializeMacroCommand: function () {
            this.addSubCommand( riddellmvc.controller.command.PrepControllerCommand );
            this.addSubCommand( riddellmvc.controller.command.PrepViewCommand );  
            this.addSubCommand( riddellmvc.controller.command.PrepModelCommand );
        }
    }    
);
