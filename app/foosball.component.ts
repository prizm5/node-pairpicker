import {Component} from 'angular2/core';
import {NameService} from './services/names.service';
import {Teams} from './components/teams.component';
import {Pairs} from './components/pairs.component';
import {Team} from './models/team';
import {State} from './models/person';

import {Dev} from './components/dev.component';
@Component({
  styles: [],
  template: `
         <teams-section
      [teams]="allteams"
      [intentionalPairs]="intentionalPairs"
      (onPairingGenerated)="updatePairing($event)"
      (onSwitchTeam)="switchTeamMember($event)">
      <h1>I nav loaded...</h1>
    </teams-section>
    <pairs-section
      [pairing]="pairing"
      [intentionalPairs]="intentionalPairs"
      [paircounts]="paircounts"
      [oddcounts]="oddcounts"
      [canSavePairs]='canSave'
      (onSavePairing)="savePairing($event)">
      <h1>I nav loaded...</h1>
    </pairs-section>
  `,
  directives: [Dev]
})

export class Foosball {
    public title = 'Pair Picker';
  public isNavCollapsed = true;
  public allteams: Team[];
  public pairing: Pairing;
  public intentionalPairs: IntentionalPairs;
  public paircounts = {};
  public oddcounts = {};
  public canSave = false;

  constructor(private _nameService: NameService) { }
  getFoosballerz(): void {
    this._nameService.getFoosball().subscribe(
      n => {

          n[0].value.forEach(v => {
            v.shouldPair = true;
            v.state = State.RandomPairing;
          });


          this.allteams.push({ 'name': 'Foozballerz', 'members': n[0].value });
      },
      error => {
        console.error(error);
      });
  }


  ngOnInit(): void {
    this.getFoosballerz();
  }
}
