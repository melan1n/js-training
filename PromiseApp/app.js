/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'PromiseApp.Application',

    name: 'PromiseApp',

    requires: [
        // This will automatically load all classes in the PromiseApp namespace
        // so that application classes do not need to require each other.
        'PromiseApp.*'
    ],

    // The name of the initial view to create.
    mainView: 'PromiseApp.view.main.Main'
});
