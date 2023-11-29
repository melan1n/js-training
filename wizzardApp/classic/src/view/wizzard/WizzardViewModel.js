Ext.define('wizzardApp.view.wizzard.WizzardViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.wizzardViewModel',

    data: {
        summary: {
            text: '',
            number: '',
            currency: ''
        }
    },

    formulas: {
        summaryjson: function (get) {
            let txt = this.summary.text;
            var fn = get('txt');
            return fn
        }
    }
});
