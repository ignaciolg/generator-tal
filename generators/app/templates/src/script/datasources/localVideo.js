define('datasources/localVideo', [
    'antie/class',
    'config/media.items'
], function (
    Class,
    mediaItems
) {
    'use strict';

    return Class.extend({
        loadData: function (cb) {
            mediaItems = mediaItems || [];

            if (mediaItems.length){
                return cb.onSuccess(mediaItems);
            }
            cb.onError('no data into the config/media.items.js file!!');
        }       
    })
});
    
