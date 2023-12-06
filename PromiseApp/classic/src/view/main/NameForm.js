
Ext.define('PromiseApp.view.main.NameForm', {
    extend: 'Ext.panel.Panel',
    xtype: 'nameform',

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
    title: 'Fill in username',
    
    items: [
        {
            xtype: 'textfield',
            reference: "text",
            fieldLabel: 'Username',
            name: 'text',
            margin: "10 10 10 10",
        },
        {
            xtype: 'button',
            text: 'Next',
            margin: "10 10 10 10",
            listeners: {
                //click: 'onNext',
            }
        }
    ],
});
