System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var Stats;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Stats = (function () {
                function Stats() {
                }
                Stats = __decorate([
                    core_1.Component({
                        styles: [],
                        template: "\n  <!-- Stats Grid Section -->\n    <section id=\"stats\">\n      <div class=\"container\">\n        <div class=\"row\" >\n          <div class=\"col-lg-12 text-center\">\n            <h2>Statistics</h2>\n            <hr class=\"star-primary\">\n          </div>\n        </div>\n        <div class=\"row\">\n          Hellllllooooo Stats\n        </div>\n\n      </div>\n    </section>\n\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], Stats);
                return Stats;
            }());
            exports_1("Stats", Stats);
        }
    }
});
//# sourceMappingURL=stats.component.js.map