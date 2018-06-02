System.register(["angular2/core", 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, router_1;
    var Nav;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            Nav = (function () {
                function Nav() {
                    this.onStartCloud9 = new core_1.EventEmitter();
                    this.onStopCloud9 = new core_1.EventEmitter();
                }
                Nav.prototype.stopCloud9 = function () {
                    this.onStopCloud9.emit('');
                };
                Nav.prototype.startCloud9 = function () {
                    this.onStartCloud9.emit('');
                };
                Nav = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: 'nav-section',
                        template: "\n    <!-- Navigation -->\n    <nav class=\"navbar navbar-default navbar-fixed-top\">\n      <div class=\"container\">\n        <!-- Brand and toggle get grouped for better mobile display -->\n        <div class=\"navbar-header page-scroll\">\n          <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n          <img src=\"img/icon-pairing-trans.png\" id=\"logo\">\n          <a class=\"navbar-brand\" href=\"#page-top\">Pair Picker</a>\n        </div>\n         <!-- Collect the nav links, forms, and other content for toggling -->\n            <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n                <ul class=\"nav navbar-nav navbar-right\">\n                    <li class=\"page-scroll\">\n                        <a [routerLink]=\"['Picker']\">Pair Picker</a>\n                    </li>\n                    <li class=\"page-scroll\">\n                        <a [routerLink]=\"['Stats']\">Stats</a>\n                    </li>\n                    <li class=\"page-scroll\">\n                        <a [routerLink]=\"['Members']\">Members</a>\n                    </li>\n\n                    <li class=\"page-scroll\">\n                      <a href=\"#myModal\" data-toggle=\"modal\">\n                        Cloud9\n                      </a>\n                    </li>\n                </ul>\n            </div>\n            <!-- /.navbar-collapse -->\n\n      </div>\n    <!-- /.container-fluid -->\n    </nav>\n  <!-- /.modal -->\n    <div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" >\n      <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" >&times;</button>\n            <h4 class=\"modal-title\" id=\"myModalLabel\">Cloud9 Controller</h4>\n          </div>\n          <div class=\"modal-body\">\n            <button type=\"button\" class=\"btn btn-default\" (click)=\"startCloud9()\">Start Cloud9</button>\n            <button type=\"button\" class=\"btn btn-default\" (click)=\"stopCloud9()\">Stop Cloud9</button>\n            <a href=\"http://readypair.com:8181/ide.html\" target=\"_blank\" > \n              <button type=\"button\" class=\"btn btn-default\">Open Cloud9</button>\n             </a>\n\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n          </div>\n        </div>\n      <!-- /.modal-content -->\n      </div>\n    <!-- /.modal-dialog -->\n    </div>\n  <!-- /.modal -->\n  ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        outputs: ["onStartCloud9", "onStopCloud9"],
                    }), 
                    __metadata('design:paramtypes', [])
                ], Nav);
                return Nav;
            }());
            exports_1("Nav", Nav);
        }
    }
});
//# sourceMappingURL=nav.component.js.map