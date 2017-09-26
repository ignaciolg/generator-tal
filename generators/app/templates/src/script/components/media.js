define('components/media', [
    'antie/widgets/component',
    'antie/widgets/container',
    'antie/widgets/button',
    'antie/widgets/scrubbar',
    'antie/widgets/verticallist',
    'antie/widgets/horizontallist',
    'antie/runtimecontext',
    'antie/devices/mediaplayer/mediaplayer',
    'widgets/extraButton',
    'config/app.config',
    'common/util'
], function(
    Component,
    Container,
    Button,
    ScrubBar,
    VerticalList,
    HorizontalList,
    RuntimeContext,
    MediaPlayer,
    ExtraButton,
    appConfig,
    util
) {
    'use strict';
    var device = RuntimeContext.getDevice(),
        mediaPlayer = device.getMediaPlayer();

    // All components extend Component
    return Component.extend({
        init: function() {
            this._super("media");

            this._onLoad && this.addEventListener('load', this._onLoad.bind(this));
            this._onBeforeRender && this.addEventListener('beforerender', this._onBeforeRender.bind(this));
            this._onBeforeShow && this.addEventListener('beforeshow', this._onBeforeShow.bind(this));
            this._onAfterShow && this.addEventListener('aftershow', this._onAfterShow.bind(this));
            this._onBeforeHide && this.addEventListener('beforehide', this._onBeforeHide.bind(this));
            this._onAfterhide && this.addEventListener('afterhide', this._onAfterHide.bind(this));           
        },

        _onLoad: function(evt) {
            this._verticalList = this.appendChildWidget(new VerticalList());

            this._backButton = this._verticalList.appendChildWidget(new ExtraButton('back', { icon: 'undo' }));

            this._controlList = this._verticalList.appendChildWidget(new HorizontalList('controlls'));
            this._playButton = this._controlList.appendChildWidget(new ExtraButton('resume', { icon: 'play' }));
            this._pauseButton = this._controlList.appendChildWidget(new ExtraButton('pause', { icon: 'pause' }));
            this._currentTime = this._controlList.appendChildWidget(new ExtraButton('current', { label: '00:00:00' }));
            this._scrubBar = this._controlList.appendChildWidget(new ScrubBar('scrub-bar'));
            this._totalTime = this._controlList.appendChildWidget(new ExtraButton('total', { label: '00:00:00' }));

            this._currentTime.setDisabled(true);
            this._scrubBar.setDisabled(true);
            this._totalTime.setDisabled(true);
        },

        _onBeforeShow: function (evt) {
            this._controlList.addEventListener('select', this._onControllSelect);
            this._backButton.addEventListener('select', this._onBackSelect);
            mediaPlayer.addEventCallback(this, this._mediaEvent);

        },

        _onAfterShow: function(evt) {
            var args = evt.args || {},
                config = appConfig || {},
                videoUrl = args.videoUrl || config.videoUrl || '';
            this._playVideo(evt.args.video || videoUrl);

            evt.stopPropagation();
        },

        _onBeforeHide: function (evt) {
            this._controlList.removeEventListener('select', this._onControllSelect);
            this._backButton.addEventListener('select', this._onBackSelect);
            mediaPlayer.removeEventCallback(this, this._mediaEvent);
        },

        _onControllSelect: function (evt) {
            // the id of the widgets is the same that the media player event. ie resume and pause.
            mediaPlayer[evt.target.id]();
        },

        _onBackSelect: function (evt) {
            evt.target.getComponent().parentWidget.back();
            mediaPlayer.stop();
            mediaPlayer.reset();
        },

        _mediaEvent: function(evt) {
            var percent;

            switch (evt.type) {
                case MediaPlayer.EVENT.STATUS:
                this._currentTime.setText(util.sToHHMMSS(evt.currentTime));
                this._totalTime.setText(util.sToHHMMSS(evt.duration));

                percent =  evt.currentTime / evt.duration;

                this._scrubBar.setBufferedRange({start: 0, end: percent});

                    break;
                case MediaPlayer.EVENT.COMPLETE:
                    break;
            }
        },

        _playVideo: function(url) {
            if (mediaPlayer.getState() !== 'EMPTY') {
                mediaPlayer.stop();
                mediaPlayer.reset();
            }

            this._scrubBar.setBufferedRange({start: 0, end: 0});

            mediaPlayer.setSource('video', url, 'video/mp4');
            mediaPlayer.beginPlayback();
        }
    });
});