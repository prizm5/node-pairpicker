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
            <table class="table table-striped table-bordered dataTable no-footer text-left" id="dataTables-example" role="grid">
              <thead>
                  <tr role="row">
                    <th class="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" >Name</th>
                    <th class="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" >Pairs</th>
                    <th class="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" >Odd</th>
                    <th class="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" >Last</th>
                  </tr>
              </thead>
              <tbody>
                <tr class="gradeA odd stat-row" role="row" *ngFor="#stat of paircounts">
                  <td>{{stat.key}}</td>
                  <td>{{stat.value.pairing ? stat.value.pairing.count : 0}}</td>
                  <td>{{stat.value.odd ? stat.value.odd.count   : 0}}</td>
                  <td>{{ 'N/A' }}</td>
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
   ngOnInit(): void {
    this.getPairCounts();
  }
 }
