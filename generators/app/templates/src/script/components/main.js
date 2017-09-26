define('components/main', [
    'antie/widgets/component',
    'antie/widgets/horizontallist',
    'antie/widgets/componentcontainer',
    'antie/widgets/container'
], function (
    Component,
    HorizontalList,
    ComponentContainer,
    Container
) {
    "use strict";

    return Component.extend({
        init: function () {
            this._super('main-component');

            this._onLoad && this.addEventListener('load', this._onLoad.bind(this));
            this._onBeforeRender && this.addEventListener('beforerender', this._onBeforeRender.bind(this));
            this._onBeforeShow && this.addEventListener('beforeshow', this._onBeforeShow.bind(this));
            this._onAfterShow && this.addEventListener('aftershow', this._onAfterShow.bind(this));
            this._onBeforeHide && this.addEventListener('beforehide', this._onBeforeHide.bind(this));
            this._onAfterHide && this.addEventListener('afterhide', this._onAfterHide.bind(this));            

            this._onMenuSelectedBound = this._onMenuSelected.bind(this);           
        }, 
      
        _onLoad: function (evt) {
            if (evt.component !== this) {
                return;
            }

            this._mainList = this.appendChildWidget(new HorizontalList('main-list'));       
            this._menuContainer  = this._mainList.appendChildWidget(new ComponentContainer('menu-container'));
            this._separator  = this._mainList.appendChildWidget(new Container('separator'));
            this._subComponentContainer = this._mainList.appendChildWidget(new ComponentContainer('sub-component-container'));
            
            this._menuContainer.show('components/menu');
            this._subComponentContainer.show('components/info');

            evt.stopPropagation();       
        }, 

        _onBeforeRender: function (evt) {
             if (evt.component !== this) {
                return;
            }
            this._menuContainer.addEventListener('select', this._onMenuSelectedBound);

            evt.stopPropagation();       
        }, 

        _onAfterShow: function (evt) {
            if (evt.component !== this) {
                return;
            }

            var app = this.getCurrentApplication();
            app.ready();

            evt.stopPropagation();
        },

        _onBeforeHide: function (evt) {
            if (evt.component !== this) {
                return;
            }
            
            this._menuContainer.removeEventListener('select', this._onMenuSelectedBound);
             
            evt.stopPropagation();       
        }, 

        _onMenuSelected: function (evt) {
            this._subComponentContainer.pushComponent('components/'+evt.target.id, {});
            
            evt.stopPropagation();       
        }
    });

});

