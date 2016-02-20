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
                    <developer [peeps]="team.members" [teamname]="team.name" (click)="onSelect2($event, team.name)">i am developer</developer>
                </div>
         </div>
         <div class="row" >
            <div class="col-sm-2 portfolio-item page-scroll">
                <a href="#pairs">
                <button type="submit" class="btn btn-success btn-lg" (click)="onMakePairs()">Generate</button>
                </a>
            </div>
         </div> 
       </div>
    </section>
  `
  , 
  inputs: ['teams'],
  outputs:['onPairingGenerated','onSwitchPair'],
  directives: [Dev]
})
export class Teams {
  public teams: Team[];
  
  public pairing: Pairing;
  
  public onPairingGenerated = new EventEmitter();
  public onSwitchPair = new EventEmitter();
   onSelect2(person, teamname) {
       if(person.target && person.target.id !== ""){
            this.onSwitchPair.emit({ name: person.target.id, team: teamname });
            console.debug(person.target.id);
        }
    }
    
  onMakePairs(){
    this.pairing = new Pairing();
    var teamToShuffle: Team = new Team(); 
    teamToShuffle.name = "V5";
    var v5 = this.teams.filter(f => f.name == "V5")[0];
    teamToShuffle.members = v5.members.filter(t => t.state === State.Paring)
                                .splice(0);
    
    var odd = v5.members.filter(t =>  t.state === State.Odd).splice(0);
    this.pairing.getPairs(teamToShuffle, odd);
    this.onPairingGenerated.emit(this.pairing);
    
  }
  constructor() {
      
   }
  
}
