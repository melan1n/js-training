
Ext.define('CallbackApp.view.main.AgeForm', {
    extend: 'Ext.panel.Panel',
    xtype: 'ageform',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        // 'AsyncApp.view.main.MainController',
        // 'AsyncApp.view.main.MainModel',
        // 'AsyncApp.view.main.List'
    ],

    renderTo: Ext.getBody(),

    controller: 'main',
    floating: true,
    draggable: true,
    width: 500,
    height: 400,
    title: 'Fill in age',
    promise: null,
    items: [
        {
            xtype: 'numberfield',
            reference: "number",
            fieldLabel: 'Age',
            name: 'number',
            margin: "10 10 10 10",
        },
        {
            xtype: 'button',
            text: 'Next',
            margin: "10 10 10 10",
            listeners: {
                //click: 'onNext2',
                //render: 'promise'
            }
        }
    ],
});
