System.register(['angular2/core', '../models/team', './dev.component', '../models/pair', '../models/person'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, team_1, dev_component_1, pair_1, person_1;
    var Teams;
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
            function (pair_1_1) {
                pair_1 = pair_1_1;
            },
            function (person_1_1) {
                person_1 = person_1_1;
            }],
        execute: function() {
            Teams = (function () {
                function Teams() {
                    this.onPairingGenerated = new core_1.EventEmitter();
                    this.onSwitchPair = new core_1.EventEmitter();
                }
                Teams.prototype.onSelect2 = function (person, teamname) {
                    if (person.target && person.target.id !== "") {
                        this.onSwitchPair.emit({ name: person.target.id, team: teamname });
                        console.debug(person.target.id);
                    }
                };
                Teams.prototype.onMakePairs = function () {
                    this.pairing = new pair_1.Pairing();
                    var teamToShuffle = new team_1.Team();
                    teamToShuffle.name = "V5";
                    var v5 = this.teams.filter(function (f) { return f.name == "V5"; })[0];
                    teamToShuffle.members = v5.members.filter(function (t) { return t.state === person_1.State.Paring; })
                        .splice(0);
                    var odd = v5.members.filter(function (t) { return t.state === person_1.State.Odd; }).splice(0);
                    this.pairing.getPairs(teamToShuffle, odd);
                    this.onPairingGenerated.emit(this.pairing);
                };
                Teams = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: 'teams-section',
                        template: " \n   <!-- Portfolio Grid Section -->\n    <section id=\"portfolio\">\n        <div class=\"container\">\n            <div class=\"row\" >\n                <div class=\"col-lg-12 text-center\">\n                    <h2>Workflows</h2>\n                    <hr class=\"star-primary\">\n                </div>\n            </div>\n            <div class=\"row\" >\n                <div class=\"col-sm-6 portfolio-item\" *ngFor=\"#team of teams\">\n                    <h3>{{team.name}}</h3>\n                    <hr />\n                    <developer [peeps]=\"team.members\" [teamname]=\"team.name\" (click)=\"onSelect2($event, team.name)\">i am developer</developer>\n                </div>\n         </div>\n         <div class=\"row\" >\n            <div class=\"col-sm-2 portfolio-item page-scroll\">\n                <a href=\"#pairs\">\n                <button type=\"submit\" class=\"btn btn-success btn-lg\" (click)=\"onMakePairs()\">Generate</button>\n                </a>\n            </div>\n         </div> \n       </div>\n    </section>\n  ",
                        inputs: ['teams'],
                        outputs: ['onPairingGenerated', 'onSwitchPair'],
                        directives: [dev_component_1.Dev]
                    }), 
                    __metadata('design:paramtypes', [])
                ], Teams);
                return Teams;
            })();
            exports_1("Teams", Teams);
        }
    }
});
//# sourceMappingURL=teams.component.js.map