/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('CallbackApp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.plugin.Viewport',
        //'Ext.window.MessageBox',

         'CallbackApp.view.main.MainController',
        // 'AsyncApp.view.main.MainModel',
        // 'AsyncApp.view.main.List'
    ],

    xtype: 'app-main',
    layout: 'hbox',
    width: 500,
    height: 400,
    margin: "10 0 0 0",    

    controller: 'main',
    bodyPadding: 15,
    title: 'Main Title',
    closable: false,
    //autoShow: true,
    // defaults: {
    //     border: false
    // },

    defaultListenerScope: true,

    items: [
        {
            xtype: 'button',
            reference: 'startbutton',
            text: 'Start',
            margin: "10 10 10 0",
            listeners: {
                click: 'onStartClick',
                scope: 'controller',
            }
        }
    ]
});
