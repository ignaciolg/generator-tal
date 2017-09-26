define('formatters/tmdb', [
    'antie/formatter',
    'antie/widgets/label',
    'antie/widgets/button',
    'antie/widgets/image',    
    'config/app.config',
    'common/util'
], function (
    Formatter,
    Label, 
    Button,
    Image,
    appConfig,
    util
) {
    'use strict';
   
    return Formatter.extend({
        format: function (iterator) {
            var imgOpts = {width: 342, height: 513}, 
                button,
                item;

            item = iterator.next();

            button = new Button("#video-" + item.id);
            button.appendChildWidget(new Image("#img-"+item.id, util.buildImgUrl(item.poster_path), imgOpts));
            button.appendChildWidget(new Label(item.title));
            button.setDataItem(item);
            button.addClass('tmdb-item')

            return button;
        }
    });
});