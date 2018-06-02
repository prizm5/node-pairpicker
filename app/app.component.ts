import {Component} from 'angular2/core';
import {NameService} from './services/names.service';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Picker} from './picker.component'
import {Nav} from './components/nav.component'
import {Footer} from './components/footer.component'
import {Stats} from './stats.component'
import {Members} from './members.component'

@Component({
  styles: [],
  selector: 'pairpicker',
  template: `
  <nav-section
      (onStartCloud9)="startCloud9Process($event)"
      (onStopCloud9)="stopCloud9Process($event)">
  <h1>I nav loaded...</h1></nav-section>
  <router-outlet></router-outlet>
  <footer-section><h1>I footer loaded...</h1></footer-section>
  `,
  directives: [ROUTER_DIRECTIVES, Nav, Footer]
})
@RouteConfig([
  {path: '/Picker',   name: 'Picker',     component: Picker, useAsDefault: true},
  {path: '/Stats', name: 'Stats', component: Stats},
  {path: '/Members', name: 'Members', component: Members}
])
export class AppComponent { 
  constructor(private _nameService: NameService) { }

  stopCloud9Process(e, retry = 0): void {
    this._nameService.stopCloud9()
      .subscribe(
      a => {
        console.debug(`Cloud9 Stopped`)
      },
      error => {
        retry++;
        if (retry < 4) this.stopCloud9Process(e, retry);
        console.error(`error stoping Cloud9`)
      });
  }

  startCloud9Process(e, retry = 0): void {
    this._nameService.startCloud9()
      .subscribe(
      a => {
        console.debug(`Cloud9 Started`)
      },
      error => {
        retry++;
        if (retry < 4) this.startCloud9Process(e, retry);
        console.error(`error starting Cloud9`)
      });
  }


}
