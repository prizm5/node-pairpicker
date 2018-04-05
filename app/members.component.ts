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
          <div class="col-sm-12 portfolio-item" *ngFor="#member of team">
            {{member.name}} {{member.status}} {{member.team}}
          </div>
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
  `,
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
        this.team = n.members.map(m => {
          return {
            "name": m.name,
            "team": m.team,
            "status": m.status
          }});
      },
      error => {
        retry++;
        if (retry < 4) this.getNames(retry);
        console.error(error);
      });
  }

  saveTeam (): void {

  }
  ngOnInit(): void {
    this.getTeam();
  }
}
