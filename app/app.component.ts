import {Component, OnInit} from 'angular2/core';

import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Picker} from './picker.component'
import {Foosball} from './foosball.component'
import {Router, RouteParams} from 'angular2/router';
import {Nav} from './components/nav.component'
import {Stats} from './stats.component'

@Component({
  styles: [],
  selector: 'pairpicker',
  template: `
  <nav-section><h1>I nav loaded...</h1></nav-section>
  <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES, Nav],

})
@RouteConfig([
  {path: '/Picker',   name: 'Picker',     component: Picker, useAsDefault: true},
  {path: '/Foosball', name: 'Foosball', component: Foosball},
  {path: '/Stats', name: 'Stats', component: Stats},
])
export class AppComponent {

}
