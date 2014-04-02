# README

'TheCalculator' is a simple jquery-ui plugin that lets you add a working calculator in your webpage!!

## Getting Started

Run the following commands to get the copy of the plugin

```
# clone the repo
git clone https://github.com/leosartaj/jquery.ss.calculator.git
```

### In your web page:

```html
<!-- File dependencies -->
<script src="(path)/(jquery)"></script>
<script src="(path)/(jquery-ui-core)"></script>
<script src="(path)/(jquery-ui-widget)"></script>
<script src="(path)/(jquery-ui-button)"></script>
<link rel=stylesheet href="(path)/(jquery-ui-css)">
<!-- plugin file -->
<script src="(path)/jquery.thecalculator.js"></script>
<!-- custom css -->
<link rel=stylesheet href="(path)/(your_custom_css)">
<script>
    jQuery(function($) {
        // select an empty div tag and call calculator() to initialize
        $('#div_id').calculator();
    });
</script>
```

## Configurable Options

### buttons

Buttons is an array containing all the buttons. Each element is an object containing a label, action and classname property. Label defines the button label, while action can be from the predefined 'number', 'operator'( +, -, \*, \/), 'dot'(for decimal point), 'equals'(=),  'clear'(clears everything), 'clearEntry'(clears the present entry) or action can be a custom function.

Here's an example

```javascript

    $('#calc').calculator({
        buttons: [
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
    ]});

```

## Examples

An example file can be found in example/example.html
