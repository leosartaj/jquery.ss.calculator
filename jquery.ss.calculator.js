(function ($, undefined) {

    // Contains all the buttons
    var buttons = [
        { label: 'Clear', classname: 'ss-calculator-clear ss-calculator-clearfix', action: 'clear' },
        { label: 'CE', classname: 'ss-calculator-clearentry', action: 'clearEntry' },
        { label: '*', classname: 'ss-calculator-multiply', action: 'operator' },
        { label: 7, classname: 'ss-calculator-clearfix', action: 'number' },
        { label: 8, action: 'number' },
        { label: 9, action: 'number' },
        { label: '+', classname: 'ss-calculator-plus', action: 'operator' },
        { label: 4, classname: 'ss-calculator-clearfix', action: 'number' },
        { label: 5, action: 'number' },
        { label: 6, action: 'number' },
        { label: '-', classname: 'ss-calculator-minus', action: 'operator' },
        { label: 1, classname: 'ss-calculator-clearfix', action: 'number' },
        { label: 2, action: 'number' },
        { label: 3, action: 'number' },
        { label: '/', classname: 'ss-calculator-divide', action: 'operator' },
        { label: 0, classname: 'ss-calculator-clearfix ss-calculator-wide', action: 'number' },
        { label: '.', classname: 'ss-calculator-dot', action: 'dot' },
        { label: '=', classname: 'ss-calculator-equals', action: 'equals' }
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
            this.element.addClass('ss-calculator ui-widget ui-corner-all');
            this._createWrapper();
            this._createButtons();
            this._renderMarkup();

            this._on({
                'click button': this._clickHandler
            });

            this.currentDisplay = [];
            this.display = [];
            this.numericalInput = false;
        },

        // Creates the wrapper
        _createWrapper: function() {
            var el = $('<div/>'), display;
            this.shell = el.clone().addClass('ss-calculator-shell ui-widget-header ui-corner-all');
            display = el.clone().addClass('ss-calculator-display ui-widget-content ui-corner-all').appendTo(this.shell);
            el.clone().addClass('ss-calculator-calculation').appendTo(display);
            el.clone().text('0').addClass('ss-calculator-result').appendTo(display);
            if(!this.options.showOnCreate) {
                this._hide(this.element, this.options.hide)
            }
        },

        // loads the buttons
        _createButtons: function() {
            var el = $('<button/>'), container = $('<div/>').addClass('ui-helper-clearfix ui-widget-content ui-corner-all'), widget = this, i;

            // iterates on the buttons array
            $.each(this.options.buttons, function(i, button) {
                if(widget._trigger('beforeAddButtons', null, button)) {
                    var btn = el.clone().text(button.label).appendTo(container).button();

                    if(!!button.classname) {
                        btn.addClass(button.classname);
                    }

                    if(typeof button.action === 'string') {
                        btn.data('action', button.action);
                    }
                    else if(typeof button.action === 'function') {
                        var fName = 'custom.ss.' + i; 
                        widget['_' + fName] = button.action;
                        btn.data('action', fName);
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
        },

        _clickHandler: function(e) {
            var btn = $(e.target).closest('button'), fn = btn.data('action');

            this['_' + fn](e, btn);
        },

        _clear: function(e, ui) {
            this.currentDisplay = [];
            this.display = [];
            this._updateDisplay();
            this._display();
            this.numericalInput = false;
        }, 

        _clearEntry: function(e, ui) {
            this.currentDisplay = [];
            this._updateDisplay();
        }, 

        _equals: function(e, ui) {
            this._calculate(true);
        }, 

        _operator: function(e, ui) {

            if(!this.display.length && !this.currentDisplay.length) {
                this.currentDisplay.push(this.element.find('.ss-calculator-result').text());
            }
            else if(this.currentDisplay.slice(0).reverse()[0] === '.') {
                this.currentDisplay.pop();
            }

            if(!this.display.length || this.numericalInput) {
                this.display.push([this.currentDisplay.join(''), ' ', ui.text(), ' '].join(''))
            }
            else if(!this.numericalInput) {
                var length = this.display.length, str = this.display[length - 1].replace(/[\*\/\+\-]/, ui.text());
                this.display.pop();
                this.display.push(str);
            }

            this._display();
            this.numericalInput = false;
            this._calculate();
        }, 

        _number: function(e, ui) {
            this.currentDisplay.push(ui.text());
            this._updateDisplay();
            this.numericalInput = true;
        }, 

        _dot: function(e, ui) {
            var dot = false, x = this.currentDisplay.length;

            if(!x) {
                this.currentDisplay.push('0');
            }

            while( --x) {
                if(this.currentDisplay[x] === '.') {
                    dot = true;
                    break;
                }
            }

            if(dot) {
                return false;
            }
            else {
                this.currentDisplay.push('.');
                this._updateDisplay();
            }
        },

        _updateDisplay: function(reset) {
            if(!this.currentDisplay.length) {
                this.element.find('.ss-calculator-result').text('0');
            }
            else if(this.currentDisplay.length < 18) {
                this.element.find('.ss-calculator-result').text(this.currentDisplay.join(''));
            }

            if(reset) {
                this.currentDisplay = [];
            }
        },

        _display: function() {
            this.element.find('.ss-calculator-calculation').text(this.display.join(''));
            this.currentDisplay = [];
        },

        _calculate: function(final) {
            var ops = {
                '+': function(x, y) { return x + y; },
                '-': function(x, y) { return x - y; },
                '*': function(x, y) { return x * y; },
                '/': function(x, y) { return x / y; }
            };

            function seqCalc(str) {
                var arr = str.split(' '), left = +arr[0], x, length = arr.length;

                for(x = 1; x < length; x = x + 2) {

                    left = ops[arr[x]](left, +arr[x + 1]);

                }

                return left;
            }

            if(final) {

                var display = this.element.find('.ss-calculator-calculation').text(), current = this.element.find('.ss-calculator-result').text();

                this.currentDisplay = [seqCalc([display, current].join(''))];
                this._updateDisplay();
                this.display = [];
                this._display();
                this.numericalInput = false;
            }
            else if(this.display.length > 1) {

                var tmp = this.display.pop(), trimmed = tmp.replace(/\s[\+\-\/\*]\s/, '');

                this.display.push(trimmed);
                this.currentDisplay.push(seqCalc(this.display.join('')));
                this.display.pop();
                this.display.push(tmp);
                this._updateDisplay(true);
            }
        }




    });

}(jQuery));
