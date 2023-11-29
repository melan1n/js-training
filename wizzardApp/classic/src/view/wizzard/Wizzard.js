/**
 * Demonstrates usage of a card layout.
 */
Ext.define('wizzardApp.view.wizzard.Wizzard', {
    extend: 'Ext.panel.Panel',
    requires: [
        //'Ext.plugin.Viewport',

        'wizzardApp.view.card.Fields',
        'wizzardApp.view.card.Options',
        'wizzardApp.view.card.Summary',
        'wizzardApp.view.wizzard.WizzardController',
        'Ext.layout.container.Card'
    ],
    renderTo: Ext.getBody(),

    xtype: 'layout-card',
    layout: 'card',
    floating: true,
    draggable: true,
    width: 500,
    height: 400,

    controller: 'wizzard',
    
    bodyPadding: 15,
    title: 'Wizzard Title',
    closable: false,
    autoShow: true,
    defaults: {
        border: false
    },

    defaultListenerScope: true,

    initComponent: function () {
        // The config properties have already been transferred to the instance
        // during the class construction, prior to initComponent being called.
        // That means we can now call this.getBtnLabel()
        let self = this;
        self = this.config.items;
       
        // Call the parent function as well. NB: After this, items won't be
        // a simple array anymore - it gets changed into a collection of
        // components.
        this.callParent(arguments);
    },

    // initComponent: function () {
    //     // The config properties have already been transferred to the instance
    //     // during the class construction, prior to initComponent being called.
    //     // That means we can now call this.getBtnLabel()
    //     this.items = [
    //         {        
    //             xtype: 'options',              
    //         },
    //         {   
    //             xtype: 'fields',
    //         },
    //         {
    //             xtype: 'summary',
    //         }
    //     ],

    //         // Call the parent function as well. NB: After this, items won't be
    //         // a simple array anymore - it gets changed into a collection of
    //         // components.
    //         this.callParent(arguments);
    // },

    bbar: ['->',
        {
            itemId: 'card-prev',
            text: '&laquo; Previous',
            //handler: 'showPrevious',
            disabled: true,
            listeners: {
                click: 'showPrevious',
                scope: 'controller'
            }
        },
        {
            itemId: 'card-next',
            text: 'Next &raquo;',
            // handler: 'showNext'
            listeners: {
                click: 'showNext',
                scope: 'controller'
            }
        }
    ],
});