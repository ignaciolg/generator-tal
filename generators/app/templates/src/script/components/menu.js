define('components/menu', [
    'antie/widgets/component',
    'antie/widgets/verticallist',
    'widgets/extraButton',
    'config/menu.items'
], function (
    Component,
    VerticalList,
    ExtraButton,
    menuItems
) {
"use strict";

    return VerticalList.extend({
        init: function () {
            this._super('menu');

            this._onLoad && this.addEventListener('load', this._onLoad.bind(this));
            this._onBeforeRender && this.addEventListener('beforerender', this._onBeforeRender.bind(this));
            this._onBeforeShow && this.addEventListener('beforeshow', this._onBeforeShow.bind(this));
            this._onAfterShow && this.addEventListener('aftershow', this._onAfterShow.bind(this));
            this._onBeforeHide && this.addEventListener('beforehide', this._onBeforeHide.bind(this));
            this._onAfterHide && this.addEventListener('afterhide', this._onAfterHide.bind(this));
        },          
      
        /**
         * Creates and setup the main view
         * @private
         */
        _onLoad: function (evt) {
            var items = menuItems && menuItems.items || [], 
                i, item, buttonOpts = {};
                
                this._items = items;
                this._menuItems = [];

            for (i = 0; i< items.length; i ++) {
                item = items[i];
                buttonOpts = {};
                buttonOpts.label =  item.label || item.id;
                buttonOpts.icon =  item.icon || '';
                this._menuItems.push(this.appendChildWidget(new ExtraButton(item.id, buttonOpts)));
            }        
            
            evt.stopPropagation();
        }
    })

});


