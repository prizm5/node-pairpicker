System.register(['angular2/core', './services/names.service'], function(exports_1, context_1) {
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
    var core_1, names_service_1;
    var HeatmapChartDirective, Stats;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (names_service_1_1) {
                names_service_1 = names_service_1_1;
            }],
        execute: function() {
            HeatmapChartDirective = (function () {
                function HeatmapChartDirective(elementRef) {
                    this.elementRef = elementRef;
                }
                Object.defineProperty(HeatmapChartDirective.prototype, "chartdata", {
                    set: function (data) {
                        this.datas = data;
                        this.update();
                    },
                    enumerable: true,
                    configurable: true
                });
                HeatmapChartDirective.prototype.update = function () {
                    if (this.datas) {
                        new Chart(this.elementRef.nativeElement.getContext('2d')).HeatMap(this.datas, { responsive: true });
                    }
                };
                HeatmapChartDirective = __decorate([
                    core_1.Directive({
                        selector: '[charts-heatmap]',
                        inputs: ['chartdata']
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], HeatmapChartDirective);
                return HeatmapChartDirective;
            }());
            Stats = (function () {
                function Stats(_nameService) {
                    this._nameService = _nameService;
                }
                Stats.prototype.getPairCounts = function (retry) {
                    var _this = this;
                    if (retry === void 0) { retry = 0; }
                    this._nameService.getPairCounts().subscribe(function (n) {
                        _this.paircounts = n;
                    }, function (error) {
                        retry++;
                        if (retry < 4)
                            _this.getPairCounts(retry);
                        console.error(error);
                    });
                };
                Stats.prototype.getPairDetails = function (retry) {
                    var _this = this;
                    if (retry === void 0) { retry = 0; }
                    this._nameService.getPairDetails().subscribe(function (n) {
                        var datas = _this.parseData(n);
                        var labels = _this.getlabels(datas);
                        var parted_data = _this.partition(datas, labels);
                        _this.pairdetails = {
                            labels: labels,
                            datasets: Object.keys(parted_data).map(function (key) {
                                return { label: key, data: this.foldByP2(parted_data[key], labels) };
                            }.bind(_this)) };
                    }, function (error) {
                        retry++;
                        if (retry < 4)
                            _this.getPairDetails(retry);
                        console.error(error);
                    });
                };
                Stats.prototype.addPairing = function (stat) {
                    var pairing = stat.value.pairing ? stat.value.pairing.count : 0;
                    var intentional = stat.value.intentional ? stat.value.intentional.count : 0;
                    return pairing + intentional;
                };
                Stats.prototype.getLastDate = function (stat) {
                    var dte = [];
                    if (stat.value.pairing)
                        dte.push(stat.value.pairing.last_ts);
                    if (stat.value.intentional)
                        dte.push(stat.value.intentional.last_ts);
                    if (stat.value.odd)
                        dte.push(stat.value.odd.last_ts);
                    return new Date(dte.sort().reverse()[0]).toLocaleDateString('en-US');
                };
                /* ----------- */
                Stats.prototype.parseData = function (datas) {
                    var cnt = 0;
                    return Array.prototype.concat.apply([], datas.map(function (datum) { return datum['key']; }).map(function (datum) {
                        if (datum.includes('::')) {
                            var parts = datum.split(' :: ');
                            return [{ p1: parts[0], p2: parts[1] }, { p1: parts[1], p2: parts[0] }];
                        }
                        else {
                            return [{ p1: datum, p2: datum }];
                        }
                    }));
                };
                ;
                Stats.prototype.getlabels = function (datas) {
                    var all_names = Array.prototype.concat.apply([], datas.map(function (datum) { return [datum.p1, datum.p2]; }));
                    var distinct = function (data) {
                        var u = {}, a = [];
                        for (var i = 0, l = data.length; i < l; ++i) {
                            if (u.hasOwnProperty(data[i])) {
                                continue;
                            }
                            a.push(data[i]);
                            u[data[i]] = 1;
                        }
                        return a;
                    };
                    return distinct(all_names).sort();
                };
                ;
                Stats.prototype.partition = function (datas, labels) {
                    var res = {};
                    labels.forEach(function (label) {
                        res[label] = datas.filter(function (datum) { return datum.p1 === label; });
                    });
                    return res;
                };
                ;
                Stats.prototype.foldByP2 = function (partitioned_data, labels) {
                    var reduced = [];
                    labels.forEach(function (label) { reduced.push(partitioned_data.filter(function (datum) { return datum.p2 === label; }).length); });
                    return reduced;
                };
                ;
                /* ------------- */
                Stats.prototype.ngOnInit = function () {
                    this.getPairCounts();
                    this.getPairDetails();
                };
                Stats = __decorate([
                    core_1.Component({
                        styles: [],
                        template: "\n  <!-- Stats Grid Section -->\n    <section id=\"stats\">\n      <div class=\"container\">\n        <div class=\"row\" >\n          <div class=\"col-lg-12 text-center\">\n            <h2>Statistics</h2>\n            <hr class=\"star-primary\">\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-lg-12 text-center\" width=\"800\" height=\"800\">\n             <canvas id=\"heatmapz\" charts-heatmap [chartdata]=\"pairdetails\" ></canvas>\n          </div>\n        </div>\n      </div>\n    </section>\n  ",
                        inputs: ['paircounts'],
                        directives: [HeatmapChartDirective]
                    }), 
                    __metadata('design:paramtypes', [names_service_1.NameService])
                ], Stats);
                return Stats;
            }());
            exports_1("Stats", Stats);
        }
    }
});
//# sourceMappingURL=stats.component.1.js.map