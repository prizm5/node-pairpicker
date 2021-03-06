System.register(['angular2/core', './services/names.service', 'angular2/router', './picker.component', './components/nav.component', './components/footer.component', './stats.component', './members.component'], function(exports_1, context_1) {
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
    var core_1, names_service_1, router_1, picker_component_1, nav_component_1, footer_component_1, stats_component_1, members_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (names_service_1_1) {
                names_service_1 = names_service_1_1;
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
            },
            function (members_component_1_1) {
                members_component_1 = members_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_nameService) {
                    this._nameService = _nameService;
                    this.Cloud9Status = { "status": "Offline" };
                    this.getCloud9Status();
                }
                AppComponent.prototype.getCloud9Status = function (retry) {
                    var _this = this;
                    if (retry === void 0) { retry = 0; }
                    this._nameService.getCloud9Status().subscribe(function (n) {
                        _this.Cloud9Status = n;
                    }, function (error) {
                        retry++;
                        if (retry < 4)
                            _this.getCloud9Status(retry);
                        console.error(error);
                    });
                };
                ;
                AppComponent.prototype.stopCloud9Process = function (e, retry) {
                    var _this = this;
                    if (retry === void 0) { retry = 0; }
                    this._nameService.stopCloud9()
                        .subscribe(function (a) {
                        console.debug("Cloud9 Stopped");
                        _this.getCloud9Status();
                    }, function (error) {
                        retry++;
                        if (retry < 4)
                            _this.stopCloud9Process(e, retry);
                        console.error("error stoping Cloud9");
                    });
                };
                AppComponent.prototype.startCloud9Process = function (e, retry) {
                    var _this = this;
                    if (retry === void 0) { retry = 0; }
                    this._nameService.startCloud9()
                        .subscribe(function (a) {
                        console.debug("Cloud9 Started");
                        _this.getCloud9Status();
                    }, function (error) {
                        retry++;
                        if (retry < 4)
                            _this.startCloud9Process(e, retry);
                        console.error("error starting Cloud9");
                    });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: 'pairpicker',
                        template: "\n  <nav-section\n      [cloud9status]=\"Cloud9Status\"\n      (onStartCloud9)=\"startCloud9Process($event)\"\n      (onStopCloud9)=\"stopCloud9Process($event)\">\n  <h1>I nav loaded...</h1></nav-section>\n  <router-outlet></router-outlet>\n  <footer-section><h1>I footer loaded...</h1></footer-section>\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES, nav_component_1.Nav, footer_component_1.Footer]
                    }),
                    router_1.RouteConfig([
                        { path: '/Picker', name: 'Picker', component: picker_component_1.Picker, useAsDefault: true },
                        { path: '/Stats', name: 'Stats', component: stats_component_1.Stats },
                        { path: '/Members', name: 'Members', component: members_component_1.Members }
                    ]), 
                    __metadata('design:paramtypes', [names_service_1.NameService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map