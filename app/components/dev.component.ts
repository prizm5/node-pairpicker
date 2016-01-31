import {Component}              from 'angular2/core';
import {Person} from '../models/person'
import {Team} from '../models/team'

@Component({
    styles: [],
    selector: 'developer',
    template: `
    <div class="input-group dev" *ngFor="#peep of peeps">
        <span class="input-group-addon" *ngIf="peep.shouldPair">
           <div class="cbx cbx-md cbx-active" tabindex="1000">
           <span class="cbx-icon">
            <div [ngSwitch]="peep.state">
                    <template [ngSwitchWhen]="0"><i class="glyphicon glyphicon-ok"></i></template>
                    <template [ngSwitchWhen]="1">Ready</template>
                    <template ngSwitchDefault>{{peep.state}}</template>
                </div>
            </span>
            </div>
        </span>
        <div type="text" class="form-control" aria-label="...">{{peep.name}}</div>
        <span class="input-group-addon">
            <a href="#" class="btn btn-default btn-sm dev-btn-switch" id="{{peep.name}}" (click)="onSelect(peep)" role="button">&lt;-&gt;</a>
        </span>
    </div>
  `
    ,
    inputs: ['peeps']
})
export class Dev {
    public peeps: Person[];
    constructor() { }
    onSelect(person: Person) { console.log(person); }
}