define('datasources/tmdb', [
    'antie/class',
    'antie/runtimecontext',
    'config/app.config'
], function (
    Class,
    RuntimeContext,
    appConfig
) {
    'use strict';

    /**
     * Creates a proper url for The Movie Database
     */
    var buildUrl = function () {
        var tmdb = appConfig && appConfig.tmdb || {},
            api = tmdb && tmdb.api || {},
            url, domain, discover, apiKey, filters, i;

            domain = api.domain;
            discover = api.discover;
            apiKey = tmdb.apiKey;
            filters = api.filters;

            if (!domain || !apiKey || filters.length === 0) {
                return 'errorUrl';
            }
        
            url = domain + discover + '?api_key=' + apiKey;

            for(i = 0; i < filters.length; i ++) {
                url += '&' + filters[i];
            }

            return url;
    }

    return Class.extend({

        loadData: function (cb) {
            var device = RuntimeContext.getDevice(),
                url = buildUrl();
            
                device.loadURL(url, {
                onLoad: function (response){
                    cb.onSuccess(JSON.parse(response).results);
                },
                onError: cb.onError
            });
        }
    })
});
    
