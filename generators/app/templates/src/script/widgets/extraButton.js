define('widgets/extraButton', [
    'antie/widgets/button',
    'antie/widgets/label',
    'widgets/fontAwesome'
], function (
    Button,
    Label,
    FontAwesome
) {
    "use strict";

    return Button.extend({
        init: function (id, opts) {
            var label, icon;
            
            this._super(id);
            
            opts = opts || {};

            label = opts.label || '';
            icon = opts.icon || '';

            this._label = this.appendChildWidget(new Label());
            this._icon = this.appendChildWidget(new FontAwesome());
            

            if (icon) {
                this._icon.setIcon(icon);
            }

            if (label) {
                this._label.setText(label);
            }
        },

        setIcon: function (icon) {
            this._icon.setIcon(icon);
        },

        setText: function (label) {
            this._label.setText(label);
        }
    })

});
