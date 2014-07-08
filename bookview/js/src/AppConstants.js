/**
 * @author Mike Britton
 *
 * @class AppConstants
 * @link https://github.com/PureMVC/puremvc-js-demo-todomvc.git
 *
 * Define the core and notification constants.
 * 
 * PureMVC JS is multi-core, meaning you may have multiple,
 * named and isolated PureMVC cores. This app only has one.
 */
puremvc.define({ name: 'riddellmvc.AppConstants' },{}, {
        // The multiton key for this app's single core
        CORE_NAME:                'RiddellMVC',
        
        // Notifications
        STARTUP:                  'startup',
        TOGGLE_COMMENTARY:        'toggle_commentary',
        TOGGLE_SIDEBAR:           'toggle_sidebar',
        
        // Notifications MODEL -> VIEW
        PAGE_TURNED:              'page_turned',
        PAGES_LOADED:              'pages_loaded', 

        // Notifications VIEW -> MODEL
        PAGETURN_ACTION:          'pageturn_action',

        NEXT_PAGE:                'next_page',
        PREV_PAGE:                'prev_page',

    }
);
