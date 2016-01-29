import {Component} from 'angular2/core';

import {Nav} from './components/nav.component';
import {Teams} from './components/teams.component';
import {Pairs} from './components/pairs.component';
import {Footer} from './components/footer.component';
 
@Component({
  styles:[],
  selector: 'pairpicker',
  template: `
  <nav-section><h1>I nav loaded...</h1></nav-section>
  <teams-section><h1>I nav loaded...</h1></teams-section>
  <pairs-section><h1>I nav loaded...</h1></pairs-section>
  <footer-section><h1>I footer loaded...</h1></footer-section>
  `,
  directives: [Nav,Teams, Pairs, Footer]
})
export class AppComponent {
  public title = 'Pair Picker';
  public isNavCollapsed = true;
  constructor() { }
  
} 
