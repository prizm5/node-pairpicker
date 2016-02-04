import {Component, OnInit} from 'angular2/core';

import {Nav} from './components/nav.component';
import {Teams} from './components/teams.component';
import {Pairs} from './components/pairs.component';
import {Footer} from './components/footer.component';
import {NameService} from './services/names.service'
import {JSONP_PROVIDERS}  from 'angular2/http';

import {Team} from './models/team'
import {Person} from './models/person'
import {State} from './models/person'
import {Pairing} from './models/pair'
import 'rxjs/Rx';

@Component({
    styles: [],
    selector: 'pairpicker',
    template: `
  <nav-section><h1>I nav loaded...</h1></nav-section>
  <teams-section [teams]="allteams" (onPairingGenerated)="updatePairing($event)" (onSwitchPair)="switchTeamMember($event)"><h1>I nav loaded...</h1></teams-section>
  <pairs-section [pairing]="pairing" (onSavePairing)="savePairing($event)"><h1>I nav loaded...</h1></pairs-section>
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

    constructor(private _nameService: NameService) { }

    switchTeamMember(t) {
        var fromteam = this.allteams.filter(n => n.name === t.team)[0];
        var toteam = this.allteams.filter(n => n.name !== t.team)[0];

        var move = fromteam.members.filter(m => m.name == t.name).splice(0)[0];
        fromteam.members = fromteam.members.filter(m => m.name !== t.name).splice(0);
        move.shouldPair = t.team == "V5" ?  false : true;

        toteam.members.push(move);

        this._nameService.moveTeam(t.name, t.team)
            .subscribe(a => { console.debug('Moved ' + t.name + ' from ' + t.team) },
            error => console.error("error sending to slack" + error));
    }

    savePairing(p: Pairing) {
         
        this._nameService.savePair(p)
            .subscribe(a => { console.debug("pairing saved : " + a) },
            error => console.error("error saving pairing" + error));
            
        this._nameService.sendToSlack(p)
            .subscribe(a => { console.debug("sent to slack : " + a) },
            error => console.error("error sending to slack" + error));
    }
    
    updatePairing(p: Pairing) {
        this.pairing = p; 
    }

    getNames(t, p) {
        this._nameService.getTeam(t).subscribe(
            n => {
                n.forEach(a => {
                    a.shouldPair = p;
                    a.state = State.Paring;
                });
                this.allteams.push({ "name": t, "members": n });
            },
            error => console.error(error));
    }

    ngOnInit() {
        this.allteams = [];
        this.pairing = new Pairing();
        this.getNames('V5', true);
        this.getNames('cloud', false);
    }
} 


