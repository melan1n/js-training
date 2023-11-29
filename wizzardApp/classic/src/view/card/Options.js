/**
 * Demonstrates usage of a card layout.
 */
Ext.define('wizzardApp.view.card.Options', {
    extend: 'Ext.form.FieldSet',
    requires: [
        'Ext.panel.Panel',
        'wizzardApp.view.card.OptionsController',
    ],
    alias: 'card.options',
    xtype: 'options',
    defaultType: 'radio', // each item will be a radio button
    layout: 'anchor',
    width: 500,
    height: 400,
    flex: 1,
    
    _next: 1,

    controller: 'options',
   
    bodyPadding: 15,
    title: 'Choose an option',
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
                _next: 1,
                checked: true,
                boxLabel: 'Option 1',
                name: 'option',
                inputValue: 'option1',
                listeners: {
                    change: 'onOptionChange',
                    scope: 'controller'
                },
            }, {
                _next: 2,
                boxLabel: 'Option 2',
                name: 'option',
                inputValue: 'option2',
                listeners: {
                    change: 'onOptionChange',
                    scope: 'controller'
                },
            }
        ],

            // Call the parent function as well. NB: After this, items won't be
            // a simple array anymore - it gets changed into a collection of
            // components.
            this.callParent(arguments);
    },
});