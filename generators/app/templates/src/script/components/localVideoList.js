define('components/localVideoList', [
        'antie/widgets/component',
        'antie/widgets/carousel',
        'antie/widgets/carousel/strips/cullingstrip',
        'antie/widgets/carousel/binder',
        'antie/widgets/carousel/keyhandlers/activatefirsthandler',
        'antie/datasource',
        'antie/runtimecontext',
        'formatters/localVideo',
        'datasources/localVideo'
    ], function (
        Component,
        Carousel,
        CullingStrip,
        Binder,
        ActivateFirstHandler,
        DataSource,
        RuntimeContext,
        localVideoFormatter,
        localVideoDataSource
    ) {
        'use strict';
    
        var app = RuntimeContext.getCurrentApplication(),
            device = RuntimeContext.getDevice();
           

        // All components extend Component
        return Component.extend({
            init: function () {
                this._super("local-video-list");

                    // component events
                this._onLoad && this.addEventListener('load', this._onLoad.bind(this));
                this._onBeforeRender && this.addEventListener('beforerender', this._onBeforeRender.bind(this));
                this._onBeforeShow && this.addEventListener('beforeshow', this._onBeforeShow.bind(this));
                this._onAfterShow && this.addEventListener('aftershow', this._onAfterShow.bind(this));
                this._onBeforeHide && this.addEventListener('beforehide', this._onBeforeHide.bind(this));
                this._onAfterHide && this.addEventListener('afterhide', this._onAfterHide.bind(this));
             
                // bound removable listener
                this._onCarouselSelectBound = this._onCarouselSelect.bind(this);
            },

            _onLoad: function (evt) {
                // create widgets
                var handler = new ActivateFirstHandler(),
                    ds = new DataSource(null, new localVideoDataSource(), 'loadData'),
                    formatter = new localVideoFormatter();

                this._carousel = this.appendChildWidget(new Carousel('vertical-video-carrousel', Carousel.orientations.VERTICAL));

             
                this._binder = new Binder(formatter, ds);

                evt.stopPropagation();               

                handler.attach(this._carousel);             
            },           

            // Appending widgets on beforerender ensures they're still displayed
            // if the component is hidden and subsequently reinstated.
            _onBeforeRender: function (evt) {
                evt.stopPropagation();

                this._carousel.addEventListener('select', this._onCarouselSelectBound);

                // init the append of the carousel child widgets
                this._binder.appendAllTo(this._carousel);
            },

       

            _onBeforeHide: function (evt) {
                evt.stopPropagation();

                this._carousel.removeEventListener('databound', this._onDataBound);
            },
         

            _onCarouselSelect: function (evt) {
                var ca = evt.target.getCurrentApplication();
                var rw = ca.getRootWidget();
                var main = rw.getActiveChildWidget();
                main.show('components/media', {video:evt.target.getDataItem().url}, true);        
            }
        });
    }
);
