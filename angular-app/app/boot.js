System.register(['angular2/platform/browser', 'angular2/http', './app.component', './services/names.service', 'angular2/router', 'angular2/core'], function(exports_1) {
    var browser_1, http_1, app_component_1, names_service_1, router_1, core_1, router_2;
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
                router_2 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, names_service_1.NameService, router_1.ROUTER_PROVIDERS, core_1.provide(router_2.APP_BASE_HREF, { useValue: '/#/' })])
                .catch(function (err) { return console.error(err); });
        }
    }
});
//# sourceMappingURL=boot.js.map