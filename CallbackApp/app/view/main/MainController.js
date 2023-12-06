/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('CallbackApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',
    
    //callback
    onStartClick: function startWithCallback() {
        printResWithCallback(printCallback);
    },
});

function printCallback(err, data) {
    console.log(data);
};

function printResWithCallback(dataDeliveryCallback) {
    openForm('CallbackApp.view.main.NameForm', (err, name) => {
        openForm('CallbackApp.view.main.AgeForm', (err, age) => {
            dataDeliveryCallback(null, {
                data: {
                    name: name,
                    age: age
                }
            })
        })
    })
};

function openForm(type, valueDeliveryCallback) {
    const form = Ext.create(type);
    form.show();
    let val = '';
    const button = form.down('button');
    button.on('click', () => {
        if (type === 'CallbackApp.view.main.NameForm') {
            val = form.lookupReference('text').getValue();
        } else {
            val = form.lookupReference('number').getValue();
        }
        form.close();
        valueDeliveryCallback(null, val);
    })   
    
};

