/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'CallbackApp.Application',

    name: 'CallbackApp',

    requires: [
        // This will automatically load all classes in the CallbackApp namespace
        // so that application classes do not need to require each other.
        'CallbackApp.*'
    ],

    // The name of the initial view to create.
    mainView: 'CallbackApp.view.main.Main'
});
