define('config/app.config', {
    // example video
    // videoUrl: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',

    videoUrl: 'http://amssamples.streaming.mediaservices.windows.net/2e91931e-0d29-482b-a42b-9aadc93eb825/AzurePromo.mp4',
    tmdb: {
        api: {
            domain: 'https://api.themoviedb.org/3',
            discover: '/discover/movie',
            filters: [
                'sort_by=popularity.desc'
            ]
        },
        images: {
            domain: 'http://image.tmdb.org',
            path: '/t/p/',
            width: '342'
        },
        apiKey: 'ffee2371843cd02e9064082f0f52b035'
    }
})