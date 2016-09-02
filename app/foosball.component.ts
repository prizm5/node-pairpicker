import {Component} from "angular2/core";

import {Nav} from "./components/nav.component";
import {Teams} from "./components/teams.component";
import {Pairs} from "./components/pairs.component";
import {NameService} from "./services/names.service";
import {JSONP_PROVIDERS}  from "angular2/http";

import {Team} from "./models/team";
import {State} from "./models/person";
import {Pairing} from "./models/pairing";
import {IntentionalPairs} from "./models/intentional-pairs";
import "rxjs/Rx";

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
      [canSavePairs]="canSave"
      [foosball]="foosball"
      (onStartGame)="startGame($event)"
      <h1>I pars loaded...</h1>
    </pairs-section>
  `,
  directives: [Teams, Pairs]
})

export class Foosball {
  public title = "Foosball Picker";
  public isNavCollapsed = true;
  public allteams: Team[];
  public pairing: Pairing;
  public intentionalPairs: IntentionalPairs;
  public paircounts = [];
  public oddcounts = [];
  public canSave = false;
  public foosball = true;

  constructor(private _nameService: NameService) { }
  getFoosballerz(): void {
    this._nameService.getTeam().subscribe(
      n => {

        n.filter(f => f.key === "Foosballerz" ).reverse().forEach(t => {
          t.value.forEach(v => {
            v.shouldPair = true;
            v.state = State.RandomPairing;
            v.canMove = false;
          });

          this.allteams.push({ "name": t.key, "members": t.value });
        });
      },
      error => {
        console.error(error);
      });
  }

  updatePairing(p: Pairing): void {
    this.canSave = false;
    this.foosball = true;
    this.pairing = p;
  }

  startGame(p: Pairing): void {
    this._nameService.startGame(p)
      .subscribe(
      a => console.debug(`sent to slack : ${a}`),
      error => console.error(`error sending to slack: ${error}`));
  }

  ngOnInit(): void {
    this.getFoosballerz();
    this.allteams = [];
    this.pairing = new Pairing();
    this.intentionalPairs = new IntentionalPairs();
  }
}
