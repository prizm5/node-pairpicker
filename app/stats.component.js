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
    var Stats;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (names_service_1_1) {
                names_service_1 = names_service_1_1;
            }],
        execute: function() {
            Stats = (function () {
                function Stats(_nameService) {
                    this._nameService = _nameService;
                }
                ;
                Stats.prototype.getPairCounts = function (retry) {
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
                Stats.prototype.ngOnInit = function () {
                    this.getPairCounts();
                };
                Stats = __decorate([
                    core_1.Component({
                        styles: [],
                        template: "\n  <!-- Stats Grid Section -->\n    <section id=\"stats\">\n      <div class=\"container\">\n        <div class=\"row\" >\n          <div class=\"col-lg-12 text-center\">\n            <h2>Statistics</h2>\n            <hr class=\"star-primary\">\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-lg-12 text-center\">\n            <table class=\"table table-striped table-bordered dataTable no-footer text-left\" id=\"dataTables-example\" role=\"grid\">\n              <thead>\n                  <tr role=\"row\">\n                    <th class=\"sorting\" tabindex=\"0\" aria-controls=\"dataTables-example\" rowspan=\"1\" colspan=\"1\" >Name</th>\n                    <th class=\"sorting\" tabindex=\"0\" aria-controls=\"dataTables-example\" rowspan=\"1\" colspan=\"1\" >Pairs</th>\n                    <th class=\"sorting\" tabindex=\"0\" aria-controls=\"dataTables-example\" rowspan=\"1\" colspan=\"1\" >Odd</th>\n                    <th class=\"sorting\" tabindex=\"0\" aria-controls=\"dataTables-example\" rowspan=\"1\" colspan=\"1\" >Last</th>\n                  </tr>\n              </thead>\n              <tbody>\n                <tr class=\"gradeA odd stat-row\" role=\"row\" *ngFor=\"#stat of paircounts\">\n                  <td>{{stat.key}}</td>\n                  <td>{{stat.value.pairing ? stat.value.pairing.count : 0}}</td>\n                  <td>{{stat.value.odd ? stat.value.odd.count   : 0}}</td>\n                  <td>{{ 'N/A' }}</td>\n                </tr></tbody>\n            </table>\n          </div>\n        </div>\n      </div>\n    </section>\n  ",
                        inputs: ['paircounts'],
                    }), 
                    __metadata('design:paramtypes', [names_service_1.NameService])
                ], Stats);
                return Stats;
            }());
            exports_1("Stats", Stats);
        }
    }
});
//# sourceMappingURL=stats.component.js.map