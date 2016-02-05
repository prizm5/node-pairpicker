import {Component, EventEmitter}              from 'angular2/core';
import {Pairing} from '../models/pair'

@Component({
  styles:[],
  selector: 'pairs-section',
  template: `
    
    <!-- Pairs Section -->
    <section class="success" id="pairs">
        <div class="container">
            <div class="row">
                <div class="col-sm-4 text-center">
                    <h3>Pairs</h3>
                    <hr class="star-light">
                     <table class="table">
                        <tbody>
                            <tr *ngFor="#peep of pairing.pairs">
                                <td>{{peep.split(' :: ')[0]}}</td>
                                <td>{{peep.split(' :: ')[1]}}</td>
                                <td>({{getCount(paircounts, peep)}})</td>
                            </tr>
                        </tbody>
                     </table>
                    
                </div>
                <div class="col-sm-4 text-center">
                    <h3>Odd</h3>
                    <hr class="star-light">
                    <ul class="list-block">
                        <li *ngFor="#peep of pairing.odd">{{peep}} ({{oddcounts[peep] ? oddcounts[peep] : 0}})</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <hr>
                <div class="col-sm-3 portfolio-item">
                    <a href="#pairs">
                        <button type="submit" class="btn btn-primary btn-lg" (click)="savePair()">Save</button>
                    </a>
                </div>
            </div>
        </div>
    </section>
    
  `,
  inputs: ['pairing', 'paircounts','oddcounts'],
  outputs:['onSavePairing'],
})
export class Pairs {
  public pairing: Pairing;
  public onSavePairing = new EventEmitter();
  public paircounts = {};
  public oddcounts = {};
  constructor() { }
  
  getCount(data, name){
      var f = name.split(" :: ");
      var key1 = f[0] + ":" + f[1];
      var key2 = f[1] + ":" + f[0];
      if(data[key1]){
          return data[key1];
      }
      if(data[key2]){
          return data[key2];
      }
      return 0;
  }
  
  savePair(){
      this.onSavePairing.emit(this.pairing);
  }
}

