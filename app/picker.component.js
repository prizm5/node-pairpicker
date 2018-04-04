System.register(['angular2/core', './components/nav.component', './components/teams.component', './components/pairs.component', './services/names.service', './models/person', './models/pairing', './models/intentional-pairs', 'rxjs/Rx'], function(exports_1, context_1) {
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
    var core_1, nav_component_1, teams_component_1, pairs_component_1, names_service_1, person_1, pairing_1, intentional_pairs_1;
    var Picker;
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
            function (names_service_1_1) {
                names_service_1 = names_service_1_1;
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
            Picker = (function () {
                function Picker(_nameService) {
                    this._nameService = _nameService;
                    this.title = 'Pair Picker';
                    this.isNavCollapsed = true;
                    this.paircounts = {};
                    this.oddcounts = {};
                    this.canSave = false;
                }
                Picker.prototype.switchTeamMember = function (t) {
                    if (t.name) {
                        var fromteam = this.allteams.filter(function (n) { return n.name === t.team; })[0];
                        var toteam = this.allteams.filter(function (n) { return n.name !== t.team; })[0] || { members: [] };
                        var move = fromteam.members.filter(function (m) { return m.name === t.name; })[0];
                        fromteam.members = fromteam.members.filter(function (m) { return m.name !== t.name; });
                        move.shouldPair = t.team !== "V5";
                        //if (!toteam.members) {
                        //  toteam.members = [];
                        //}
                        toteam.members.push(move);
                        this.moveTeam(t.name, t.team);
                    }
                };
                Picker.prototype.moveTeam = function (name, team, retry) {
                    var _this = this;
                    if (retry === void 0) { retry = 0; }
                    this._nameService.moveTeam(name, team)
                        .subscribe(function () { return console.debug("Moved " + name + " from " + team); }, function (error) {
                        retry++;
                        if (retry < 4)
                            _this.moveTeam(name, team, retry);
                        console.error("error moving team: " + error);
                    });
                };
                Picker.prototype.savePairingToDb = function (p, retry) {
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
                Picker.prototype.savePairing = function (p) {
                    this.canSave = false;
                    this.lastPairingSession = new pairing_1.ParingSession(null, [], []);
                    this.savePairingToDb(p);
                    this.getLastPairSesion();
                };
                Picker.prototype.updatePairing = function (p) {
                    this.pairing = p;
                    this.getPairCounts();
                    this.canSave = true;
                    this.getLastPairSesion();
                };
                Picker.prototype.getLastPairSesion = function (retry) {
                    var _this = this;
                    if (retry === void 0) { retry = 0; }
                    this._nameService.getLastParing().subscribe(function (n) {
                        var x = n.pairs.map(function (p) { return p.split(' :: '); });
                        var timestamp = n.timestamp;
                        var pairs = x.filter(function (f) { return f.length !== 1; }).map(function (p) { return new pairing_1.Pair(p[0], p[1]); });
                        var odds = x.filter(function (f) { return f.length === 1; }).map(function (p) { return p[0]; });
                        var pairsession = new pairing_1.ParingSession(timestamp, pairs, odds);
                        _this.lastPairingSession = pairsession;
                    }, function (error) {
                        retry++;
                        if (retry < 4)
                            _this.getNames(retry);
                        console.error(error);
                    });
                };
                Picker.prototype.getNames = function (retry) {
                    var _this = this;
                    if (retry === void 0) { retry = 0; }
                    this._nameService.getTeam().subscribe(function (n) {
                        n.filter(function (f) { return f.key == 'V5'; }).reverse().forEach(function (t) {
                            t.value.forEach(function (v) {
                                v.shouldPair = true;
                                v.state = person_1.State.RandomPairing;
                            });
                            _this.allteams.push({ 'name': t.key, 'members': t.value });
                        });
                        n.filter(function (f) { return f.key == 'Cloud'; }).reverse().forEach(function (t) {
                            t.value.forEach(function (v) {
                                v.shouldPair = false;
                                v.state = person_1.State.RandomPairing;
                            });
                            _this.allteams.push({ 'name': t.key, 'members': t.value });
                        });
                    }, function (error) {
                        retry++;
                        if (retry < 4)
                            _this.getNames(retry);
                        console.error(error);
                    });
                };
                Picker.prototype.getPairCounts = function (retry) {
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
                Picker.prototype.ngOnInit = function () {
                    this.allteams = [];
                    this.pairing = new pairing_1.Pairing();
                    this.getLastPairSesion();
                    this.intentionalPairs = new intentional_pairs_1.IntentionalPairs();
                    this.lastPairingSession = new pairing_1.ParingSession(null, [], []);
                    this.getNames();
                    this.getPairCounts();
                };
                Picker = __decorate([
                    core_1.Component({
                        styles: [],
                        template: "\n    <teams-section\n      [teams]=\"allteams\"\n      [lastPairingSession]=\"lastPairingSession\"\n      [intentionalPairs]=\"intentionalPairs\"\n      (onPairingGenerated)=\"updatePairing($event)\"\n      (onSwitchTeam)=\"switchTeamMember($event)\">\n      <h1>I teams loaded...</h1>\n    </teams-section>\n    <pairs-section\n      [pairing]=\"pairing\"\n      [intentionalPairs]=\"intentionalPairs\"\n      [paircounts]=\"paircounts\"\n      [oddcounts]=\"oddcounts\"\n      [canSavePairs]='canSave'\n      (onSavePairing)=\"savePairing($event)\">\n      <h1>I pairs loaded...</h1>\n    </pairs-section>\n  ",
                        directives: [nav_component_1.Nav, teams_component_1.Teams, pairs_component_1.Pairs],
                    }), 
                    __metadata('design:paramtypes', [names_service_1.NameService])
                ], Picker);
                return Picker;
            }());
            exports_1("Picker", Picker);
        }
    }
});
//# sourceMappingURL=picker.component.js.map