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
                <div class="col-sm-1 portfolio-item">
                    
                    <a href="#myModal" class="portfolio-link" data-toggle="modal">
                        <button type="submit" class="btn btn-primary btn-lg" (click)="savePair()">Save</button>
                    </a>
                </div>
                 <!-- Modal -->
                            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                            <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                                        </div>
                                        <div class="modal-body">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary">Save changes</button>
                                        </div>
                                    </div>
                                    <!-- /.modal-content -->
                                </div>
                                <!-- /.modal-dialog -->
                            </div>
                            <!-- /.modal -->
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

