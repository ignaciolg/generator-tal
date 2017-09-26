define('app', [
        'antie/application',
        'antie/widgets/container',
    ], function (
        Application,
        Container,
    ) {

        return Application.extend({
            run: function () {
                this.setRootWidget(new Container());
                this.addComponentContainer("maincontainer", "components/main");  
            }
        });
    }
);

