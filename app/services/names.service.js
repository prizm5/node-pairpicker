System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
    var NameService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            NameService = (function () {
                function NameService(http) {
                    this.http = http;
                    this.searchtoken = window.location.search;
                    this.headers = new http_1.Headers();
                    this.headers.append('Content-Type', 'application/json');
                }
                NameService.prototype.getTeam = function () {
                    return this.http.get('api/data/team' + this.searchtoken)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                NameService.prototype.getPairCounts = function () {
                    return this.http.get('api/data/paircounts' + this.searchtoken)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                NameService.prototype.getOddCounts = function () {
                    return this.http.get('api/data/oddcounts' + this.searchtoken)
                        .map(function (res) { return res.json(); })
                        .catch(this.logAndPassOn);
                };
                NameService.prototype.sendToSlack = function (p) {
                    return this.http.post('api' + this.searchtoken, JSON.stringify(p), { headers: this.headers })
                        .catch(this.logAndPassOn);
                };
                NameService.prototype.savePair = function (p) {
                    return this.http.post('api/savePair' + this.searchtoken, JSON.stringify(p), { headers: this.headers })
                        .catch(this.logAndPassOn);
                };
                NameService.prototype.moveTeam = function (p, teamname) {
                    var url = '';
                    switch (teamname) {
                        case "cloud":
                            url = 'api/moveToDev';
                            break;
                        case "V5":
                            url = 'api/moveToCloud';
                            break;
                    }
                    return this.http.post(url + this.searchtoken, JSON.stringify({ name: p }), { headers: this.headers })
                        .catch(this.logAndPassOn);
                };
                NameService.prototype.logAndPassOn = function (error) {
                    // in a real world app, we may send the server to some remote logging infrastructure
                    // instead of just logging it to the console
                    console.error(error);
                    return Observable_1.Observable.throw(error);
                };
                NameService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], NameService);
                return NameService;
            }());
            exports_1("NameService", NameService);
        }
    }
});
//# sourceMappingURL=names.service.js.map