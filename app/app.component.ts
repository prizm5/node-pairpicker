import {Component}              from 'angular2/core';

@Component({
  styles:[],
  selector: 'pairpicker',
  template: `
  <!--
  <nav class="navbar navbar-dark bg-inverse dnd-noborder-radius">
    <button class="navbar-toggler hidden-md-up" type="button" (click)="toggleCollapse()">
      ☰
    </button>
    <span class="navbar-brand dnd-nofloat hidden-md-up">{{title}}</span>
    <div class="navbar-toggleable-sm" [class.collapse]="isNavCollapsed">
      <span class="navbar-brand hidden-sm-down">{{title}}</span>
      <ul class="nav navbar-nav">
        <li class="nav-item" [class.active]="getLinkStyle('')">
          <a class="nav-link" [routerLink]="['Spells']"><span class="octicon octicon-flame"></span> Spells</a>
        </li>
        <li class="nav-item" [class.active]="getLinkStyle('/character')">
          <a class="nav-link" [routerLink]="['Character']"><span class="octicon octicon-person"></span> Character</a>
        </li>
        <li class="nav-item" [class.active]="getLinkStyle('/monsters')">
          <a class="nav-link" [routerLink]="['Monsters']"><i class="fa fa-optin-monster"></i> Monsters</a>
        </li>
      </ul>
    </div>
  </nav>
  -->
  <div><h1>I loaded...</h1></div>
  `
})
export class AppComponent {
  public title = 'Pair Picker';
  public isNavCollapsed = true;
  constructor() { }
  toggleCollapse() {
    this.isNavCollapsed = !this.isNavCollapsed;
  }
}
