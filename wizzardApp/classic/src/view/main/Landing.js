Ext.define('wizzardApp.view.main.Landing', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.plugin.Viewport',
        //'Ext.window.MessageBox',

        'wizzardApp.view.main.LandingController',
        //'wizzardApp.view.main.List',
        //'Ext.layout.container.Card'
    ],
    
    xtype: 'landing',
    layout: 'hbox',
    width: 500,
    height: 400,
    margin: "10 0 0 0",

    controller: 'landing',

    bodyPadding: 15,
    title: 'Landing Title',
    closable: false,
    autoShow: true,
    defaults: {
        border: false
    },

    defaultListenerScope: true,

    items: [{
        xtype: 'button',
        reference: 'button1',
        text: 'Wizzard 1&2',
        flex: 1,
        margin: "10 10 10 0",
        config: {
            // items: [{ 
            //     xtype: 'options',
            //     _next: 1 
            // }, { 
            //     xtype: 'fields',
            //     _next: 2
            // } ]
        },
        listeners: {
            //click: 'onClick',
            click: 'onButton1Click',
            scope: 'controller',
        }
    }, {
        xtype: 'button',
        reference: 'button2',
        text: 'Wizzard 3',
        flex: 1,
        margin: "10 0 10 10",
        config: {
            // items: [
            //     { xtype: 'summary' }
            // ]
        },
        listeners: {
            click: 'onClick',
            click: 'onButton2Click',
            scope: 'controller',
        }
    }],
    

    // showNext: function () {
    //     this.doCardNavigation(1);
    // },

    // showPrevious: function (btn) {
    //     this.doCardNavigation(-1);
    // },

    // doCardNavigation: function (incr) {
    //     var me = this;
    //     var l = me.getLayout();
    //     var i = l.activeItem.id.split('card-')[1];
    //     var next = parseInt(i, 10) + incr;
    //     l.setActiveItem(next);

    //     me.down('#card-prev').setDisabled(next===0);
    //     me.down('#card-next').setDisabled(next===2);
    // }

});