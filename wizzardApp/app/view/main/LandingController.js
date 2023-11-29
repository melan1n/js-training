Ext.define('wizzardApp.view.main.LandingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.landing',

    // onOptionChange: function (ctrl, newValue) {
    //     const card = ctrl.up('fieldset');
    //     if (newValue) {
    //         card._next = ctrl._next;
    //     }
        
    //     console.info('Handled change event from WizzardController')
    // },

    // onClick: function (btn) {
    //     let self = this;
    //     let landingView = this.getView();
    //     const wizzardItems = btn.config; //Array[object]
         
    //     let container = landingView.up();
    //     container.remove(landingView) 
    
    //     let wizzard = Ext.create('wizzardApp.view.wizzard.Wizzard', {
    //         config: wizzardItems           
    //     })

    //     const l = wizzard.getLayout();
    //     l.activeItem = l.owner.items[0];
        
    //     container.add(wizzard);
    // }

    //TODO
    //Add onButton1Click:
    //Add onButton2Click and pass wizzard config in create 
    // onClick: function (btn) {
    //     const wizzardItems = btn.config; //Array[object]
         
    //     let wizzard = Ext.create('wizzardApp.view.wizzard.Wizzard', {
    //         config: wizzardItems           
    //     })
        
    //     const l = wizzard.getLayout();
    //     //TUK STANA GROZNO items.items
        
    //     l.activeItem = l.owner.items.items[0];
    //     wizzard.show();
    // }

    onButton1Click: function () {        
        let wizzard = Ext.create('wizzardApp.view.wizzard.Wizzard', {
            items: [{ 
                xtype: 'options',
                _next: 1 
            }, { 
                xtype: 'fields',
                _next: 2
            }, {
                xtype: 'summary',
                _next: 'end'
        }]           
        })
        
        const l = wizzard.getLayout();
        //TUK STANA GROZNO items.items
        
        l.activeItem = l.owner.items.items[0];
        wizzard.show();
    },

    onButton2Click: function () {        
        let wizzard = Ext.create('wizzardApp.view.wizzard.Wizzard', {
            items: [ {
                xtype: 'summary',
                _next: 'end'
        }]           
        })
        
        const l = wizzard.getLayout();
        //TUK STANA GROZNO items.items
        
        l.activeItem = l.owner.items.items[0];
        wizzard.show();
    }
});