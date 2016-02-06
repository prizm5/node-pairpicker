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
                            <tr *ngFor="#peep of pairing.pairs" class="modal-body">
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
                <div class="col-sm-1 portfolio-item">
                    <a href="#myModal" class="portfolio-link" data-toggle="modal" >
                        <button type="submit" class="btn btn-primary btn-lg" (click)="savePair()">Save</button>
                    </a>
                </div>

            </div>
        </div>
    </section>
    <!-- Modal -->
    
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" >&times;</button>
                    <h4 class="modal-title" id="myModalLabel">Pairing</h4>
                </div>
                <div class="modal-body">
                   <p class="medium">Saved</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
<!-- /.modal -->    
  `,
  inputs: ['pairing', 'paircounts','oddcounts','canSavePairs'],
  outputs:['onSavePairing'],
})
export class Pairs {
  public pairing: Pairing;
  public onSavePairing = new EventEmitter();
  public paircounts = {};
  public oddcounts = {};
  public canSavePairs = false;
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
      if(this.pairing.pairs.length>0 && this.pairing.odd.length >0){
        this.canSavePairs=false;
        this.onSavePairing.emit(this.pairing);
      }
  }
}

