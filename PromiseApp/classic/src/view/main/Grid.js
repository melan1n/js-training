Ext.define('PromiseApp.view.main.Grid', {
    extend: 'Ext.grid.Panel',
    xtype: 'gridform',
    model: 'Simpson',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
    ],

    controller: 'main',
    floating: true,
    draggable: true,
    width: 500,
    height: 400,
    title: 'Select items from grid',
    renderTo: Ext.getBody(),

    title: 'My grid',
    //storeId: 'simpsonsStore',
    store: Ext.data.StoreManager.lookup('simpsonsStore'),
    renderTo: Ext.getBody(),

    columns: [
        { text: 'Name', dataIndex: 'name' },
        { text: 'Email', dataIndex: 'email', flex: 1 },
        { text: 'Phone', dataIndex: 'phone' }
    ],

    bbar: {
        xtype: 'button',
        text: 'Next',
        margin: "10 10 10 10",
        listeners: {
            //click: 'onNext',

        }
    }

});