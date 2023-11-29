/**
 * Demonstrates usage of a card layout.
 */
Ext.define('wizzardApp.view.card.Fields', {
    extend: 'Ext.form.FieldSet',
    requires: [
        'Ext.panel.Panel',
        //'wizzardApp.view.wizzard.WizzardController',
    ],
    alias: 'card.fields',
    xtype: 'fields',
    layout: 'anchor',
    width: 500,
    height: 400,
    flex: 1,
   
    _next: 2,
    
    bodyPadding: 15,
    title: 'Fill data',
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
        this.items = [
            {
                reference: 'field1',
                xtype: 'textfield',
                fieldLabel: 'Text',
                name: 'text',
                id: 'text',
                // listeners: {
                //     change: 'onChange',
                //     eOpt: { name: 'text'},
                //     scope: 'controller'
                // },
            }, {
                reference: 'field2',
                xtype: 'numberfield',
                fieldLabel: 'Number',
                name: 'number',
                id: 'number',
                // listeners: {
                //     change: 'onChange',
                //     eOpt: { name: 'number'},
                //     scope: 'controller'
                // },
            }, {
                reference: 'field3',
                xtype: 'combobox',
                fieldLabel: 'Currency',
                name: 'currency',
                id: 'currency',
                forceSelection: true,
                store: ['EUR', 'CHF', 'USD'],
                // listeners: {
                //     change: 'onChange',
                //     eOpt: { name: 'currency'},
                //     scope: 'controller'
                // },
            }
        ],

            // Call the parent function as well. NB: After this, items won't be
            // a simple array anymore - it gets changed into a collection of
            // components.
            this.callParent(arguments);
    },
});