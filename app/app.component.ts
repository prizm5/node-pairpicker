import {Component, OnInit} from 'angular2/core';

import {Nav} from './components/nav.component';
import {Teams} from './components/teams.component';
import {Pairs} from './components/pairs.component';
import {Footer} from './components/footer.component';
import {NameService} from './services/names.service'
import {JSONP_PROVIDERS}  from 'angular2/http';
 
import {Team} from './models/team'
import {Person} from './models/person'
import 'rxjs/Rx';

@Component({
  styles:[],
  selector: 'pairpicker',
  template: `
  <nav-section><h1>I nav loaded...</h1></nav-section>
  <teams-section [teams]="allteams"><h1>I nav loaded...</h1></teams-section>
  <pairs-section><h1>I nav loaded...</h1></pairs-section>
  <footer-section><h1>I footer loaded...</h1></footer-section>
  `,
  directives: [Nav,Teams, Pairs, Footer],
  providers: [NameService, JSONP_PROVIDERS]
})

export class AppComponent implements OnInit {
  public title = 'Pair Picker';
  public isNavCollapsed = true;
  public allteams: Team[];
  
  constructor(private _nameService: NameService) { 
      this.allteams = [];
  }
  v5: Team
  getNames(t, p) {
    this._nameService.getTeam(t).subscribe(
        n => {
          n.forEach(a => a.shouldPair = p);
          this.allteams.push({"name":t, "members":n});
        },
        error => console.log(error));
  }
  
  ngOnInit() {
    this.getNames('V5', true);
    this.getNames('Cloud', false);
  }
} 


