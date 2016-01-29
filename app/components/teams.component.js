System.register(['angular2/core', './dev.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, dev_component_1;
    var Teams;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dev_component_1_1) {
                dev_component_1 = dev_component_1_1;
            }],
        execute: function() {
            Teams = (function () {
                function Teams() {
                }
                Teams = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: 'teams-section',
                        template: " \n   <!-- Portfolio Grid Section -->\n    <section id=\"portfolio\">\n        <div class=\"container\">\n            <div class=\"row\" >\n                <div class=\"col-lg-12 text-center\">\n                    <h2>Workflows</h2>\n                    <hr class=\"star-primary\">\n            </div>\n            <div class=\"col-sm-4 portfolio-item\" *ngFor=\"#team of teams\">\n                <h3>{{team.name}}</h3>\n                <hr />\n                <developer [peeps]=\"team.members\">i am developer</developer>\n            </div>\n         </div>\n         <div class=\"row\" >\n           \n            <div class=\"col-sm-4 portfolio-item\">\n              <a href=\"#pairs\">\n                    <button type=\"submit\" class=\"btn btn-success btn-lg\">Generate</button>\n                    </a>\n                </div>\n           \n         </div> \n       </div>\n    </section>\n  ",
                        inputs: ['teams'],
                        directives: [dev_component_1.Dev],
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