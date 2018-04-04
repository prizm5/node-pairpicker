import {Component, OnInit} from 'angular2/core';

import {Nav} from './components/nav.component';
import {Teams} from './components/teams.component';
import {Pairs} from './components/pairs.component';
import {NameService} from './services/names.service';
import {JSONP_PROVIDERS}  from 'angular2/http';

import {Team} from './models/team';
import {State} from './models/person';
import {Pairing, Pair, ParingSession} from './models/pairing';
import {IntentionalPairs} from './models/intentional-pairs';
import 'rxjs/Rx';

@Component({
  styles: [],
  template: `
    <teams-section
      [teams]="allteams"
      [lastPairingSession]="lastPairingSession"
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
  public lastPairingSession : ParingSession;

  constructor(private _nameService: NameService) { }

  switchTeamMember(t: { name: string; team: string; }): void {
    if (t.name) {
      var fromteam = this.allteams.filter(n => n.name === t.team)[0];
      var toteam = this.allteams.filter(n => n.name !== t.team)[0] || {members:[]} ;

      var move = fromteam.members.filter(m => m.name === t.name)[0];
      fromteam.members = fromteam.members.filter(m => m.name !== t.name);
      move.shouldPair = t.team !== "V5";

      //if (!toteam.members) {
      //  toteam.members = [];
      //}
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
        console.error(`error moving team: ${error}`);
      });
  }

  savePairingToDb(p: Pairing, retry = 0): void {
    this._nameService.savePair(p)
      .subscribe(
      a => {
        console.debug(`pairing saved : ${a}`)
        this.getLastPairSesion()},
      error => {
        retry++;
        if (retry < 4) this.savePairingToDb(p, retry);
        console.error(`error saving pairing: ${error}`)
      });
  }

  savePairing(p: Pairing): void {
    this.canSave = false;
    this.savePairingToDb(p);
  }

  updatePairing(p: Pairing): void {
    this.pairing = p;
    this.getPairCounts();
    this.canSave = true;
  }

  getLastPairSesion(retry: number = 0) : void {
    this._nameService.getLastParing().subscribe(
      n => {
        var x = n.pairs.map( p => p.split(' :: '));
        var timestamp = n.timestamp;
        var pairs = x.filter(f => f.length !== 1).map(p => {return new Pair(p[0], p[1])});
        var odds = x.filter(f => f.length === 1).map(p =>  {return p[0]});
        var pairsession = new ParingSession(timestamp, pairs, odds);
        this.lastPairingSession = pairsession;
      },
      error => {
        retry++;
        if (retry < 4) this.getNames(retry);
        console.error(error);
      });
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
    this.getLastPairSesion();
    this.intentionalPairs = new IntentionalPairs();
    this.lastPairingSession = new ParingSession(null,[],[]);
    this.getNames();
    this.getPairCounts();
  }
}
