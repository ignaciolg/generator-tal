define('config/media.items', [], function (){
    return [{
        label: 'Big Buck Bunny. MP4',
        type: 'mp4',
        url: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4'
    }, {
        label: 'Big Buck Bunny. HLS',
        type: 'hls',
        url: 'http://amssamples.streaming.mediaservices.windows.net/8b661219-cef3-4413-9471-a0b02794cc4c/BigBuckBunny.ism/manifest(format=m3u8-aapl)'
    }, {
        label: 'Sintel. Smooth Streaming',
        type: 'ism',
        url: function (cb) {
            // do what you need
            cb('http://amssamples.streaming.mediaservices.windows.net/49b57c87-f5f3-48b3-ba22-c55cfdffa9cb/Sintel.ism/manifest');
        }
    }]
})