define('formatters/localVideo', [
    'antie/formatter',
    'widgets/extraButton'
], function (
    Formatter,
    ExtraButton
) {
    'use strict';
   

    return Formatter.extend({
        format: function (iterator) {
            var button,
                item;

            item = iterator.next();

            button = new ExtraButton('',{label: item.label});
            button.setDataItem(item);

            button.addClass('local-video');

            return button;
        }
    });
});