System.register(['angular2/core', 'angular2/router', './picker.component', './components/nav.component', './components/footer.component', './stats.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, picker_component_1, nav_component_1, footer_component_1, stats_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (picker_component_1_1) {
                picker_component_1 = picker_component_1_1;
            },
            function (nav_component_1_1) {
                nav_component_1 = nav_component_1_1;
            },
            function (footer_component_1_1) {
                footer_component_1 = footer_component_1_1;
            },
            function (stats_component_1_1) {
                stats_component_1 = stats_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: 'pairpicker',
                        template: "\n  <nav-section><h1>I nav loaded...</h1></nav-section>\n  <router-outlet></router-outlet>\n  <footer-section><h1>I footer loaded...</h1></footer-section>\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES, nav_component_1.Nav, footer_component_1.Footer]
                    }),
                    router_1.RouteConfig([
                        { path: '/Picker', name: 'Picker', component: picker_component_1.Picker, useAsDefault: true },
                        { path: '/Stats', name: 'Stats', component: stats_component_1.Stats },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map