System.register(["angular2/core", "../models/team", "./dev.component", "../models/pairing", "../models/person"], function(exports_1, context_1) {
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
    var core_1, team_1, dev_component_1, pairing_1, person_1;
    var Teams;
    function groupBy(coll, keyFn) {
        return coll.reduce(function (groups, c) {
            var k = keyFn(c);
            var key = (k === null || k === undefined ? "" : k).toString();
            (key in groups) ? groups[key].push(c) : groups[key] = [c];
            return groups;
        }, {});
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (team_1_1) {
                team_1 = team_1_1;
            },
            function (dev_component_1_1) {
                dev_component_1 = dev_component_1_1;
            },
            function (pairing_1_1) {
                pairing_1 = pairing_1_1;
            },
            function (person_1_1) {
                person_1 = person_1_1;
            }],
        execute: function() {
            Teams = (function () {
                function Teams() {
                    this.onSwitchTeam = new core_1.EventEmitter();
                    this.onPairingGenerated = new core_1.EventEmitter();
                }
                Teams.prototype.relayTeamSwitch = function (event) {
                    this.onSwitchTeam.emit(event);
                };
                Teams.prototype.generatePairs = function () {
                    this.pairing = new pairing_1.Pairing();
                    var teamToShuffle = new team_1.Team();
                    var v5 = this.teams.filter(function (f) { return f.name === "V5"; })[0];
                    var byState = groupBy(v5.members, function (m) { return m.state; });
                    var randos = byState[person_1.State.RandomPairing] || [];
                    var odds = byState[person_1.State.Odd] || [];
                    teamToShuffle.name = "V5";
                    teamToShuffle.members = randos;
                    this.pairing.generatePairs(teamToShuffle, this.intentionalPairs.getAllIntentionalPairs(), odds);
                    this.onPairingGenerated.emit(this.pairing);
                };
                Teams = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: "teams-section",
                        template: "\n    <!-- Portfolio Grid Section -->\n    <section id=\"portfolio\">\n      <div class=\"container\">\n        <div class=\"row\" >\n          <div class=\"col-lg-12 text-center\">\n            <h2>Workflows</h2>\n            <div class=\"col-lg-12 text-left\">\n              Last Pairs:\n              <span *ngFor=\"#pair of lastPairingSession.pairs\">\n                <span class=\"label label-info\">{{pair.member1}} : {{pair.member2}}</span>\n              </span>\n              <span *ngFor=\"#odd of lastPairingSession.odds\">\n                <span class=\"label label-info\">{{odd}}</span>\n              </span>\n            </div>\n            <hr class=\"star-primary\">\n          </div>\n        </div>\n        <div class=\"row\" >\n          <div class=\"col-sm-6 portfolio-item\" *ngFor=\"#team of teams\">\n            <h3>{{team.name}}</h3>\n            <hr />\n            <developer\n              (onSwitchTeam)=\"relayTeamSwitch($event)\"\n              [peeps]=\"team.members\"\n              [teamname]=\"team.name\"\n              [intentionalPairs]=\"intentionalPairs\">i am developer</developer>\n          </div>\n        </div>\n        <div class=\"row\" >\n          <div class=\"col-sm-2 portfolio-item page-scroll\">\n            <a href=\"#pairs\">\n              <button type=\"submit\" class=\"btn btn-success btn-lg\" (click)=\"generatePairs()\">Generate</button>\n            </a>\n          </div>\n        </div>\n      </div>\n    </section>\n  ",
                        inputs: ["teams", "lastPairingSession", "intentionalPairs"],
                        outputs: ["onPairingGenerated", "onSwitchTeam"],
                        directives: [dev_component_1.Dev]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Teams);
                return Teams;
            }());
            exports_1("Teams", Teams);
        }
    }
});
//# sourceMappingURL=teams.component.js.map