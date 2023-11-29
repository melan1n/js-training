/**
 * Demonstrates usage of a card layout.
 */
Ext.define('wizzardApp.view.card.Summary', {
    extend: 'Ext.form.FieldSet',
    requires: [
        'Ext.panel.Panel',
        //'wizzardApp.view.wizzard.WizzardController',
    ],
    alias: 'card.summary',
    xtype: 'summary',
    layout: 'anchor',
    width: 500,
    height: 400,
    flex: 1,
   
    _next: 'end',
    reference: 'stepsummary',
    html: "Az bqh tuk",

    bodyPadding: 15,
    title: 'Summary',
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
            {}
        ],

            // Call the parent function as well. NB: After this, items won't be
            // a simple array anymore - it gets changed into a collection of
            // components.
            this.callParent(arguments);
    },
});