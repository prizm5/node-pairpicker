import {Component,EventEmitter}              from 'angular2/core';
import {Team} from '../models/team'
import {Dev} from './dev.component'
import {Pairing} from '../models/pair'
import {State} from '../models/person'
import {Person} from '../models/person'

@Component({
  styles:[],
  selector: 'teams-section',
  template: `
   <!-- Portfolio Grid Section -->
    <section id="portfolio">
        <div class="container">
            <div class="row" >
                <div class="col-lg-12 text-center">
                    <h2>Workflows</h2>
                    <hr class="star-primary">
                </div>
            </div>
            <div class="row" >
                <div class="col-sm-6 portfolio-item" *ngFor="#team of teams">
                    <h3>{{team.name}}</h3>
                    <hr />
                    <developer (onSwitchTeam)="relayTeamSwitch($event)" [peeps]="team.members" [teamname]="team.name">i am developer</developer>
                </div>
         </div>
         <div class="row" >
            <div class="col-sm-2 portfolio-item page-scroll">
                <a href="#pairs">
                <button type="submit" class="btn btn-success btn-lg" (click)="generatePairs()">Generate</button>
                </a>
            </div>
         </div>
       </div>
    </section>
  `
  ,
  inputs: ['teams'],
  outputs:['onPairingGenerated','onSwitchTeam'],
  directives: [Dev]
})
export class Teams {
  public teams: Team[];
  public pairing: Pairing;

  public onSwitchTeam = new EventEmitter();
  public onPairingGenerated = new EventEmitter();

  relayTeamSwitch (event) {
    this.onSwitchTeam.emit(event);
  }

  generatePairs () {
      this.pairing = new Pairing();

      let teamToShuffle: Team = new Team();
      let v5 = this.teams.filter(f => f.name == "V5")[0];

      let byState = groupBy(v5.members, (m) => m.state);
      let randos = byState[State.RandomPairing] || [];
      let odds = byState[State.Odd] || [];

      teamToShuffle.name = "V5";
      teamToShuffle.members = randos;

      this.pairing.generatePairs(teamToShuffle, odds);
      this.onPairingGenerated.emit(this.pairing);
  }

  constructor () {}
}

function groupBy (coll, keyFn) {
    return coll.reduce((groups, c) => {
        let key = keyFn(c);
        (key in groups) ? groups[key].push(c) : groups[key] = [];
        return groups;
    }, {});
}
