Ext.define('wizzardApp.view.wizzard.WizzardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wizzard',

    // onOptionChange: function (ctrl, newValue) {
    //     const card = ctrl.up('fieldset');
    //     if (newValue) {
    //         card._next = ctrl._next;
    //     }

    //     console.info('Handled change event from WizzardController')
    // },

    showNext: function () {
        this.doCardNavigation(1);
    },

    showPrevious: function (btn) {
        this.doCardNavigation(-1);
    },

    history: null,

    doCardNavigation: function (incr) {
        const self = this;
        const view = self.getView();
        const l = view.getLayout();
        console.log(l.activeItem._next);
        let next = l.activeItem._next;
        const current = l.owner.items.indexOf(l.activeItem);

        self.history = self.history || [];

        if (incr === 1) {
            if (next === 'end') {
                view.close();
                return
            }
            if (next === 1) {
                self.setValues({ field1: 'koko', field2: 42, field3: 'USD' });
            }
            if (next === 2) {
                const summary = view.lookupReference('stepsummary');
                const values = self.getValues();
                summary.setHtml(JSON.stringify(values));
            }

            self.history.push(current);
        } else {
            next = self.history.pop();
        }

        l.setActiveItem(next);

        view.down('#card-prev').setDisabled(next === 0);
        view.down('#card-next').setDisabled(next === 'end');
    },

    // getFormData: function(card){
    //     let res = {};

    //     let textField = Ext.getCmp('text');
    //     let textVal = textField.getValue();
    //     res.text = textVal;

    //     return res;
    // },


    setValues: function (values) {
        const self = this;
        const view = this.getView();

        const field1 = view.lookupReference('field1');
        field1.setValue(values.field1);

        const field2 = view.lookupReference('field2');
        field2.setValue(values.field2);

        const field3 = view.lookupReference('field3');
        field3.setValue(values.field3);

    },

    getValues: function () {
        const self = this;
        const view = this.getView();

        const field1 = view.lookupReference('field1');
        const field2 = view.lookupReference('field2');
        const field3 = view.lookupReference('field3');

        return {
            field1: field1.getValue(),
            field2: field2.getValue(),
            field3: field3.getValue()

        }
    }
});