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
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'Pair Picker';
                    this.isNavCollapsed = true;
                }
                AppComponent.prototype.toggleCollapse = function () {
                    this.isNavCollapsed = !this.isNavCollapsed;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: 'pairpicker',
                        template: "\n  <!--\n  <nav class=\"navbar navbar-dark bg-inverse dnd-noborder-radius\">\n    <button class=\"navbar-toggler hidden-md-up\" type=\"button\" (click)=\"toggleCollapse()\">\n      \u2630\n    </button>\n    <span class=\"navbar-brand dnd-nofloat hidden-md-up\">{{title}}</span>\n    <div class=\"navbar-toggleable-sm\" [class.collapse]=\"isNavCollapsed\">\n      <span class=\"navbar-brand hidden-sm-down\">{{title}}</span>\n      <ul class=\"nav navbar-nav\">\n        <li class=\"nav-item\" [class.active]=\"getLinkStyle('')\">\n          <a class=\"nav-link\" [routerLink]=\"['Spells']\"><span class=\"octicon octicon-flame\"></span> Spells</a>\n        </li>\n        <li class=\"nav-item\" [class.active]=\"getLinkStyle('/character')\">\n          <a class=\"nav-link\" [routerLink]=\"['Character']\"><span class=\"octicon octicon-person\"></span> Character</a>\n        </li>\n        <li class=\"nav-item\" [class.active]=\"getLinkStyle('/monsters')\">\n          <a class=\"nav-link\" [routerLink]=\"['Monsters']\"><i class=\"fa fa-optin-monster\"></i> Monsters</a>\n        </li>\n      </ul>\n    </div>\n  </nav>\n  -->\n  <div><h1>I loaded...</h1></div>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map