define('components/detail', [
    'antie/widgets/horizontallist',
    'antie/widgets/verticallist',
    'antie/widgets/label',
    'antie/widgets/image',
    'antie/events/keyevent',
    'widgets/extraButton',
    'common/util'
], function (
    HorizontalList,
    VerticalList,
    Label,
    Image,
    KeyEvent,
    ExtraButton,
    util
) {
    "use strict";

    return HorizontalList.extend({
        init: function () {
            this._super('detail');

            this._onLoad && this.addEventListener('load', this._onLoad.bind(this));
            this._onBeforeRender && this.addEventListener('beforerender', this._onBeforeRender.bind(this));
            this._onBeforeShow && this.addEventListener('beforeshow', this._onBeforeShow.bind(this));
            this._onAfterShow && this.addEventListener('aftershow', this._onAfterShow.bind(this));
            this._onBeforeHide && this.addEventListener('beforehide', this._onBeforeHide.bind(this));
            this._onAfterhide && this.addEventListener('afterhide', this._onAfterHide.bind(this));      

            this._onPlaySelectedBound = this._onPlaySelected.bind(this);  
        },

        _onLoad: function(evt){
                this._cover = this.appendChildWidget(new Image('cover', 'http://image.tmdb.org/t/p/w1280/uX7LXnsC7bZJZjn048UCOwkPXWJ.jpg?api_key=ffee2371843cd02e9064082f0f52b035', {width: 1280, height: 720}));

                this._leftSection = this.appendChildWidget(new VerticalList());
                this._poster = this._leftSection.appendChildWidget(new Image());
                this._playButton = this._leftSection.appendChildWidget(new ExtraButton('play-detail', {label:'Play', icon: 'play'}));

                this._rightSection = this.appendChildWidget(new VerticalList('description'));
                this._title = this._rightSection.appendChildWidget(new Label('title',''));
                this._description = this._rightSection.appendChildWidget(new Label());
                
                evt.stopPropagation();
        },
            
        _onBeforeRender: function (evt) {
            var args = evt.args || {},
                poster_path = args.poster_path || '',
                backdrop_path = args.backdrop_path || '',
                original_title = args.original_title || '',
                overview = args.overview || '';

            evt.stopPropagation();
            this._poster.setSrc(util.buildImgUrl(poster_path));
            this._cover.setSrc(util.buildImgUrl(backdrop_path,1280))
            this._title.setText(original_title);
            this._description.setText(overview);

            this._playButton.addEventListener('select', this._onPlaySelectedBound);
        },
    

        getCurrentState: function () {

        },


        _onPlaySelected: function (evt) {            
            // full screen player
            var ca = evt.target.getCurrentApplication();
            var rw = ca.getRootWidget();
            var main = rw.getActiveChildWidget();
            main.pushComponent('components/media', {});        
        }

       
    });

});

