System.register(['angular2/platform/browser', 'angular2/http', './app.component', './services/names.service', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, http_1, app_component_1, names_service_1, router_1;
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
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, names_service_1.NameService, router_1.ROUTER_PROVIDERS])
                .catch(function (err) { return console.error(err); });
        }
    }
});
//# sourceMappingURL=boot.js.map