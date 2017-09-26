define('widgets/fontAwesome', [
    'antie/widgets/container'
], function (
    Widget
) {
    'use strict';
    
    return Widget.extend({
        init: function (id) {
            this._super(id);
            this.addClass('fa')
        }, 

        setIcon: function(icon){
           this.addClass('fa-'+icon);            
        }
    });
});