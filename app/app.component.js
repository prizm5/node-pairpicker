System.register(['angular2/core', './components/nav.component', './components/teams.component', './components/pairs.component', './components/footer.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, nav_component_1, teams_component_1, pairs_component_1, footer_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (nav_component_1_1) {
                nav_component_1 = nav_component_1_1;
            },
            function (teams_component_1_1) {
                teams_component_1 = teams_component_1_1;
            },
            function (pairs_component_1_1) {
                pairs_component_1 = pairs_component_1_1;
            },
            function (footer_component_1_1) {
                footer_component_1 = footer_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'Pair Picker';
                    this.isNavCollapsed = true;
                }
                AppComponent = __decorate([
                    core_1.Component({
                        styles: [],
                        selector: 'pairpicker',
                        template: "\n  <nav-section><h1>I nav loaded...</h1></nav-section>\n  <teams-section><h1>I nav loaded...</h1></teams-section>\n  <pairs-section><h1>I nav loaded...</h1></pairs-section>\n  <footer-section><h1>I footer loaded...</h1></footer-section>\n  ",
                        directives: [nav_component_1.Nav, teams_component_1.Teams, pairs_component_1.Pairs, footer_component_1.Footer]
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