define('components/videoList', [
        'antie/widgets/component',
        'antie/widgets/carousel',
        'antie/widgets/carousel/strips/cullingstrip',
        'antie/widgets/carousel/binder',
        'antie/widgets/carousel/keyhandlers/activatefirsthandler',
        'antie/datasource',
        'antie/runtimecontext',
        'formatters/tmdb',
        'datasources/tmdb'      
    ], function (
        Component,
        Carousel,
        CullingStrip,
        Binder,
        ActivateFirstHandler,
        DataSource,
        RuntimeContext,
        tmDBFormatter,
        tmDBFeed,
    ) {
        'use strict';
    
        var app = RuntimeContext.getCurrentApplication(),
            device = RuntimeContext.getDevice();
           

        // All components extend Component
        return Component.extend({
            init: function () {
                this._super("video-list");

                // component events
            this._onLoad && this.addEventListener('load', this._onLoad.bind(this));
            this._onBeforeRender && this.addEventListener('beforerender', this._onBeforeRender.bind(this));
            this._onBeforeShow && this.addEventListener('beforeshow', this._onBeforeShow.bind(this));
            this._onAfterShow && this.addEventListener('aftershow', this._onAfterShow.bind(this));
            this._onBeforeHide && this.addEventListener('beforehide', this._onBeforeHide.bind(this));
            this._onAfterHide && this.addEventListener('afterhide', this._onAfterHide.bind(this));
             
                // bound removable listener
                this._onDataBound = this._onDataBound.bind(this);
                this._onCarouselSelectBound = this._onCarouselSelect.bind(this);
            },

            _onLoad: function (evt) {
                // create widgets
                var carousel = new Carousel('horizontal-video-carrousel', Carousel.orientations.HORIZONTAL),
                    handler = new ActivateFirstHandler(),
                    ds = new DataSource(null, new tmDBFeed(), 'loadData'),
                    formatter = new tmDBFormatter(),
                    binder = new Binder(formatter, ds);

                evt.stopPropagation();

                // configure widgets     
                handler.setAnimationOptions({
                    skipAnim: false
                });
                handler.attach(carousel);

                carousel.setWidgetStrip(CullingStrip);
                carousel.setNormalisedAlignPoint(0);
                carousel.setNormalisedWidgetAlignPoint(0);
                carousel.autoCalculate(true);
           

                this.appendChildWidget(carousel);

              
                // expose widgets adding them ot the instance context.
                this._carousel = carousel;
                this._binder = binder;
            },           
            // Appending widgets on beforerender ensures they're still displayed
            // if the component is hidden and subsequently reinstated.
            _onBeforeRender: function (evt) {
                evt.stopPropagation();

                this._carousel.addEventListener('databound', this._onDataBound);
                this._carousel.addEventListener('select', this._onCarouselSelectBound);

                // init the append of the carousel child widgets
                this._binder.appendAllTo(this._carousel);

            },

            _onAfterShow: function (evt) {
                evt.stopPropagation();

                this.getCurrentApplication().ready();
            },

            _onBeforeHide: function (evt) {
                evt.stopPropagation();

                this._carousel.removeEventListener('databound', this._onDataBound);
            },


            _onDataBound: function () {
                this._carousel.setWidgetLengths(264);
                this._carousel.recalculate();
                this._carousel.alignToIndex(0);
                this._carousel.setActiveChildIndex(0);
                this._carousel.getChildWidgets()[0].focus();
            },

            _onCarouselSelect: function (evt) {
                this.parentWidget.pushComponent('components/detail',evt.target.getDataItem());
            }
        });
    }
);
