import {Component} from 'angular2/core';

import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Picker} from './picker.component'
import {Members} from './members.component'
import {Nav} from './components/nav.component'
import {Footer} from './components/footer.component'
import {Stats} from './stats.component'

@Component({
  styles: [],
  selector: 'pairpicker',
  template: `
  <nav-section><h1>I nav loaded...</h1></nav-section>
  <router-outlet></router-outlet>
  <footer-section><h1>I footer loaded...</h1></footer-section>
  `,
  directives: [ROUTER_DIRECTIVES, Nav, Footer]
})
@RouteConfig([
  {path: '/Picker',   name: 'Picker',     component: Picker, useAsDefault: true},
  {path: '/Members', name: 'Members', component: Members},
  {path: '/Stats', name: 'Stats', component: Stats},
])
export class AppComponent { }

