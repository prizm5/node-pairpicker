import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  styles: [],
  template: `
<!-- Portfolio Grid Section -->
    <section id="stats">
      <div class="container">
        <div class="row" >
          <div class="col-lg-12 text-center">
            <h2>Workflows</h2>
            <hr class="star-primary">
          </div>
        </div>
        <div class="row" >
          Hellllllooooo Stats
        </div>

      </div>
    </section>

  `,
  directives: [ROUTER_DIRECTIVES]
})

export class Stats  {

}
