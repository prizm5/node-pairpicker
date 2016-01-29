import {Component}              from 'angular2/core';
import {Person} from '../models/person'
import {Team} from '../models/team'

@Component({
  styles:[],
  selector: 'developer',
  template: `
    <div class="input-group dev" *ngFor="#peep of peeps">
        <span class="input-group-addon" *ngIf="peep.shouldPair">
            <div class="cbx-container">
                <div class="cbx cbx-md cbx-active" tabindex="1000">
                    <span class="cbx-icon">
                        <i class="glyphicon glyphicon-ok"></i>
                    </span>
                </div>
                <div >
                    <input type="checkbox" class="names" value="1" id="{{peep.name}}" 
                        checked="checked" aria-label="..." style="display: none;">
                </div>
            </div>
        </span>
        <div type="text" class="form-control" aria-label="...">{{peep.name}}</div>
        <span class="input-group-addon">
            <a href="#" class="btn btn-default btn-sm dev-btn-switch" id="{{peep.name}}" role="button">&lt;-&gt;</a>
        </span>
    </div>
  `
  ,
  inputs: ['peeps']
})
export class Dev {
  public peeps: Person[];
  constructor() { }
}
