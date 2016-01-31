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
    var Dev;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Dev = (function () {
                function Dev() {
                }
                Dev.prototype.onSelect = function (person) { console.log(person); };
                Dev.prototype.onToggleCheckbox = function (person, change) {
                    person.state = change;
                };
                Dev = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: 'developer',
                        template: "\n    <div class=\"input-group dev\" *ngFor=\"#peep of peeps\">\n        <span class=\"input-group-addon\" *ngIf=\"peep.shouldPair\">\n           <div class=\"cbx cbx-md cbx-active\" tabindex=\"1000\">\n           <span class=\"cbx-icon\">\n            <div [ngSwitch]=\"peep.state\">\n                    <template [ngSwitchWhen]=\"0\"><i class=\"glyphicon glyphicon-ok\" (click)=\"onToggleCheckbox(peep,1)\"></i></template>\n                    <template [ngSwitchWhen]=\"2\"><i class=\"glyphicon glyphicon-remove\" (click)=\"onToggleCheckbox(peep,0)\"></i></template>\n                    <template ngSwitchDefault><i class=\"glyphicon glyphicon-stop\" (click)=\"onToggleCheckbox(peep,2)\"></i></template>\n                </div>\n            </span>\n            </div>\n        </span>\n        <div type=\"text\" class=\"form-control\" aria-label=\"...\">{{peep.name}}</div>\n        <span class=\"input-group-addon\">\n            <a href=\"#\" class=\"btn btn-default btn-sm dev-btn-switch\" id=\"{{peep.name}}\" (click)=\"onSelect(peep)\" role=\"button\">&lt;-&gt;</a>\n        </span>\n    </div>\n  ",
                        inputs: ['peeps']
                    }), 
                    __metadata('design:paramtypes', [])
                ], Dev);
                return Dev;
            })();
            exports_1("Dev", Dev);
        }
    }
});
//# sourceMappingURL=dev.component.js.map