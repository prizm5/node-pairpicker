import {Component, OnInit} from 'angular2/core';

import {Nav} from './components/nav.component';
import {Teams} from './components/teams.component';
import {Pairs} from './components/pairs.component';
import {Footer} from './components/footer.component';
import {NameService} from './services/names.service';
import {JSONP_PROVIDERS}  from 'angular2/http';

import {Team} from './models/team';
import {State} from './models/person';
import {Pairing} from './models/pairing';
import {IntentionalPairs} from './models/intentional-pairs';
import 'rxjs/Rx';

@Component({
  styles: [],
  selector: 'pairpicker',
  template: `
    <nav-section><h1>I nav loaded...</h1></nav-section>
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
    <footer-section><h1>I footer loaded...</h1></footer-section>
  `,
  directives: [Nav, Teams, Pairs, Footer],
  providers: [NameService, JSONP_PROVIDERS]
})

export class AppComponent implements OnInit {
  public title = 'Pair Picker';
  public isNavCollapsed = true;
  public allteams: Team[];
  public pairing: Pairing;
  public intentionalPairs: IntentionalPairs;
  public paircounts = {};
  public oddcounts = {};
  public canSave = false;

  constructor (private _nameService: NameService) { }

  switchTeamMember (t: { name: string; team: string; }): void {
    if (t.name) {
      var fromteam = this.allteams.filter(n => n.name === t.team)[0];
      var toteam = this.allteams.filter(n => n.name !== t.team)[0];

      var move = fromteam.members.filter(m => m.name == t.name)[0];
      fromteam.members = fromteam.members.filter(m => m.name !== t.name);
      move.shouldPair = t.team != "V5";

      toteam.members.push(move);
      this.moveTeam(t.name, t.team);
    }
  }

  moveTeam (name: string, team: string, retry = 0): void {
    this._nameService.moveTeam(name, team)
      .subscribe(() => console.debug(`Moved ${name} from ${team}`),
        error => {
          retry++;
          if (retry < 4) this.moveTeam(name, team, retry);
          console.error(`error sending to slack: ${error}`);
        });
  }

  savePairingToDb (p: Pairing, retry = 0): void {
    this._nameService.savePair(p)
      .subscribe(
        a => console.debug(`pairing saved : ${a}`),
        error => {
          retry++;
          if (retry < 4) this.savePairingToDb(p, retry);
          console.error(`error saving pairing: ${error}`)
        });
  }

  savePairing (p: Pairing): void {
    this.savePairingToDb(p);

    this._nameService.sendToSlack(p)
      .subscribe(
        a => console.debug(`sent to slack : ${a}`),
        error => console.error(`error sending to slack: ${error}`));
  }

  updatePairing (p: Pairing): void {
    this.canSave = true;
    this.pairing = p;
  }

  getNames (t: string, p: boolean, retry: number = 0): void {
    this._nameService.getTeam(t).subscribe(
      n => {
        n.forEach(a => {
          a.shouldPair = p;
          a.state = State.RandomPairing;
        });
        this.allteams.push({ 'name': t, 'members': n });
      },
      error => {
        retry++;
        if (retry < 4) this.getNames(t, p, retry);
        console.error(error);
      });
  }

  getPairCounts (retry: number = 0): void {
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

  getOddCounts (retry: number = 0): void {
    this._nameService.getOddCounts().subscribe(
      n => {
        this.oddcounts = n;
      },
      error => {
        retry++;
        if (retry < 4) this.getOddCounts(retry);
        console.error(error);
      });
  }

  ngOnInit (): void {
    this.allteams = [];
    this.pairing = new Pairing();
    this.intentionalPairs = new IntentionalPairs();
    this.getNames('V5', true);
    this.getNames('cloud', false);
    this.getPairCounts();
    this.getOddCounts();
  }
}
