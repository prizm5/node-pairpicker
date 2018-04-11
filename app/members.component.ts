import { Component, OnInit, Directive, ElementRef, Input } from 'angular2/core';
import { NameService } from './services/names.service'
import { Team, TeamMember } from './models/team';

declare var Chart: any;

@Component({
  styles: [],
  template: `
    <section id="portfolio">
      <div class="container">
        <div class="row" >
          <div class="col-lg-12 text-center">
            <h2>Workflows</h2>
            <hr class="star-primary">
          </div>
        </div>
        <div class="row" >
        <table class="table">
          <tr>
            <th>Name</th> 
            <th>Team</th>
            <th>Status</th> 
          </tr>
          <tr *ngFor="#member of team" id="{{member._id}}" class="member">
            <td>{{member.name}}</td> 
            <td>{{member.team}}</td>
            <td>{{member.status}}</td> 
          </tr>
        </table>
        </div>
        <div class="row" >
          <div class="col-sm-2 portfolio-item page-scroll">
            <a href="#pairs">
              <button type="submit" class="btn btn-success btn-lg" (click)="saveTeam()">Save</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})

export class Members {
  public team : TeamMember[]
  constructor(private _nameService: NameService) { 
    this.team = [];
  }
  /* ------------- */
  getTeam(retry: number = 0): void {
    this._nameService.getFullTeam().subscribe(
      n => {
        this.team = n.map(m => {
          return {
            "_id": m.value._id,
            "name": m.value.name,
            "team": m.value.team,
            "status": m.value.status
          }});
      },
      error => {
        retry++;
        if (retry < 4) this.getTeam(retry);
        console.error(error);
      });
  }

  saveTeam (): void {

  }
  ngOnInit(): void {
    this.getTeam();
  }
}
