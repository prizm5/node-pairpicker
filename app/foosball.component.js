System.register(["angular2/core", "./components/teams.component", "./components/pairs.component", "./services/names.service", "./models/person", "./models/pairing", "./models/intentional-pairs", "rxjs/Rx"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, teams_component_1, pairs_component_1, names_service_1, person_1, pairing_1, intentional_pairs_1;
    var Foosball;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
            Foosball = (function () {
                function Foosball(_nameService) {
                    this._nameService = _nameService;
                    this.title = "Foosball Picker";
                    this.isNavCollapsed = true;
                    this.paircounts = [];
                    this.oddcounts = [];
                    this.canSave = false;
                    this.foosball = true;
                }
                Foosball.prototype.getFoosballerz = function () {
                    var _this = this;
                    this._nameService.getTeam().subscribe(function (n) {
                        n.filter(function (f) { return f.key === "Foosballerz"; }).reverse().forEach(function (t) {
                            t.value.forEach(function (v) {
                                v.shouldPair = true;
                                v.state = person_1.State.RandomPairing;
                                v.canMove = false;
                            });
                            _this.allteams.push({ "name": t.key, "members": t.value });
                        });
                    }, function (error) {
                        console.error(error);
                    });
                };
                Foosball.prototype.updatePairing = function (p) {
                    this.canSave = false;
                    this.foosball = true;
                    this.pairing = p;
                };
                Foosball.prototype.startGame = function (p) {
                    this._nameService.startGame(p)
                        .subscribe(function (a) { return console.debug("sent to slack : " + a); }, function (error) { return console.error("error sending to slack: " + error); });
                };
                Foosball.prototype.ngOnInit = function () {
                    this.getFoosballerz();
                    this.allteams = [];
                    this.pairing = new pairing_1.Pairing();
                    this.intentionalPairs = new intentional_pairs_1.IntentionalPairs();
                };
                Foosball = __decorate([
                    core_1.Component({
                        styles: [],
                        template: "\n    <teams-section\n      [teams]=\"allteams\"\n      [intentionalPairs]=\"intentionalPairs\"\n      (onPairingGenerated)=\"updatePairing($event)\"\n      (onSwitchTeam)=\"switchTeamMember($event)\">\n      <h1>I teams loaded...</h1>\n    </teams-section>\n    <pairs-section\n      [pairing]=\"pairing\"\n      [intentionalPairs]=\"intentionalPairs\"\n      [paircounts]=\"paircounts\"\n      [oddcounts]=\"oddcounts\"\n      [canSavePairs]=\"canSave\"\n      [foosball]=\"foosball\"\n      (onStartGame)=\"startGame($event)\">\n      <h1>I pars loaded...</h1>\n    </pairs-section>\n  ",
                        directives: [teams_component_1.Teams, pairs_component_1.Pairs]
                    }), 
                    __metadata('design:paramtypes', [names_service_1.NameService])
                ], Foosball);
                return Foosball;
            })();
            exports_1("Foosball", Foosball);
        }
    }
});
//# sourceMappingURL=foosball.component.js.map