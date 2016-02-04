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
                    <ul class="list-block">
                        <li *ngFor="#peep of pairing.pairs">{{peep}} ({{getCount(paircounts, peep)}})</li>
                    </ul>
                </div>
                <div class="col-sm-4 text-center">
                    <h3>Odd</h3>
                    <hr class="star-light">
                    <ul class="list-block">
                        <li *ngFor="#peep of pairing.odd">{{peep}} ({{oddcounts[peep.name] ? oddcounts[peep] : 0}})</li>
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
      console.log("Getting " + name + " from  " + data);
      var p = name.replace(" :: ",":");
      data[p] ? data[p] : 0
  }
  
  savePair(){
      this.onSavePairing.emit(this.pairing);
  }
}

