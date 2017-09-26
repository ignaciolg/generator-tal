define('components/info', [
    'antie/widgets/component',
    'antie/widgets/verticallist',
    'antie/widgets/horizontallist',
    'antie/widgets/label',
    'antie/runtimecontext'
], function (
    Component,
    VerticalList,
    HorizontalList,
    Label,
    RuntimeContext
) {
    "use strict";
    var application = RuntimeContext.getCurrentApplication(),
        device = RuntimeContext.getDevice();

    return Component.extend({
        init: function () {
            this._super('info');

            this._onLoad && this.addEventListener('load', this._onLoad.bind(this));
            this._onBeforeRender && this.addEventListener('beforerender', this._onBeforeRender.bind(this));
            this._onBeforeShow && this.addEventListener('beforeshow', this._onBeforeShow.bind(this));
            this._onAfterShow && this.addEventListener('aftershow', this._onAfterShow.bind(this));
            this._onBeforeHide && this.addEventListener('beforehide', this._onBeforeHide.bind(this));
            this._onAfterHide && this.addEventListener('afterhide', this._onAfterHide.bind(this));
        },

        _onLoad: function (evt) {
            var baseDevice = RuntimeContext.getDevice().getConfig().modules.base;

            this._vList = this.appendChildWidget(new VerticalList());

            this._header = this._vList.appendChildWidget(new Label('h1','Welcome to the generator-tal application example'));

            this._deviceTitle = this._vList.appendChildWidget(new Label('device-title','Device Info'));
            this._deviceTitle.addClass('title');

            this._deviceList = this._vList.appendChildWidget(new HorizontalList());

            this._deviceLabel = this._deviceList.appendChildWidget(new Label('Base device:'));
            this._device = this._deviceList.appendChildWidget(new Label(baseDevice));                
            this._device.addClass('second');
            
            this._userAgentList = this._vList.appendChildWidget(new HorizontalList());
            this._userAgentLabel = this._userAgentList.appendChildWidget(new Label('User Agent:'));
            this._userAgent = this._userAgentList.appendChildWidget(new Label('ua',navigator.userAgent));
            this._userAgent.addClass('second');

            this._welcomeTitle = this._vList.appendChildWidget(new Label('Instructions'));
            this._welcomeTitle.addClass('title');                
            this._welcomeLabel = this._vList.appendChildWidget(new Label('Please navigate through the left menu items to the different application sections'));                

            evt.stopPropagation();
        }
    });
});

