require([
    'app',
    'node_modules/requirejs-domready/domReady!'
], function (Application) {

    var onReady = function () {
        var staticLoadingScreen = document.getElementById('splash');
        if (staticLoadingScreen) {
            staticLoadingScreen.style.opacity = '0';
            setTimeout(function(){
            staticLoadingScreen.parentNode.removeChild(staticLoadingScreen);
            }, 1500);
        }
    };

    new Application(
        document.getElementById('app'),
        'style/',
        'img/',
        onReady
    );

});