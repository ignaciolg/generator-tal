define('common/util', [
    'config/app.config'
], function (
    appConfig
) {
    return {
        buildImgUrl: function (id, width) {
            var tmdb = appConfig && appConfig.tmdb || {},
                        domain = tmdb.images && tmdb.images.domain || '',
                        path = tmdb.images && tmdb.images.path || '/t/p/',
                        defaultWidth = tmdb.images && tmdb.images.width || '342',
                        baseUrl;
                    
            if (!domain || !id) {
                return '';
            }

            width =  width || defaultWidth;
            width = 'w' + width;

            baseUrl = domain + path +  width;

            return baseUrl + id + '?api_key=' + tmdb.apiKey; 
        },


        sToHHMMSS: function (seconds) {        
            var hours, minutes;
            
            hours = parseInt( seconds / 3600 ) + ''; 
            seconds = seconds % 3600; 
            
            minutes = parseInt( seconds / 60 ) + '';             

            seconds = parseInt(seconds % 60) + '';

            if (hours.length < 2) {
                hours = '0'+hours;
            }

            if (minutes.length < 2) {
                minutes = '0'+minutes;
            }

            if (seconds.length < 2) {
                seconds = '0'+seconds;
            }



            return hours + ':' + minutes + ':' + seconds;
        }
    }
})