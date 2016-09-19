import {Component, OnInit} from 'angular2/core';

import {Nav} from './components/nav.component';
import {Teams} from './components/teams.component';
import {Pairs} from './components/pairs.component';
import {NameService} from './services/names.service';
import {JSONP_PROVIDERS}  from 'angular2/http';

import {Team} from './models/team';
import {State} from './models/person';
import {Pairing} from './models/pairing';
import {IntentionalPairs} from './models/intentional-pairs';
import 'rxjs/Rx';

@Component({
  styles: [],
  template: `
    <teams-section
      [teams]="allteams"
      [intentionalPairs]="intentionalPairs"
      (onPairingGenerated)="updatePairing($event)"
      (onSwitchTeam)="switchTeamMember($event)">
      <h1>I teams loaded...</h1>
    </teams-section>
    <pairs-section
      [pairing]="pairing"
      [intentionalPairs]="intentionalPairs"
      [paircounts]="paircounts"
      [oddcounts]="oddcounts"
      [canSavePairs]='canSave'
      [foosball]='foosball'
      (onSavePairing)="savePairing($event)">
      <h1>I pairs loaded...</h1>
    </pairs-section>
  `,
  directives: [Nav, Teams, Pairs],
})

export class Picker implements OnInit {
  public title = 'Pair Picker';
  public isNavCollapsed = true;
  public allteams: Team[];
  public pairing: Pairing;
  public intentionalPairs: IntentionalPairs;
  public paircounts = {};
  public oddcounts = {};
  public canSave = false;
  public foosball = false;

  constructor(private _nameService: NameService) { }

  switchTeamMember(t: { name: string; team: string; }): void {
    if (t.name) {
      var fromteam = this.allteams.filter(n => n.name === t.team)[0];
      var toteam = this.allteams.filter(n => n.name !== t.team)[0];

      var move = fromteam.members.filter(m => m.name === t.name)[0];
      fromteam.members = fromteam.members.filter(m => m.name !== t.name);
      move.shouldPair = t.team !== "V5";

      toteam.members.push(move);
      this.moveTeam(t.name, t.team);
    }
  }

  moveTeam(name: string, team: string, retry = 0): void {
    this._nameService.moveTeam(name, team)
      .subscribe(() => console.debug(`Moved ${name} from ${team}`),
      error => {
        retry++;
        if (retry < 4) this.moveTeam(name, team, retry);
        console.error(`error sending to slack: ${error}`);
      });
  }

  savePairingToDb(p: Pairing, retry = 0): void {
    this._nameService.savePair(p)
      .subscribe(
      a => console.debug(`pairing saved : ${a}`),
      error => {
        retry++;
        if (retry < 4) this.savePairingToDb(p, retry);
        console.error(`error saving pairing: ${error}`)
      });
  }

  savePairing(p: Pairing): void {
    this.canSave = false;
    this.savePairingToDb(p);

    this._nameService.sendToSlack(p)
      .subscribe(
      a => console.debug(`sent to slack : ${a}`),
      error => console.error(`error sending to slack: ${error}`));
  }

  updatePairing(p: Pairing): void {

    this.foosball = false;
    this.pairing = p;
    this.getPairCounts();
    this.canSave = true;

  }

  getNames(retry: number = 0): void {
    this._nameService.getTeam().subscribe(
      n => {

        n.filter(f => f.key == 'V5' ).reverse().forEach(t => {
          t.value.forEach(v => {
            v.shouldPair = true;
            v.state = State.RandomPairing;
          });

          this.allteams.push({ 'name': t.key, 'members': t.value });
        });
        n.filter(f => f.key == 'Cloud').reverse().forEach(t => {
          t.value.forEach(v => {
            v.shouldPair = false;
            v.state = State.RandomPairing;
          });

          this.allteams.push({ 'name': t.key, 'members': t.value });
        });
      },
      error => {
        retry++;
        if (retry < 4) this.getNames(retry);
        console.error(error);
      });
  }

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
    this.allteams = [];
    this.pairing = new Pairing();
    this.intentionalPairs = new IntentionalPairs();
    this.getNames();
    this.getPairCounts();
  }
}
