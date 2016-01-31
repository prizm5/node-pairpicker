System.register(['angular2/core'], function(exports_1) {
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
    var Pairs;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Pairs = (function () {
                function Pairs() {
                }
                Pairs = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: 'pairs-section',
                        template: "\n    \n    <!-- Pairs Section -->\n    <section class=\"success\" id=\"pairs\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-sm-3 text-center\">\n                    <h3>Pairs</h3>\n                    <hr class=\"star-light\">\n                    <ul class=\"list-block\">\n                        <li *ngFor=\"#peep of pairing.pairs\">{{peep}}</li>\n                    </ul>\n                </div>\n                <div class=\"col-sm-3 text-center\">\n                    <h3>Odd</h3>\n                    <hr class=\"star-light\">\n                    <ul class=\"list-block\">\n                        <li *ngFor=\"#peep of pairing.odd\">{{peep}}</li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"row\">\n                <hr>\n                <div class=\"col-sm-2 portfolio-item\">\n                    <a href=\"#pairs\">\n                        <button type=\"submit\" class=\"btn btn-success btn-lg\">Save</button>\n                    </a>\n                </div>\n            </div>\n        </div>\n    </section>\n    \n  ",
                        inputs: ['pairing']
                    }), 
                    __metadata('design:paramtypes', [])
                ], Pairs);
                return Pairs;
            })();
            exports_1("Pairs", Pairs);
        }
    }
});
//# sourceMappingURL=pairs.component.js.map