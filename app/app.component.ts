import {Component, OnInit} from 'angular2/core';

import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Picker} from './picker.component'
import {Foosball} from './foosball.component'
import {Router, RouteParams} from 'angular2/router';


@Component({
  styles: [],
  selector: 'pairpicker',
  template: `
<router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],

})
@RouteConfig([
  {path: '/Picker',   name: 'Picker',     component: Picker, useAsDefault: true},
  {path: '/Foosball', name: 'Foosball', component: Foosball},
])
export class AppComponent {

}
