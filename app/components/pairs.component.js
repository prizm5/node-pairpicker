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
                    this.onSavePairing = new core_1.EventEmitter();
                    this.paircounts = {};
                    this.oddcounts = {};
                    this.canSavePairs = false;
                }
                Pairs.prototype.getCount = function (data, name) {
                    if (data) {
                        var c = data.filter(function (a) { return a.key == name; });
                        return c[0] ? c[0].value : 0;
                    }
                    return 0;
                };
                Pairs.prototype.savePair = function () {
                    if (this.pairing.pairs.length > 0 || this.pairing.odd.length > 0) {
                        this.canSavePairs = false;
                        this.onSavePairing.emit(this.pairing);
                    }
                };
                Pairs = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: 'pairs-section',
                        template: "\n    \n    <!-- Pairs Section -->\n    <section class=\"success\" id=\"pairs\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-sm-4 text-center\">\n                    <h3>Pairs</h3>\n                    <hr class=\"star-light\">\n                     <table class=\"table\">\n                        <tbody>\n                            <tr *ngFor=\"#peep of pairing.pairs\" class=\"modal-body\">\n                                <td>{{peep.split(' :: ')[0]}}</td>\n                                <td>{{peep.split(' :: ')[1]}}</td>\n                                <td>({{getCount(paircounts, peep)}})</td>\n                            </tr>\n                        </tbody>\n                     </table>\n                </div>\n                <div class=\"col-sm-4 text-center\">\n                    <h3>Odd</h3>\n                    <hr class=\"star-light\">\n                    <ul class=\"list-block\">\n                        <li *ngFor=\"#peep of pairing.odd\">{{peep}} ({{getCount(oddcounts,peep)}})</li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"row\">\n                <hr>\n                <div class=\"col-sm-1 portfolio-item\">\n                    <a href=\"#myModal\" class=\"portfolio-link\" data-toggle=\"modal\">\n                        <button type=\"submit\" class=\"btn btn-primary btn-lg\" (click)=\"savePair()\">Save</button>\n                    </a>\n                </div>\n\n            </div>\n        </div>\n    </section>\n    <!-- Modal -->\n    \n    <div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" >\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" >&times;</button>\n                    <h4 class=\"modal-title\" id=\"myModalLabel\">Pairing</h4>\n                </div>\n                <div class=\"modal-body\">\n                   <p class=\"medium\">Saved</p>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                </div>\n            </div>\n            <!-- /.modal-content -->\n        </div>\n        <!-- /.modal-dialog -->\n    </div>\n<!-- /.modal -->    \n  ",
                        inputs: ['pairing', 'paircounts', 'oddcounts', 'canSavePairs'],
                        outputs: ['onSavePairing'],
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