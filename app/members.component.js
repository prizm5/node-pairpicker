System.register(['angular2/core', './services/names.service'], function(exports_1, context_1) {
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
    var core_1, names_service_1;
    var Members;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (names_service_1_1) {
                names_service_1 = names_service_1_1;
            }],
        execute: function() {
            Members = (function () {
                function Members(_nameService) {
                    this._nameService = _nameService;
                    this.team = [];
                }
                /* ------------- */
                Members.prototype.getTeam = function (retry) {
                    var _this = this;
                    if (retry === void 0) { retry = 0; }
                    this._nameService.getFullTeam().subscribe(function (n) {
                        _this.team = n.members.map(function (m) {
                            return {
                                "name": m.name,
                                "team": m.team,
                                "status": m.status
                            };
                        });
                    }, function (error) {
                        retry++;
                        if (retry < 4)
                            _this.getNames(retry);
                        console.error(error);
                    });
                };
                Members.prototype.saveTeam = function () {
                };
                Members.prototype.ngOnInit = function () {
                    this.getTeam();
                };
                Members = __decorate([
                    core_1.Component({
                        styles: [],
                        template: "\n    <section id=\"portfolio\">\n      <div class=\"container\">\n        <div class=\"row\" >\n          <div class=\"col-lg-12 text-center\">\n            <h2>Workflows</h2>\n            <hr class=\"star-primary\">\n          </div>\n        </div>\n        <div class=\"row\" >\n          <div class=\"col-sm-12 portfolio-item\" *ngFor=\"#member of team\">\n            {{member.name}} {{member.status}} {{member.team}}\n          </div>\n        </div>\n        <div class=\"row\" >\n          <div class=\"col-sm-2 portfolio-item page-scroll\">\n            <a href=\"#pairs\">\n              <button type=\"submit\" class=\"btn btn-success btn-lg\" (click)=\"saveTeam()\">Save</button>\n            </a>\n          </div>\n        </div>\n      </div>\n    </section>\n  ",
                    }), 
                    __metadata('design:paramtypes', [names_service_1.NameService])
                ], Members);
                return Members;
            }());
            exports_1("Members", Members);
        }
    }
});
//# sourceMappingURL=members.component.js.map