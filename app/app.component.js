System.register(['angular2/core', './components/nav.component', './components/teams.component', './components/pairs.component', './components/footer.component', './services/names.service', 'angular2/http', './models/person', './models/pairing', './models/intentional-pairs', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, nav_component_1, teams_component_1, pairs_component_1, footer_component_1, names_service_1, http_1, person_1, pairing_1, intentional_pairs_1;
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
            function (pairing_1_1) {
                pairing_1 = pairing_1_1;
            },
            function (intentional_pairs_1_1) {
                intentional_pairs_1 = intentional_pairs_1_1;
            },
            function (_1) {}],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_nameService) {
                    this._nameService = _nameService;
                    this.title = 'Pair Picker';
                    this.isNavCollapsed = true;
                    this.paircounts = {};
                    this.oddcounts = {};
                    this.canSave = false;
                }
                AppComponent.prototype.switchTeamMember = function (t) {
                    if (t.name) {
                        var fromteam = this.allteams.filter(function (n) { return n.name === t.team; })[0];
                        var toteam = this.allteams.filter(function (n) { return n.name !== t.team; })[0];
                        var move = fromteam.members.filter(function (m) { return m.name == t.name; })[0];
                        fromteam.members = fromteam.members.filter(function (m) { return m.name !== t.name; });
                        move.shouldPair = t.team != "V5";
                        toteam.members.push(move);
                        this.moveTeam(t.name, t.team);
                    }
                };
                AppComponent.prototype.moveTeam = function (name, team, retry) {
                    var _this = this;
                    if (retry === void 0) { retry = 0; }
                    this._nameService.moveTeam(name, team)
                        .subscribe(function () { return console.debug("Moved " + name + " from " + team); }, function (error) {
                        retry++;
                        if (retry < 4)
                            _this.moveTeam(name, team, retry);
                        console.error("error sending to slack: " + error);
                    });
                };
                AppComponent.prototype.savePairingToDb = function (p, retry) {
                    var _this = this;
                    if (retry === void 0) { retry = 0; }
                    this._nameService.savePair(p)
                        .subscribe(function (a) { return console.debug("pairing saved : " + a); }, function (error) {
                        retry++;
                        if (retry < 4)
                            _this.savePairingToDb(p, retry);
                        console.error("error saving pairing: " + error);
                    });
                };
                AppComponent.prototype.savePairing = function (p) {
                    this.savePairingToDb(p);
                    this._nameService.sendToSlack(p)
                        .subscribe(function (a) { return console.debug("sent to slack : " + a); }, function (error) { return console.error("error sending to slack: " + error); });
                };
                AppComponent.prototype.updatePairing = function (p) {
                    this.canSave = true;
                    this.pairing = p;
                };
                AppComponent.prototype.getNames = function (t, p, retry) {
                    var _this = this;
                    if (retry === void 0) { retry = 0; }
                    this._nameService.getTeam(t).subscribe(function (n) {
                        n.forEach(function (a) {
                            a.shouldPair = p;
                            a.state = person_1.State.RandomPairing;
                        });
                        _this.allteams.push({ 'name': t, 'members': n });
                    }, function (error) {
                        retry++;
                        if (retry < 4)
                            _this.getNames(t, p, retry);
                        console.error(error);
                    });
                };
                AppComponent.prototype.getPairCounts = function (retry) {
                    var _this = this;
                    if (retry === void 0) { retry = 0; }
                    this._nameService.getPairCounts().subscribe(function (n) {
                        _this.paircounts = n;
                    }, function (error) {
                        retry++;
                        if (retry < 4)
                            _this.getPairCounts(retry);
                        console.error(error);
                    });
                };
                AppComponent.prototype.getOddCounts = function (retry) {
                    var _this = this;
                    if (retry === void 0) { retry = 0; }
                    this._nameService.getOddCounts().subscribe(function (n) {
                        _this.oddcounts = n;
                    }, function (error) {
                        retry++;
                        if (retry < 4)
                            _this.getOddCounts(retry);
                        console.error(error);
                    });
                };
                AppComponent.prototype.ngOnInit = function () {
                    this.allteams = [];
                    this.pairing = new pairing_1.Pairing();
                    this.intentionalPairs = new intentional_pairs_1.IntentionalPairs();
                    this.getNames('V5', true);
                    this.getNames('cloud', false);
                    this.getPairCounts();
                    this.getOddCounts();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: 'pairpicker',
                        template: "\n    <nav-section><h1>I nav loaded...</h1></nav-section>\n    <teams-section\n      [teams]=\"allteams\"\n      [intentionalPairs]=\"intentionalPairs\"\n      (onPairingGenerated)=\"updatePairing($event)\"\n      (onSwitchTeam)=\"switchTeamMember($event)\">\n      <h1>I nav loaded...</h1>\n    </teams-section>\n    <pairs-section\n      [pairing]=\"pairing\"\n      [intentionalPairs]=\"intentionalPairs\"\n      [paircounts]=\"paircounts\"\n      [oddcounts]=\"oddcounts\"\n      [canSavePairs]='canSave'\n      (onSavePairing)=\"savePairing($event)\">\n      <h1>I nav loaded...</h1>\n    </pairs-section>\n    <footer-section><h1>I footer loaded...</h1></footer-section>\n  ",
                        directives: [nav_component_1.Nav, teams_component_1.Teams, pairs_component_1.Pairs, footer_component_1.Footer],
                        providers: [names_service_1.NameService, http_1.JSONP_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [names_service_1.NameService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map