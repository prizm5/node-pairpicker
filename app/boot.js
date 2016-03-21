System.register(['angular2/platform/browser', 'angular2/http', './app.component', './services/names.service'], function(exports_1) {
    var browser_1, http_1, app_component_1, names_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (names_service_1_1) {
                names_service_1 = names_service_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, names_service_1.NameService])
                .catch(function (err) { return console.error(err); });
        }
    }
});
//# sourceMappingURL=boot.js.map