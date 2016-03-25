System.register(['angular2/core', './services/names.service', './models/person', './components/dev.component'], function(exports_1, context_1) {
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
    var core_1, names_service_1, person_1, dev_component_1;
    var Foosball;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (names_service_1_1) {
                names_service_1 = names_service_1_1;
            },
            function (person_1_1) {
                person_1 = person_1_1;
            },
            function (dev_component_1_1) {
                dev_component_1 = dev_component_1_1;
            }],
        execute: function() {
            Foosball = (function () {
                function Foosball(_nameService) {
                    this._nameService = _nameService;
                    this.title = 'Pair Picker';
                    this.isNavCollapsed = true;
                    this.paircounts = {};
                    this.oddcounts = {};
                    this.canSave = false;
                }
                Foosball.prototype.getFoosballerz = function () {
                    var _this = this;
                    this._nameService.getFoosball().subscribe(function (n) {
                        n[0].value.forEach(function (v) {
                            v.shouldPair = true;
                            v.state = person_1.State.RandomPairing;
                        });
                        _this.allteams.push({ 'name': 'Foozballerz', 'members': n[0].value });
                    }, function (error) {
                        console.error(error);
                    });
                };
                Foosball.prototype.ngOnInit = function () {
                    this.getFoosballerz();
                };
                Foosball = __decorate([
                    core_1.Component({
                        styles: [],
                        template: "\n         <teams-section\n      [teams]=\"allteams\"\n      [intentionalPairs]=\"intentionalPairs\"\n      (onPairingGenerated)=\"updatePairing($event)\"\n      (onSwitchTeam)=\"switchTeamMember($event)\">\n      <h1>I nav loaded...</h1>\n    </teams-section>\n    <pairs-section\n      [pairing]=\"pairing\"\n      [intentionalPairs]=\"intentionalPairs\"\n      [paircounts]=\"paircounts\"\n      [oddcounts]=\"oddcounts\"\n      [canSavePairs]='canSave'\n      (onSavePairing)=\"savePairing($event)\">\n      <h1>I nav loaded...</h1>\n    </pairs-section>\n  ",
                        directives: [dev_component_1.Dev]
                    }), 
                    __metadata('design:paramtypes', [names_service_1.NameService])
                ], Foosball);
                return Foosball;
            }());
            exports_1("Foosball", Foosball);
        }
    }
});
//# sourceMappingURL=foosball.component.js.map