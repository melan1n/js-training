/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('PromiseApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    //async/await
    onStartClick: function () {
        startWithPromiseAsync();
    }

    // //async/await loop
    // onStartClick: function() {
    //     startWithPromiseAsync(5);
    // }

    // //promise.then
    // onStartClick: function () {
    //     startWithPromise();
    // }

    // //promise.then loop
    // onStartClick: function () {
    //     startWithPromise(5);
    // }
});

// async/await
async function startWithPromiseAsync() {
    const name = await openForm('PromiseApp.view.main.NameForm');
    const age = await openForm('PromiseApp.view.main.AgeForm');
    const arr = await openForm('Ext.grid.Panel');

    console.log(`name: ${name} age: ${age} arr: ${arr}`);
};

// // async/await loop
// async function startWithPromiseAsync(number) {
//     let res = [];
//     for (let i = 0; i < number; i++) {
//         const age =  await openForm('PromiseApp.view.main.AgeForm');
//         res.push(age);
//     }

//     console.log(`${res}`);
// };

// function startWithPromise() {    
//     openForm('PromiseApp.view.main.NameForm')
//     .then(name => {
//         openForm('PromiseApp.view.main.AgeForm').then(age => {
//             console.log({
//                 name: name,
//                 age: age
//             })
//         } )
//     })
// };

//promise.then loop
// function startWithPromise(number) {    
//     let res = [];
//     for (let i = 0; i < number; i++) {
//         openForm('PromiseApp.view.main.AgeForm').then(age => {
//             res.push(age);
//         })
//     }
//     console.log(res);
// };

function openForm(type) {
    let form = undefined;
    let button = undefined;
    //if (type === 'PromiseApp.view.main.Grid') {     
    if (type === 'Ext.grid.Panel') {
        Ext.create('Ext.data.Store', {
            storeId: 'simpsonsStore',
            fields: ['name', 'email', 'phone'],
            data: [
                { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
                { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
                { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
                { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
            ]
        });

        //form = Ext.create(type);
        form = Ext.create(type, {
            title: 'My grid',
            store: Ext.data.StoreManager.lookup('simpsonsStore'),
            renderTo: Ext.getBody(),
            selModel: {
                selType: 'checkboxmodel'
            },
            rawSelectionModel: {
                singleSelect: false
            },

            columns: [
                { text: 'Name', dataIndex: 'name' },
                { text: 'Email', dataIndex: 'email', flex: 1 },
                { text: 'Phone', dataIndex: 'phone' }
            ],
            bbar: {
                xtype: 'button',
                text: 'Next',
                margin: "10 10 10 10",
            }
        });

        button = form.down('button');
    } else {
        form = Ext.create(type);
        button = form.down('button');
    }

    let val = '';

    return new Promise((resolve, reject) => {
        button.on('click', () => {
            if (type === 'PromiseApp.view.main.NameForm') {
                val = form.lookupReference('text').getValue();
            } else if (type === 'PromiseApp.view.main.AgeForm') {
                val = form.lookupReference('number').getValue();
            } else {
                val = [];
                var items = form.getSelectionModel().selected.items;
                items.forEach(x => val.push(JSON.stringify(x.data)));
            }
            form.close();
            resolve(val);
        })
        form.show();
    });
};

