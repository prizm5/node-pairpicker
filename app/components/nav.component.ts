import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  styles:[],
  selector: 'nav-section',
  template: `
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header page-scroll">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <img src="img/icon-pairing-trans.png" id="logo">
          <a class="navbar-brand" href="#page-top">Pair Picker</a>
        </div>
         <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li class="page-scroll">
                        <a [routerLink]="['Picker']">Pair Picker</a>
                    </li>
                    <li class="page-scroll">
                        <a [routerLink]="['Stats']">Stats</a>
                    </li>
                    <li class="page-scroll">
                        <a [routerLink]="['Members']">Members</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->

      </div>
    <!-- /.container-fluid -->
    </nav>
  `,
  directives: [ROUTER_DIRECTIVES]
})

export class Nav {
  constructor () { }
}
