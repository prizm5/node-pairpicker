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
                                <td>({{getPairCount(paircounts, peep)}})</td>
                            </tr>
                        </tbody>
                     </table>
                </div>
                <div class="col-sm-4 text-center">
                    <h3>Odd</h3>
                    <hr class="star-light">
                    <ul class="list-block">
                        <li *ngFor="#peep of pairing.odd">{{peep}} ({{getCount(oddcounts,peep)}})</li>
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
  getlocaldt(dt){ return dt ? new Date(dt).toLocaleDateString("en-US") : null;}
  
  getPairCount(data, name){
      if(data){
          var c = data.filter(a => a.key == name);
          if(c[0]){
              if(c[0].value.pairing) {
                var p = c[0].value.pairing.count;
                var pdt = new Date(c[0].value.pairing.last_ts);
              }
              if(c[0].value.intentional) { 
                var i =  c[0].value.intentional.count;
                var idt = new Date(c[0].value.intentional.last_ts);
              }
              var dt: Date;
              if(pdt >>> idt) 
                 dt = pdt;
              else
                 dt = idt;
              return p + " | " + (i || 0)  + " | " + (dt.toLocaleDateString("en-US") || "N/A");
          }
          return "0";
      }
      return "0"; 
  }
  
  getCount(data, name){
      if(data){
          var c = data.filter(a => a.key == name);
          return c[0].value.odd ? c[0].value.odd.count + " | " 
            + this.getlocaldt(c[0].value.odd.last_ts)  : 0;
      }
      return "0";
  }
  
  savePair(){
      if(this.pairing.pairs.length > 0 || this.pairing.odd.length > 0){
        this.canSavePairs=false;
        this.onSavePairing.emit(this.pairing);
      }
  }
}

