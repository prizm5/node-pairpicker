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
    var Teams;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Teams = (function () {
                function Teams() {
                }
                Teams = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: 'teams-section',
                        template: " \n   <!-- Portfolio Grid Section -->\n    <section id=\"portfolio\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-lg-12 text-center\">\n                    <h2>Workflows</h2>\n                    <hr class=\"star-primary\">\n                </div>\n           \n            <div class=\"col-sm-4 portfolio-item\">\n                <h3>V5 Dev</h3>\n                <hr />\n                <div class=\"input-group dev\">\n                    <span class=\"input-group-addon\">\n                        <div class=\"cbx-container\">\n                            <div class=\"cbx cbx-md cbx-active\" tabindex=\"1000\">\n                                <span class=\"cbx-icon\">\n                                    <i class=\"glyphicon glyphicon-ok\"></i>\n                                </span>\n                            </div>\n                            <div>\n                                <input type=\"checkbox\" class=\"names\" value=\"1\" id=\"Keith\" checked=\"checked\" aria-label=\"...\" style=\"display: none;\">\n                            </div>\n                        </div>\n                    </span>\n                    <div type=\"text\" class=\"form-control\" aria-label=\"...\">Keith</div>\n                    <span class=\"input-group-addon\">\n                        <a href=\"#\" class=\"btn btn-default btn-sm dev-btn-switch\" id=\"Keith\" role=\"button\">--&gt;</a>\n                    </span>\n                </div>\n            </div>\n            <div class=\"col-sm-4 portfolio-item\">\n                <h3>Cloud</h3>\n                <hr />\n                <div class=\"input-group dev\">\n                    <span class=\"input-group-addon\">\n                        <a href=\"#\" class=\"btn btn-default btn-sm dev-btn-switch\" id=\"Keith\" role=\"button\">&lt;--</a>\n                    </span>\n                    <div type=\"text\" class=\"form-control\" aria-label=\"...\">Keith</div>\n                    \n                </div>\n            </div>\n             </div>\n            <div class=\"row\">\n                <div class=\"col-sm-4 portfolio-item\">\n                    <button type=\"submit\" class=\"btn btn-success btn-lg\">Generate</button>\n                </div>\n            </div>\n            \n        </div>\n    </section>\n    \n  "
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