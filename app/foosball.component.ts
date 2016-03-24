import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Nav} from './components/nav.component';
@Component({
  styles: [],
  selector: 'foosball',
  template: `
     <nav-section><h1>I nav loaded...</h1></nav-section>
    Hellllllooooo foosball
  `,
  directives: [ROUTER_DIRECTIVES, Nav]
})

export class Foosball  {

}
