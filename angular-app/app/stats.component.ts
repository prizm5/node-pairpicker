import {Component, OnInit}    from 'angular2/core';
import {NameService}  from './services/names.service'

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
          <div class="col-lg-12 text-center">
            <table class="table table-striped table-bordered table-hover no-footer dtr-inline text-left" id="dataTables-example" role="grid">
              <thead>
                  <tr role="row">
                    <th class="sorting" tabindex="0" >Name</th>
                    <th class="sorting" tabindex="0" >Pairs</th>
                    <th class="sorting" tabindex="0" >Odd</th>
                    <th class="sorting" tabindex="0" >Last</th>
                  </tr>
              </thead>
              <tbody>
                <tr  class="odd stat-row" [class.odd]="i%2!==0" role="row" *ngFor="#stat of paircounts; #i = index">
                  <td class="col-sm-2">{{stat.key}}</td>
                  <td class="col-sm-2">{{addPairing(stat)}}</td>
                  <td class="col-sm-2">{{stat.value.odd ? stat.value.odd.count   : 0}}</td>
                  <td class="col-sm-2">{{ getLastDate(stat) }}</td>
                </tr></tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `,
  inputs: ['paircounts'],
})

export class Stats {
  public paircounts: any;;
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

  addPairing(stat: any){
    var pairing = stat.value.pairing ? stat.value.pairing.count   : 0;
    var intentional = stat.value.intentional ? stat.value.intentional.count   : 0;
    return pairing + intentional;
  }

   getLastDate(stat: any){
    var dte = [];
    if(stat.value.pairing) dte.push(stat.value.pairing.last_ts);
    if(stat.value.intentional) dte.push(stat.value.intentional.last_ts);
    if(stat.value.odd) dte.push(stat.value.odd.last_ts);
    return new Date(dte.sort().reverse()[0]).toLocaleDateString('en-US');
  }


  ngOnInit(): void {
    this.getPairCounts();
  }
 }
