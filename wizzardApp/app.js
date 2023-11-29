/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'wizzardApp.Application',

    name: 'wizzardApp',

    requires: [
        // This will automatically load all classes in the wizzardApp namespace
        // so that application classes do not need to require each other.
        'wizzardApp.*'
    ],

    // The name of the initial view to create.
    //mainView: 'wizzardApp.view.wizzard.Wizzard'

    //alterative app launch
    launch: function() {
        //panel instead of window
        //two buttons inside
        //on click - open new window
         let panel = Ext.create('Ext.panel.Panel', {
            //layout: 'fit',
            title: 'Panel Container',
            draggable: true,
            floating: true,
            closable: false,
            width: 500,
            height: 400,
            items: {
                xtype: 'landing'
            },
            renderTo: Ext.getBody(),
        });

        console.info('--> Here the component is ready to render');
        panel.show(); //do render

        // let win = Ext.create('Ext.Window', {
        //     layout: 'fit',
        //     title: 'Window Container',
        //     closable: false,
        //     width: 500,
        //     height: 400,
        //     items: {
        //         xtype: 'landing'
        //     }
        // });

        // console.info('--> Here the component is ready to render');
        // win.show(); //do render
    }
});
