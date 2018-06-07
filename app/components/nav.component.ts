import {Component, EventEmitter} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Picker} from '../picker.component'
import { c9status } from "../models/c9status";

@Component({
  styles:[],
  selector: 'nav-section',
  template: `
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header page-scroll">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <img src="img/icon-pairing-trans.png" id="logo">
          <a class="navbar-brand" href="#page-top">Pair Picker</a>
        </div>
         <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li class="page-scroll">
                        <a [routerLink]="['Picker']">Pair Picker</a>
                    </li>
                    <li class="page-scroll">
                        <a [routerLink]="['Stats']">Stats</a>
                    </li>
                    <li class="page-scroll">
                        <a [routerLink]="['Members']">Members</a>
                    </li>

                    <li class="page-scroll">
                      <a href="#myModal" data-toggle="modal">
                        Cloud9
                      </a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->

      </div>
    <!-- /.container-fluid -->
    </nav>
  <!-- /.modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" >&times;</button>
            <h4 class="modal-title" id="myModalLabel">Cloud9 Controller</h4>
          </div>
          <div class="modal-body">
            <button *ngIf="cloud9status.status == 'Offline'" type="button" class="btn btn-default" (click)="startCloud9()">Start Cloud9</button>
            <button *ngIf="cloud9status.status == 'Online'" type="button" class="btn btn-default" (click)="stopCloud9()">Stop Cloud9</button>
            <a href="http://readypair.com:8181/ide.html" target="_blank" > 
              <button type="button" class="btn btn-default">Open Cloud9</button>
             </a>
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
  directives: [ROUTER_DIRECTIVES],
  inputs: ["cloud9status"],
  outputs: ["onStartCloud9", "onStopCloud9"],
})

export class Nav {
  public cloud9status: c9status;
  public onStartCloud9 = new EventEmitter();
  public onStopCloud9 = new EventEmitter();
  constructor () {
    this.cloud9status  = {"status" : 'Offline'}; 
   }
  stopCloud9(): void {
    this.onStopCloud9.emit('');
  }
  startCloud9(): void {
    this.onStartCloud9.emit('');
  }
}
