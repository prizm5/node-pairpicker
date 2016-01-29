import {Component}              from 'angular2/core';
import {Team} from '../models/team'
import {Dev} from './dev.component'


@Component({
  styles:[],
  selector: 'teams-section',
  template: ` 
   <!-- Portfolio Grid Section -->
    <section id="portfolio">
        <div class="container">
            <div class="row" >
                <div class="col-lg-12 text-center">
                    <h2>Workflows</h2>
                    <hr class="star-primary">
            </div>
            <div class="col-sm-4 portfolio-item" *ngFor="#team of teams">
                <h3>{{team.name}}</h3>
                <hr />
                <developer [peeps]="team.members">i am developer</developer>
            </div>
         </div>
         <div class="row" >
           
            <div class="col-sm-4 portfolio-item">
              <a href="#pairs">
                    <button type="submit" class="btn btn-success btn-lg">Generate</button>
                    </a>
                </div>
           
         </div> 
       </div>
    </section>
  `
  ,
  inputs: ['teams'],
  directives: [Dev],
  
})
export class Teams {
  public teams: Team[];
  
  constructor() { }
  
}
