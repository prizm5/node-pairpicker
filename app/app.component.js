System.register(['angular2/core', './components/nav.component', './components/teams.component', './components/pairs.component', './components/footer.component', './services/names.service', 'angular2/http', './models/person', './models/pair', 'rxjs/Rx'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, nav_component_1, teams_component_1, pairs_component_1, footer_component_1, names_service_1, http_1, person_1, pair_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (nav_component_1_1) {
                nav_component_1 = nav_component_1_1;
            },
            function (teams_component_1_1) {
                teams_component_1 = teams_component_1_1;
            },
            function (pairs_component_1_1) {
                pairs_component_1 = pairs_component_1_1;
            },
            function (footer_component_1_1) {
                footer_component_1 = footer_component_1_1;
            },
            function (names_service_1_1) {
                names_service_1 = names_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (person_1_1) {
                person_1 = person_1_1;
            },
            function (pair_1_1) {
                pair_1 = pair_1_1;
            },
            function (_1) {}],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_nameService) {
                    this._nameService = _nameService;
                    this.title = 'Pair Picker';
                    this.isNavCollapsed = true;
                }
                AppComponent.prototype.updatePairing = function (p) {
                    this.pairing = p;
                };
                AppComponent.prototype.getNames = function (t, p) {
                    var _this = this;
                    this._nameService.getTeam(t).subscribe(function (n) {
                        n.forEach(function (a) {
                            a.shouldPair = p;
                            a.state = person_1.State.Paring;
                        });
                        _this.allteams.push({ "name": t, "members": n });
                    }, function (error) { return console.log(error); });
                };
                AppComponent.prototype.ngOnInit = function () {
                    this.allteams = [];
                    this.pairing = new pair_1.Pairing();
                    this.getNames('V5', true);
                    this.getNames('cloud', false);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: 'pairpicker',
                        template: "\n  <nav-section><h1>I nav loaded...</h1></nav-section>\n  <teams-section [teams]=\"allteams\" (onPairingGenerated)=\"updatePairing($event)\"><h1>I nav loaded...</h1></teams-section>\n  <pairs-section [pairing]=\"pairing\"><h1>I nav loaded...</h1></pairs-section>\n  <footer-section><h1>I footer loaded...</h1></footer-section>\n  ",
                        directives: [nav_component_1.Nav, teams_component_1.Teams, pairs_component_1.Pairs, footer_component_1.Footer],
                        providers: [names_service_1.NameService, http_1.JSONP_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [names_service_1.NameService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map