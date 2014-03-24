(function ($, undefined) {

    // Contains all the buttons
    var buttons = [
        { label: 'MR' },
        { label: 'MS' },
        { label: 'MC' },
        { label: 'Clear', classname: 'dw-calculator-clear dw-calculator-clearfix', action: 'clear' },
        { label: 'CE', action: 'clearEntry' },
        { label: '*', classname: 'dw-calculator-multiply', action: 'operator' },
        { label: 7, classname: 'dw-calculator-clearfix', action: 'number' },
        { label: 8, action: 'number' },
        { label: 9, action: 'number' },
        { label: '+', classname: 'dw-calculator-plus', action: 'operator' },
        { label: 4, classname: 'dw-calculator-clearfix', action: 'number' },
        { label: 5, action: 'number' },
        { label: 6, action: 'number' },
        { label: '-', classname: 'dw-calculator-minus', action: 'operator' },
        { label: 1, classname: 'dw-calculator-clearfix', action: 'number' },
        { label: 2, action: 'number' },
        { label: 3, action: 'number' },
        { label: '/', classname: 'dw-calculator-divide', action: 'operator' },
        { label: 0, classname: 'dw-calculator-clearfix dw-calculator-wide', action: 'number' },
        { label: '.', classname: 'dw-calculator-dot', action: 'dot' },
        { label: '=', classname: 'dw-calculator-equals', action: 'equals' }
    ];

    // Defines the widget
    $.widget('ss.calculator', {

        version: '0.0.1',

        // configurable options
        options: {
            buttons: buttons,
            show: false,
            hide: false,
            showOnCreate: true
        },

        // Calls at the time of creation
        _create : function() {
            this.element.addClass('ss-calculator');
            this._createWrapper();
            this._createButtons();
            this._renderMarkup();
        },

        // Creates the wrapper
        _createWrapper: function() {
            var el = $('<div/>'), display;
            this.shell = el.clone().addClass('ss-calculator-shell');
            display = el.clone().addClass('ss-calculator-display').appendTo(this.shell);
            el.clone().addClass('ss-calculator-calculation').appendTo(display);
            el.clone().addClass('ss-calculator-result').appendTo(display);
            if(!this.options.showOnCreate) {
                this._hide(this.element, this.options.hide)
            }
        },

        // loads the buttons
        _createButtons: function() {
            var el = $('<button/>'), container = $('<div/>').addClass('ui-helper-clearfix'), widget = this, i;

            // iterates on the buttons array
            $.each(this.options.buttons, function(i, button) {
                if(widget._trigger('beforeAddButtons', null, button)) {
                    var btn = el.clone().text(button.label).appendTo(container).button();
                    if(!!button.classname) {
                        btn.addClass(button.classname);
                    }
                }
            });

            // updates shell
            container.appendTo(this.shell);
        },

        // Joins everything together
        _renderMarkup: function() {
            this.shell.appendTo(this.element);
        },

        _setOptions: function(options) {
            this._superApply(arguments);
        },

        _setOption: function(key, val) {
            this._super(key, val);

            if(key === 'buttons') {
                this.shell.find('button').remove();
                this._createButtons;
                this._renderMarkup;
            }
            else if(key === 'disable') {
                this.shell.find('button').button('option', key, val);
            }
        }, 

        show: function() {
            this._show(this.element, this.options.show);
        }

    });

}(jQuery));
