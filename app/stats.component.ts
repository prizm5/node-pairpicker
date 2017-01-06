import { Component, OnInit, Directive, ElementRef, Input } from 'angular2/core';
import { NameService } from './services/names.service'

declare var Chart: any;

@Directive({
  selector: '[charts-heatmap]',
  inputs: ['chartdata']
})
class HeatmapChartDirective {
  private datas: any;
  set chartdata(data: any) {
    this.datas = data;
    this.update();
  }

  constructor(private elementRef: ElementRef) { }
  private update() {
    if(this.datas){
      new Chart(this.elementRef.nativeElement.getContext('2d')).HeatMap(this.datas, { responsive: true });
    }
  }
}

@Component({
  styles: [],
  template: `
  <!-- Stats Grid Section -->
    <section id="stats">
      <div class="container">
        <div class="row" >
          <div class="col-lg-12 text-center">
            <h2>Statistics</h2>
            <hr class="star-primary">
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 text-center" width="800" height="800">
             <canvas id="heatmapz" charts-heatmap [chartdata]="pairdetails" ></canvas>
          </div>
        </div>
      </div>
    </section>
  `,
  inputs: ['paircounts'],
  directives: [HeatmapChartDirective]
})

export class Stats {
  public paircounts: any;
  public pairdetails: any;
  constructor(private _nameService: NameService) { }
  getPairCounts(retry: number = 0): void {
    this._nameService.getPairCounts().subscribe(
      n => {
        this.paircounts = n;
      },
      error => {
        retry++;
        if (retry < 4) this.getPairCounts(retry);
        console.error(error);
      });
  }
  getPairDetails(retry: number = 0): void {
    this._nameService.getPairDetails().subscribe(
      n => {
        var datas = this.parseData(n);
        var labels = this.getlabels(datas);
        var parted_data = this.partition(datas, labels);
        this.pairdetails = {
            labels : labels,
            datasets : Object.keys(parted_data).map(function(key){
              return { label: key, data: this.foldByP2(parted_data[key], labels) };
            }.bind(this))};
      },
      error => {
        retry++;
        if (retry < 4) this.getPairDetails(retry);
        console.error(error);
      });
  }
  addPairing(stat: any) {
    var pairing = stat.value.pairing ? stat.value.pairing.count : 0;
    var intentional = stat.value.intentional ? stat.value.intentional.count : 0;
    return pairing + intentional;
  }

  getLastDate(stat: any) {
    var dte = [];
    if (stat.value.pairing) dte.push(stat.value.pairing.last_ts);
    if (stat.value.intentional) dte.push(stat.value.intentional.last_ts);
    if (stat.value.odd) dte.push(stat.value.odd.last_ts);
    return new Date(dte.sort().reverse()[0]).toLocaleDateString('en-US');
  }
  /* ----------- */
  parseData(datas) {
    var cnt = 0;
    return Array.prototype.concat.apply([],
      datas.map(function (datum) { return datum['key']; }).map(function (datum) {
        if (datum.includes('::')) {
          var parts = datum.split(' :: ');
          return [{ p1: parts[0], p2: parts[1] }, { p1: parts[1], p2: parts[0] }];
        } else {
          return [{ p1: datum, p2: datum }];
        }
      }));
  };

  getlabels(datas) {
    var all_names = Array.prototype.concat.apply([], datas.map(function (datum) { return [datum.p1, datum.p2]; }));
    var distinct = function(data){
      var u = {}, a = [];
      for(var i = 0, l = data.length; i < l; ++i){
          if(u.hasOwnProperty(data[i])) {
            continue;
          }
          a.push(data[i]);
          u[data[i]] = 1;
      }
      return a;
    };
    return distinct(all_names).sort();
  };

  partition(datas, labels) {
    var res = {};
    labels.forEach(function (label) {
      res[label] = datas.filter(function (datum) { return datum.p1 === label; });
    });
    return res;
  };



  foldByP2(partitioned_data, labels) {
    var reduced = [];
    labels.forEach(function (label) { reduced.push(partitioned_data.filter(function (datum) { return datum.p2 === label; }).length); });
    return reduced;
  };

  /* ------------- */

  ngOnInit(): void {
    this.getPairCounts();
    this.getPairDetails();
  }
}
