define('components/about', [
    'antie/widgets/button',
    'antie/widgets/textpager',
    'antie/events/keyevent',
    'text!config/about.html'
], function(
    Button,
    TextPager,
    KeyEvent,
    aboutHtml

) {
    "use strict";
    return Button.extend({
        init: function() {
            this._super('about-page');

            this._onLoad && this.addEventListener('load', this._onLoad.bind(this));
            this._onBeforeRender && this.addEventListener('beforerender', this._onBeforeRender.bind(this));
            this._onBeforeShow && this.addEventListener('beforeshow', this._onBeforeShow.bind(this));
            this._onAfterShow && this.addEventListener('aftershow', this._onAfterShow.bind(this));
            this._onBeforeHide && this.addEventListener('beforehide', this._onBeforeHide.bind(this));
            this._onAfterhide && this.addEventListener('afterhide', this._onAfterHide.bind(this));

            this._onKeyDownBound = this._onKeyDown.bind(this);
        },

        _onLoad: function(evt) {
            this._pager = this.appendChildWidget(new TextPager('pager', true));
        },

        _onBeforeRender: function(evt) {
            this._pager.setText(aboutHtml);
            this.focus();
            this.addEventListener('keydown', this._onKeyDownBound);
        },

        _onBeforeHide: function(evt) {
            this.removeEventListener('keydown', this._onKeyDownBound);
        },

        getCurrentState: function () {

        },

        _onKeyDown: function(evt) {
            switch (evt.keyCode) {
                case KeyEvent.VK_UP:
                    this._pager.pageUp();
                    evt.stopPropagation();
                    break;
                case KeyEvent.VK_DOWN:
                    this._pager.pageDown();
                    evt.stopPropagation();
                    break;
            }
            var pages = this._pager.getPageCount();
        }
    });

});