/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
// Ext.define('wizzardApp.view.main.Main', {
//     extend: 'Ext.tab.Panel',
//     xtype: 'app-main',

//     requires: [
//         'Ext.plugin.Viewport',
//         'Ext.window.MessageBox',

//         'wizzardApp.view.main.MainController',
//         'wizzardApp.view.main.MainModel',
//         'wizzardApp.view.main.List'
//     ],

//     controller: 'main',
//     viewModel: 'main',
//     //plugins: 'viewport',

//     ui: 'navigation',

//     tabBarHeaderPosition: 1,
//     titleRotation: 0,
//     tabRotation: 0,

//     header: {
//         layout: {
//             align: 'stretchmax'
//         },
//         title: {
//             bind: {
//                 text: '{name}'
//             },
//             flex: 0
//         },
//         iconCls: 'fa-th-list'
//     },

//     tabBar: {
//         flex: 1,
//         layout: {
//             align: 'stretch',
//             overflowHandler: 'none'
//         }
//     },

//     responsiveConfig: {
//         tall: {
//             headerPosition: 'top'
//         },
//         wide: {
//             headerPosition: 'left'
//         }
//     },

//     defaults: {
//         bodyPadding: 20,
//         tabConfig: {
//             responsiveConfig: {
//                 wide: {
//                     iconAlign: 'left',
//                     textAlign: 'left'
//                 },
//                 tall: {
//                     iconAlign: 'top',
//                     textAlign: 'center',
//                     width: 120
//                 }
//             }
//         }
//     },

//     items: [{
//         title: 'Home',
//         iconCls: 'fa-home',
//         // The following grid shares a store with the classic version's grid as well!
//         items: [{
//             xtype: 'mainlist'
//         }]
//     }, {
//         title: 'Users',
//         iconCls: 'fa-user',
//         bind: {
//             html: '{loremIpsum}'
//         }
//     }, {
//         title: 'Groups',
//         iconCls: 'fa-users',
//         bind: {
//             html: '{loremIpsum}'
//         }
//     }, {
//         title: 'Settings',
//         iconCls: 'fa-cog',
//         bind: {
//             html: '{loremIpsum}'
//         }
//     }]
// });
/**
 * Demonstrates usage of a card layout.
 */
Ext.define('wizzardApp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'wizzardApp.view.main.MainController',
        'wizzardApp.view.main.MainModel',
        //'wizzardApp.view.main.List',
        //'Ext.layout.container.Card'
    ],
    xtype: 'layout-cardmain',
    layout: 'card',
    width: 500,
    height: 400,

    controller: 'main',
    
    bodyPadding: 15,
    title: 'Wizzard Title',
    closable: false,
    autoShow: true,
    defaults: {
        border:false
    },

    defaultListenerScope: true,

    bbar: ['->',
        {
            itemId: 'card-prev',
            text: '&laquo; Previous',
            handler: 'showPrevious',
            disabled: true
        },
        {
            itemId: 'card-next',
            text: 'Next &raquo;',
            handler: 'showNext'
        }
    ],

    items: [
        {
            xtype: 'form-checkboxgroup',
            id: 'card-0',
            html: '<h2>Hi Welcome to the Demo Wizard!</h2><p>Step 1 of 3</p><p>Please click the "Next" button to continue...</p>'
        },
        {
            id: 'card-1',
            html: '<p>Step 2 of 3</p><p>Almost there.  Please click the "Next" button to continue...</p>'
        },
        {
            id: 'card-2',
            html: '<h1>Congratulations!</h1><p>Step 3 of 3 - Complete</p>'
        }
    ],

    showNext: function () {
        this.doCardNavigation(1);
    },

    showPrevious: function (btn) {
        this.doCardNavigation(-1);
    },

    doCardNavigation: function (incr) {
        var me = this;
        var l = me.getLayout();
        var i = l.activeItem.id.split('card-')[1];
        var next = parseInt(i, 10) + incr;
        l.setActiveItem(next);

        me.down('#card-prev').setDisabled(next===0);
        me.down('#card-next').setDisabled(next===2);
    }

});